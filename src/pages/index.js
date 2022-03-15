import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import About from "../components/About";
import Info from "../components/Info";
import Work from "../components/Work";
import Cta from "../components/Cta";
import Seo from "../components/Seo";
import Modal from "../components/Modal";

const Home = ({ data, location }) => {
    const { hero, about, info, cta, meta } = data.home.nodes[0];
    const params = new URLSearchParams(location.search);
    const modal = Boolean(params.get("modal"));

    const organization = <script type="application/ld+json">
        {`{"@context": "https://schema.org","@type": "Organization","name": "Awkwa Fox","url": "https://www.awkwafox.com","logo": "https://www.awkwafox.com/logo.png",` +
        `"contactPoint": {"@type": "ContactPoint","telephone": "+1-941-404-2496","contactType": "Customer Support"}}`}</script>;
    const website = <script type="application/ld+json">
        {`{"@context": "https://schema.org","@type": "WebSite","name": "Awkwa Fox","url": "https://www.awkwafox.com"}`}</script>

    return (
        <Layout page="home">
            <Seo title={meta.title} description={meta.description} organization={organization} website={website} noindex={false} />
            <Hero data={hero} />
            <About data={about} />
            <Work category="featured" />
            <Info data={info} />
            <Cta data={cta} category="videography" />
            <Modal category="success" data={meta} modal={modal} />
        </Layout>
    );
}

export const query = graphql`
  {
    home:allStrapiHome {
      nodes {
        hero:Hero {
          heading
          subheading
          buttonText
          buttonURL
          background
        }
        about:About {
          heading
          content
          id
          alt
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
        info:info {
            heading
            subheading
            content
            background
            List {
              id
              item
            }
        }
        cta:CTA {
          heading
          content
          linkText
          linkURL
          button {
            buttonText
            buttonURL
            id
          }
        }
        meta:Meta {
          title
          description
          successHeading
          successBody
          redirectURL
        }
      }
    }
  }
`

export default Home;