/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// import { supportedLangs, defaultLang } from './src/locales/locales';
const path = require('path');
const { createRemoteFileNode } = require('gatsby-source-filesystem');
// BIG WORKAROUND : cannot import lang codes directly from typescript code in src because here we use node without es6-etc support.
// So re-recrate data here
// TODO
const supportedLangs = {
  ['en']: {
    urlPrefix: '',
    humanName: 'English',
  },
  ['fr']: {
    urlPrefix: 'fr',
    humanName: 'Français',
  },
};
const defaultLangCode = 'en';

const LAYOUTS = {
  page: 'page',
  article: 'article',
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, printTypeDefinitions } = actions;

  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter @dontInfer {
      title: String!
      path: String!
      layout: String!
      description: String!
      language: String!
      subtitle: String
      date: Date @dateformat
      category: String,
      image: File @fileByRelativePath
      embeddedImagesRemote: [File] @link(by: "url")
      embeddedImagesLocal: [File] @fileByRelativePath
    }
    `);

  // Keep track of types ? What for?
  printTypeDefinitions({ path: './typeDefs.txt' });
};

exports.onCreateNode = ({
  node,
  createNodeId,
  actions: { createNode },
  cache,
  store,
}) => {
  // For markdown/Mdx files, check for language field and change url accordingly
  // No URL change for default language
  // Other languages get a /langCode/ prefix on their URLs
  if (node.internal.type === 'Mdx') {
    const initialLanguage = node.frontmatter.language;
    let languageUrlPrefix = '';
    // Default language if not defined
    if (initialLanguage === void 0 || initialLanguage === null) {
      console.info(
        'No language field in markdown, select default language:' +
          defaultLangCode
      );
      node.frontmatter.language = defaultLangCode;
    }

    let foundALanguageOtherThanDefault = false;
    const language = node.frontmatter.language;
    for (let key of Object.keys(supportedLangs)) {
      if (language === key && language !== defaultLangCode) {
        languageUrlPrefix = `/${supportedLangs[key].urlPrefix}`;
        foundALanguageOtherThanDefault = true;
        break;
      }
    }

    if (!foundALanguageOtherThanDefault && language !== defaultLangCode) {
      console.warn(
        `Unhandled language for markdown: ${node.frontmatter.language}. No path change (could conflict with default)`
      );
      // return;
    }
    node.frontmatter.path = `${languageUrlPrefix}${node.frontmatter.path}`;
  }

  // Fetch remote images if any
  if (
    node.internal.type === 'Mdx' &&
    node.frontmatter &&
    node.frontmatter.embeddedImagesRemote
  ) {
    return Promise.all(
      node.frontmatter.embeddedImagesRemote.map((url) => {
        try {
          return createRemoteFileNode({
            url,
            parentNodeId: node.id,
            createNode,
            createNodeId,
            cache,
            store,
          });
        } catch (error) {
          console.error(error);
        }
      })
    );
  }
};

// Fired after page creation
// used to detect JS pages and create their languages variants
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  console.info(`on create ${page.path}`);
  // If the component path is .mdx, it means the gatsby-plugin-mdx used its default layout.
  // We don't want any default pages to avoid dirty duplicates
  // So remove it !
  if (page.componentPath.includes('.mdx')) {
    deletePage(page);
    return;
  }
  if (page.context.langCode === void 0) {
    console.info(
      `got a root page with no lang context. ${page.path} Delete page and Create one for each language`
    );
    return new Promise((resolve) => {
      deletePage(page);

      Object.keys(supportedLangs).map((langCode) => {
        const localizedPath =
          langCode === defaultLangCode
            ? page.path
            : supportedLangs[langCode].urlPrefix + page.path;

        return createPage({
          component: page.component,
          path: localizedPath,
          context: {
            langCode: langCode,
          },
        });
      });
      resolve();
    });
  }
};

/// ---------------- Custom page generation for markdown files
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const layoutPage = path.resolve(`src/layout/MdxPage.js`);
  const layoutArticle = path.resolve(`src/layout/MdxArticle.js`);

  return graphql(`
    {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { frontmatter: { category: { ne: "hidden" } } }
      ) {
        edges {
          node {
            frontmatter {
              path
              layout
              title
              language
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    // Actually creating the page
    const allPages = result.data.allMdx.edges;

    const mdxPages = allPages.filter(
      (edge) => edge.node.frontmatter.layout === LAYOUTS.page
    );

    const mdxArticles = allPages.filter(
      (edge) => edge.node.frontmatter.layout === LAYOUTS.article
    );

    const others = allPages.filter(
      (edge) =>
        Object.values(LAYOUTS).indexOf(edge.node.frontmatter.layout) !== -1
    );

    if (0 < others.length) {
      console.warn('found pages with unhandled layouts. Will ignore them:');
      console.warn(others);
    }

    mdxArticles.forEach(({ node }, index) => {
      // false if no previous or no next
      const previousPostLooker = () => {
        let indexToLook = index - 1;
        while (0 <= indexToLook) {
          // Only lists articles in same language
          if (
            mdxArticles[indexToLook].node.frontmatter.language ==
            node.frontmatter.language
          ) {
            return mdxArticles[indexToLook].node;
          }
          indexToLook--;
        }
        return false;
      };

      const nextPostLooker = () => {
        let indexToLook = index + 1;
        while (indexToLook <= mdxArticles.length - 1) {
          // Only lists articles in same language
          if (
            mdxArticles[indexToLook].node.frontmatter.language ==
            node.frontmatter.language
          ) {
            return mdxArticles[indexToLook].node;
          }
          indexToLook++;
        }
        return false;
      };

      const previousPost = previousPostLooker();
      const nextPost = nextPostLooker();

      createPage({
        path: node.frontmatter.path,
        component: layoutArticle,
        context: {
          previousPost,
          nextPost,
          langCode: node.frontmatter.language,
        }, // additional data can be passed via context
      });
    }); // foreach article

    mdxPages.forEach(({ node }) => {
      console.log('hello creating');
      createPage({
        path: node.frontmatter.path,
        component: layoutPage,
        context: { langCode: node.frontmatter.language }, // additional data can be passed via context
      });
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-image-lightbox/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
