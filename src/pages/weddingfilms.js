import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import About from "../components/About";
import Info from "../components/Info";
import Features from "../components/Features";
import Work from "../components/Work";
import Cta from "../components/Cta";
import Seo from "../components/Seo";
import Modal from "../components/Modal";

const weddingfilms = ({ data, location }) => {
    const { hero, about, weddingfilms, webdesign, features, cta, meta } = data.videography.nodes[0];
    const params = new URLSearchParams(location.search);
    const modal = Boolean(params.get("modal"));

    return (
        <Layout page="wedding films">
            <Seo title={meta.title} description={meta.description} noindex={false} />
            <Hero data={hero} />
            <About data={about} />
            <Info data={weddingfilms} />
            <Work category="videography" />
            <Info data={webdesign} />
            <Features data={features} />
            <Cta data={cta} category="videography" />
            <Modal category="success" data={meta} modal={modal} />
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
        weddingfilms:Info {
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

export default weddingfilms;