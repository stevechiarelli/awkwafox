import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Hero from "../components/Hero";
import About from "../components/About";
import Info from "../components/Info";
import Cta from "../components/Cta";
import Seo from "../components/Seo";

const Home = ({ data }) => {
    const { hero, about, info, cta, meta } = data.home.nodes[0];

    return (
        <Layout page="home">
            <Seo title={meta.title} description={meta.description} />
            <Hero data={hero} />
            <About data={about} />
            <Info data={info} />
            <Cta data={cta} category="home" />
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

export default Home;