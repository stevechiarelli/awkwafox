import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Hero from "../components/Hero";
import Modal from "../components/Modal";
import Seo from "../components/Seo";

const Success = ({ data }) => {
    const { hero, meta } = data.home.nodes[0];

    return (
        <Layout page="home">
            <Seo title={meta.title} description={meta.description} />
            <Hero data={hero} />
            <Modal category="success" modal={true} />
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
        meta:Meta {
          title
          description
        }
      }
    }
  }
`

export default Success;