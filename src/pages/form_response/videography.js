import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import Modal from "../../components/Modal";
import Seo from "../../components/Seo";

const videography = ({ data }) => {
    const { hero, meta } = data.videography.nodes[0];

    return (
        <Layout page="videography">
            <Seo title={meta.title} description={meta.description} />
            <Hero data={hero} />
            <Modal category="success" data={meta} modal={true} />
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

export default videography;