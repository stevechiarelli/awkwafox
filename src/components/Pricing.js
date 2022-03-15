import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import icon from "../assets/images/icon.svg";

const Pricing = (props) => {
    // GraphQL FAQ Query
    const content = useStaticQuery(query);
    let services = content.services.nodes;
    services = services.filter(item => item.category === props.category && item.package === true && !item.name.includes("other"))

    return (
        <Wrapper>
            <div className="container">
                {services.map(item => {
                    return (                
                        <div key={item.id} className="pricing">
                            <img src={icon} alt="Awkwa Fox icon" />
                            <h3>{item.description}</h3>
                            <h2>{item.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h2>
                            <ul dangerouslySetInnerHTML={{ __html: item.details }} />
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
}

const query = graphql`
{
    services:allStrapiServices(sort: {fields: strapiId}) {
      nodes {
        id
        description
        category
        name
        price
        details
        package
        addon
        featured
      }
    }
  }
`

const Wrapper = styled.section`
    background: var(--background6);
    padding: 5em 0 1em 0;

    .link {
        color: var(--text-light);
        font-size: 1em;
        font-style: italic;
        text-decoration: underline;
        margin: 0 8px;
        padding: 0;
    }

    .pricing {
        text-align: center;
        margin: 2em 1em;
        padding: 2em;
        background: #eee;

        h2, h3, p , ul li {
            color: var(--background6);
        }

        ul {
            margin: 1em;
            text-align: left;
            list-style-type: initial;
            
            li {
                margin: 0.5em 0;
            }
        }

        .btn-primary {
            color: var(--background6);
            border: 3px solid var(--background6);
            margin: 0.2em 0.5em 1em 0.5em;
        }

        .btn-primary:hover {
            background: var(--background1);
        }

        img {
            width: 80px;
            margin: -15px auto 0 auto;
        }
    }

    p {
        margin-top: 3em;
        text-align: center;
        color: var(--text-light);
    }

    @media only screen and (min-width: 768px) { 
        img {
            width: 100px;
        }
    }

    @media only screen and (min-width: 1200px) {
        .container {
            display: grid;
            grid-template-columns: auto auto auto;
        }

        p {
            margin-top: 1em;
        }
    }
`

export default Pricing;