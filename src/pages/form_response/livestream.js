import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import Modal from "../../components/Modal";
import Seo from "../../components/Seo";

const livestream = ({ data }) => {
    const { hero, meta } = data.livestream.nodes[0];

    return (
        <Layout page="livestream">
            <Seo title={meta.title} description={meta.description} />
            <Hero data={hero} />
            <Modal category="success" data={meta} modal={true} />
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