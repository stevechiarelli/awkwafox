import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import About from "../components/About";
import Info from "../components/Info";
import Features from "../components/Features";
//import Work from "../components/Work";
import Cta from "../components/Cta";
import Seo from "../components/Seo";
import Modal from "../components/Modal";

const livestream = ({ data, location }) => {
    const { hero, about, livestream, webdesign, features, cta, meta } = data.livestream.nodes[0];
    const params = new URLSearchParams(location.search);
    const modal = Boolean(params.get("modal"));

    return (
        <Layout page="live stream">
            <Seo title={meta.title} description={meta.description} noindex={false} />
            <Hero data={hero} />
            <About data={about} />
            <Info data={livestream} />
            <Features data={features} />
            {/* <Work category="livestream" /> */}
            <Info data={webdesign} />
            <Cta data={cta} category="livestream" />
            <Modal category="success" data={meta} modal={modal} />
        </Layout>
    );
}

export const query = graphql`
  {
    livestream:allStrapiLiveStream {
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
        livestream:Info {
          heading
          subheading
          content
          background
          List {
            id
            item
          }
        }
        webdesign:WebDesign {
          heading
          subheading
          content
          background
          List {
            id
            item
          }
        }
        features:Features {
          heading
          content
          id
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

export default livestream;