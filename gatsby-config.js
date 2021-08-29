module.exports = {
    siteMetadata: {
        siteUrl: "https://awkwafox.netlify.app",
        title: "Awkwa Fox",
        description: "Awkwa Fox is a creative design and video production company based in Fort Myers, Florida specializing in wedding videography. We also offer event live stream and web design services.",
        author: "Steve Chiarelli"
    },
    plugins: [  
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-source-strapi`,
            options: {
                apiURL: `https://awkwafox.herokuapp.com`,
                queryLimit: 1000, // Defaults to 100
                collectionTypes: [`faqs`, `projects`, `services`, `customers`],
                singleTypes: [`home`, `videography`, `live-stream`, `web-design`, `contact`],
            },
        }
    ],
};