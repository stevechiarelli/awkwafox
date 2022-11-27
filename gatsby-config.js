require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
    siteMetadata: {
        siteUrl: "https://www.awkwafox.com",
        title: "Awkwafox",
        description: "Awkwafox is a creative design and video production company based in Fort Myers, Florida specializing in wedding videography. We also offer event live stream and web design services.",
        author: "Steve Chiarelli"
    },
    flags: {
        DEV_SSR: false,
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
                apiURL: `http://api.awkwafox.com`,
                queryLimit: 1000, // Defaults to 100
                collectionTypes: [`faqs`, `projects`, `services`],
                singleTypes: [`home`, `videography`, `live-stream`, `contact`],
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
        },
        {
            resolve: `gatsby-source-google-calendar`,
            options: {
                calendarIds: [
                    'c_a7lekj0jbjopvn0ngi4luobitc@group.calendar.google.com',
                ],
            },
        },
    ],
};