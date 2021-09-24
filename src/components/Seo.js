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
            <script type="application/ld+json">
                {`{"@context": "https://schema.org","@type": "Organization","name": "Awkwa Fox","url": "https://www.awkwafox.com",` +
                `"contactPoint": {"@type": "ContactPoint","telephone": "+1-941-404-2496","contactType": "Customer Support"}}`}
            </script>,
            <script type="application/ld+json">
                {`{"@context": "https://schema.org","@type": "WebSite","name": "Awkwa Fox","url": "https://www.awkwafox.com"}`}
            </script>
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