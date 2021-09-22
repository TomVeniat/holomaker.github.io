const siteManifest = require('./siteManifest');

module.exports = {
  siteMetadata: {
    siteName: siteManifest.name,
    title: siteManifest.title,
    author: siteManifest.author,
    authorMail: siteManifest.authorMail,
    titleTemplate: siteManifest.titleTemplate,
    description: siteManifest.description,
    siteUrl: siteManifest.url,
    url: siteManifest.url,
    favicon: '/favicon.ico',
    image: '/image.jpg', // Path to your image you placed in the 'static' folder
    keywords: siteManifest.keywords,
    /* to hide the icon, put an empty string instead of a link */
    socialLinks: {
      twitter: siteManifest.socialLinks.twitter,
      facebook: siteManifest.socialLinks.facebook,
      linkedin: siteManifest.socialLinks.linkedin,
      github: siteManifest.socialLinks.github,
      instagram: siteManifest.socialLinks.instagram,
      vimeo: siteManifest.socialLinks.vimeo,
      youtube: siteManifest.socialLinks.youtube,
      soundcloud: siteManifest.socialLinks.soundcloud,
    },
  },

  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 70,
          formats: ['auto', 'webp', 'avif'],
          placeholder: 'blurred',
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
        gatsbyRemarkPlugins: [
          `gatsby-transformer-sharp`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin: 0`,
            },
          },

          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1920,
            },
          },
        ], // just in case those previously mentioned remark plugins sound cool :)
        // defaultLayouts: {
        //   default: null,//require.resolve("./src/layout/MdxBasic.js"),
        // },
      },
    },

    {
      resolve: 'gatsby-plugin-react-helmet',
    },
    'gatsby-plugin-offline',
    `gatsby-plugin-catch-links`,

    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    // {
    //   resolve: 'gatsby-transformer-remark',
    //   options: {
    //     plugins: [
    //       {
    //         resolve: `gatsby-remark-images`,
    //         options: {
    //           // It's important to specify the maxWidth (in pixels) of
    //           // the content container as this plugin uses this as the
    //           // base for generating different widths of each image.
    //           maxWidth: 1920,
    //         },
    //       },
    //       {
    //         resolve: `gatsby-remark-responsive-iframe`,
    //         options: {
    //           wrapperStyle: `margin: 0`,
    //         },
    //       },

    //       {
    //         resolve: 'gatsby-remark-copy-linked-files',
    //       },
    //     ], // just in case those previously mentioned remark plugins sound cool :)
    //   },
    // },

    `gatsby-plugin-sharp`, // For res processing
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteManifest.pwa.name,
        short_name: siteManifest.pwa.short_name,
        start_url: `/`,
        background_color: siteManifest.pwa.background_color,
        theme_color: siteManifest.pwa.theme_color,
        display: `minimal-ui`,
        icon: `src/res/favicon.png`, // This path is relative to the root of the site.
      },
    },

    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteManifest.robots.host,
        sitemap: siteManifest.robots.sitemap,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    `gatsby-plugin-sitemap`,

    // Amazing loading progress bar on top of website
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: siteManifest.spin.color,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },

    `gatsby-plugin-emotion`,

    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://protonmail.us5.list-manage.com/subscribe/post?u=8b4e477d425a1fcb90d90a287&amp;id=7331d8e0bb',
      },
    },
  ],
};
