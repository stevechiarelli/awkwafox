require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
    siteMetadata: {
        siteUrl: "https://www.awkwafox.com",
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
        {
            resolve: `gatsby-source-strapi`,
            options: {
                apiURL: `https://awkwafox.herokuapp.com`,
                queryLimit: 1000, // Defaults to 100
                collectionTypes: [`faqs`, `projects`, `services`, `customers`],
                singleTypes: [`home`, `videography`, `live-stream`, `web-design`, `contact`],
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GA_TRACKING_ID
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                excludes: ['/success'],
            },
        },
        {
            resolve: `gatsby-source-google-calendar`,
            options: {
                calendarIds: [
                    'steve@awkwafox.com',
                ],
            },
        },
    ],
};