import React from 'react';
import MainLayout from './MainLayout';
import './BasicPage.scss';
import 'moment';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SEO from '../bits/SEO/SEO';
import { graphql, Link } from 'gatsby';
import { SHORTCODES } from './MdxBits';

export default function Template({ data: { mdx }, location, pageContext }) {
  const { previousPost, nextPost, langCode } = pageContext;

  // content is at false is no previous or next
  const previousPostHtml = previousPost ? (
    <Link to={previousPost.frontmatter.path}>
      ← {previousPost.frontmatter.title}
    </Link>
  ) : (
    <div></div>
  );
  const nextPostHtml = nextPost ? (
    nextPost && (
      <Link to={nextPost.frontmatter.path}>{nextPost.frontmatter.title} →</Link>
    )
  ) : (
    <div></div>
  );

  return (
    <MainLayout language={mdx.frontmatter.language} location={{ ...location }}>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description || mdx.frontmatter.subtitle}
        image={mdx.frontmatter.image.childImageSharp.fixed.src}
        pathname={mdx.frontmatter.path}
        article={true}
        langCode={langCode}
      />
      <div className="coverBand" id="content">
        <div className="overlay">
          <h1 className="punchline">{mdx.frontmatter.title}</h1>
          <h2 className="subtext">
            <p>
              <strong>{mdx.frontmatter.subtitle} </strong>
              <br />{' '}
              <em>
                {new Date(mdx.frontmatter.date).toLocaleDateString(
                  mdx.frontmatter.language,
                  { year: 'numeric', month: 'long' }
                )}
              </em>
            </p>
          </h2>
        </div>
      </div>

      <div className="Page">
        <article
          className="card"
          itemScope
          itemType="http://schema.org/BlogPosting"
        >
          <div className="article">
            <br />
            <br />
            <MDXProvider components={SHORTCODES}>
              <MDXRenderer
                remoteImages={mdx.frontmatter.embeddedImagesRemote}
                localImages={mdx.frontmatter.embeddedImagesLocal}
              >
                {mdx.body}
              </MDXRenderer>
            </MDXProvider>
            <div className="prevNextLinks">
              {previousPostHtml}
              {nextPostHtml}
            </div>
          </div>
        </article>
      </div>
    </MainLayout>
  );
}

//  <div className="content" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.html }}/>

export const pageQuery = graphql`
  query MdxArticleByPath($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        subtitle
        language
        description
        embeddedImagesRemote {
          ...modernGatImage
        }
        embeddedImagesLocal {
          ...modernGatImage
        }
        image {
          childImageSharp {
            # Other options include height (set both width and height to crop),
            # grayscale, duotone, rotate, etc.
            fixed(width: 700) {
              # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
              ...GatsbyImageSharpFixed
              src
            }
          }
        }
      }
    }
  }
`;
