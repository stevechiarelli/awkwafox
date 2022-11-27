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
    const services = content.services.nodes;

    const packages = services.filter(item => item.category === props.category && item.package === true && !item.name.includes("other"))

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
                {packages.map(item => {
                    return (                
                        <div key={item.id} className="pricing">
                            <img src={icon} alt="Awkwafox icon" />
                            <p>{item.description}</p>
                            <p>{item.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                            <CsvToUl package={item.details} />
                            <button className="btn-primary btn-disabled" data-item={[item.name, item.description, item.price]} onClick={handleClick} disabled={true}>select</button>
                        </div>
                    );
                })}
            </div>
            <ModalWrapper>
                <Modal category="inquiry" type={props.category} data={data} modal={modal} selection={item} handleClose={handleClose} />
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
            name
            price
            details
            package
            addon
        }
    }
}
`

const Wrapper = styled.section`
    padding: 4em 0 1em 0;

    .pricing {
        text-align: center;
        margin: 3em 0 5em 0;

        p {
            margin: 0;
            color: #555;
        }

        ul {
            margin: 0.5em;
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
            margin: 1em 0.5em;
        }

        .btn-primary:hover {
            background: #fff;
            opacity: 0.9;
        }

        img {
            width: 50px;
            margin: -15px auto 0 auto;
        }
    }

    @media only screen and (min-width: 768px) { 
        .container {
            display: grid;
            grid-template-columns: auto auto auto;
            grid-gap: 1em;
        }

        .pricing {
            ul {
                margin: 0;
            }
        }

        p {
            margin-top: 1em;
        }
    }

    @media only screen and (min-width: 992px) {
        padding: 4em 1em 1em 1em;

        .pricing {
            ul {
                margin: 1.5em;
            }

            .btn-primary {
                margin: 0.2em 0.5em;
            }
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