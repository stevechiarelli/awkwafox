import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Hero from "../components/Hero";
import About from "../components/About";
import Info from "../components/Info";
import Features from "../components/Features";
import Work from "../components/Work";
import Cta from "../components/Cta";
import Seo from "../components/Seo";

const livestream = ({ data }) => {
    const { hero, about, info, features, cta, meta } = data.livestream.nodes[0];

    return (
        <Layout page="live stream">
            <Seo title={meta.title} description={meta.description} />
            <Hero data={hero} />
            <About data={about} />
            <Info data={info} />
            <Features data={features} />
            <Work category="livestream" />
            <Cta data={cta} category="livestream" />
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
        info:Info {
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
          link
          button {
            buttonText
            buttonURL
            id
          }
        }
        meta:Meta {
          title
          description
        }
      }
    }
  }
`

export default livestream;