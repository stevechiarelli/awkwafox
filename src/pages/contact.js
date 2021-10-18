import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";

const contact = ({ data }) => {
    const content = data.contact.nodes[0];
    return (
        <Layout page="contact">
            <Seo title={content.meta.title} description={content.meta.description} noindex={false} />
            <ContactForm data={content} />
        </Layout>
    );
}

export const query = graphql`
  {
    contact:allStrapiContact {
      nodes {
        heading
        email
        phone
        content
        meta:Meta {
          title
          description
        }
      }
    }
  }
`

export default contact;