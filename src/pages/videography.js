import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import About from "../components/About";
import Info from "../components/Info";
import Features from "../components/Features";
import Work from "../components/Work";
import Cta from "../components/Cta";
import Pricing from "../components/Pricing";
import Seo from "../components/Seo";

const videography = ({ data }) => {
    const { hero, about, info, features, cta, meta } = data.videography.nodes[0];

    return (
        <Layout page="videography">
            <Seo title={meta.title} description={meta.description} noindex={false} />
            <Hero data={hero} />
            <About data={about} />
            <Info data={info} />
            <Features data={features} />
            <Work category="videography" />
            <Pricing category="videography" subcategory="wedding" />
            <Cta data={cta} category="videography" />
        </Layout>
    );
}

export const query = graphql`
  {
    videography:allStrapiVideography {
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

export default videography;