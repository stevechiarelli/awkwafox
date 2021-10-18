import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ title, description, organization, website, noindex }) => {
    const { site } = useStaticQuery(query);
    const { siteTitle, siteDesc } = site.siteMetadata;
    let robots = "";

    if (noindex === true) {
        robots = <meta name="robots" content="noindex" />
    }

    return (
        <Helmet htmlAttributes={{ lang:"en" }} title={title || siteTitle}>
            <meta name="description" content={description || siteDesc} />
            <meta name="format-detection" content="telephone=no" />
            {robots}
            {organization}
            {website}
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