import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ title, description }) => {
    const { site } = useStaticQuery(query);
    const { siteTitle, siteDesc } = site.siteMetadata;

    return (
        <Helmet htmlAttributes={{ lang:"en" }} title={title || siteTitle}>
            <meta name="description" content={description || siteDesc} />
            <meta name="format-detection" content="telephone=no" />
            <meta name="google-site-verification" content="KEhzy-ypBbx50vcnOIS_iau_5kgUBEyBkadn0VDuYBU" />
        </Helmet>
    );
}

const query = graphql`
  {
    site {
      siteMetadata {
        siteTitle: title
        siteDesc: description
      }
    }
  }
`

export default Seo;