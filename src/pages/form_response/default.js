import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import Modal from "../../components/Modal";
import Seo from "../../components/Seo";

const home = ({ data }) => {
    const { hero, meta } = data.default.nodes[0];

    return (
        <Layout page="home">
            <Seo title={meta.title} description={meta.description} noindex={true} />
            <Hero data={hero} />
            <Modal category="success" data={meta} modal={true} />
        </Layout>
    );
}

export const query = graphql`
  {
    default:allStrapiHome {
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

export default home;