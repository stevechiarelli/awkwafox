import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import CsvToUl from "./CsvToUl";
import Modal from "./Modal";
import styled from "styled-components";
import icon from "../assets/images/icon.svg";

const Pricing = (props) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState(null);
    const [item, setItem] = useState("");

    // GraphQL FAQ Query
    const content = useStaticQuery(query);
    let services = content.services.nodes;
    services = services.filter(item => item.category === props.category && item.package === true && !item.name.includes("other"))

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
    });

    const handleClick = (event) => {
        const arr = event.target.dataset.item.split(",");
        setData(services);
        setItem(arr);
        setModal(true);
    }

    const handleClose = () => {
        setModal(false);
    }

    const handleClickOutside = (event) => {
        if (event.target.id === "inquiry") {
            setModal(false);
        }
    }

    return (
        <Wrapper>
            <div className="container">
                {services.map(item => {
                    return (                
                        <div key={item.id} className="pricing">
                            <img src={icon} alt="Awkwafox icon" />
                            <p>{item.description}</p>
                            <p>{item.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                            <CsvToUl package={item.details} />
                            <button className="btn-primary" data-item={[item.name, item.description, item.price]} onClick={handleClick}>select</button>
                        </div>
                    );
                })}
            </div>
            <ModalWrapper>
                <Modal category="inquiry" type="videography" data={data} modal={modal} selection={item} handleClose={handleClose} />
            </ModalWrapper>
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
        disabledPackageList
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
    padding: 4em 0.5em 1em 0.5em;

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
        margin: 3em 0 5em 0;

        p {
            margin: 0;
            color: #555;
        }

        ul {
            margin: 1.5em;
            text-align: left;
            list-style-type: none;
            text-align: center;
            
            li {
                margin: 0.3em 0;
                font-size: 0.8em;
                padding: 1em 0;
                color: #666;
            }

            li:nth-child(odd) {
                background: #fff;
            }
        }

        .btn-primary {
            color: var(--background6);
            border: 3px solid var(--background6);
            margin: 0.2em 0.5em 1em 0.5em;
        }

        .btn-primary:hover {
            background: #fff;
            opacity: 0.9;
        }

        img {
            width: 80px;
            margin: -15px auto 0 auto;
        }
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

const ModalWrapper = styled.section`
    .form-content {
        position: relative;
        padding: 2em;
    }

    .faq {
        margin: 2em 0 1em 0;

        .question {
            color: var(--primary);
            margin-bottom: 0.5em;
        }

        .answer {
            font-size: 0.9em;
            padding: 0 1em;
            border-left: 3px solid var(--primary);
        }
    }

    .faq-title {
        color: var(--primary);
        margin-top: 3em;
    }
`

export default Pricing;