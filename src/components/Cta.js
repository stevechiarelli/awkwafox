import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import styled from "styled-components";
import Modal from "./Modal";

const Cta = (props) => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState(null);
    const [category, setCategory] = useState("faq");

    // GraphQL FAQ Query
    const content = useStaticQuery(query);
    let faqs = content.faqs.nodes;
    let services = content.services.nodes;

    faqs = faqs.filter(item => item.category === props.category);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
    });

    const handleClick = (event) => {
        if (event.target.id === "faq") {
            setCategory("faq");
            setData(faqs);
        }
        else {
            setCategory("registration");
            setData(services);
        }

        setModal(true);
    }

    const handleClose = () => {
        setModal(false);
    }

    const handleClickOutside = (event) => {
        if (event.target.id === "modal") {
            setModal(false);
        }
    }

    return (
        <Wrapper category={props.category}>
            <div className="container">
                <h2>{props.data.heading}</h2>
                <p>{props.data.content}<button className="link" id="faq" aria-label="faq" onClick={handleClick}>{props.data.link}</button></p>
                {props.data.button.map(item => {
                    if (item.buttonURL === "#" || item.buttonURL === "") {
                        return <button key={item.id} className="btn-primary" onClick={handleClick}>{item.buttonText}</button>
                    }
                    else {
                        return <Link to={item.buttonURL} key={item.id} className="btn-primary">{item.buttonText}</Link>
                    }
                })}
            </div>
            <ModalWrapper>
                <Modal category={category} type={props.category} data={data} modal={modal} handleClose={handleClose} />
            </ModalWrapper>
        </Wrapper>
    );
}

const query = graphql`
{
    faqs:allStrapiFaqs {
      nodes {
        id
        question
        answer
        category
      }
    }
    services:allStrapiServices {
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
    background: ${props => props.category === "livestream" ? "#D3C09A" : "#1F3857"};
    padding: 5em 0 5em 0;

    .container {
        text-align: center;

        h2 {
            color: ${props => props.category === "livestream" ? "#424c64" : "#EEEEEE"};
        }

        p {
            color: ${props => props.category === "livestream" ? "#424c64" : "#EEEEEE"};
        }

        .btn-primary {
            color: ${props => props.category === "livestream" ? "#424c64" : "#EEEEEE"};
            border: 3px solid ${props => props.category === "livestream" ? "#424c64" : "#EEEEEE"};
            margin: 0.2em 0.5em 1em 0.5em;
        }

        .btn-primary:hover {
            background: ${props => props.category === "livestream" ? "#DFCBA4" : "#294971"};
        }

        .link {
            color: ${props => props.category === "livestream" ? "#424c64" : "#EEEEEE"};
            font-size: 1em;
            font-style: italic;
            text-decoration: underline;
            margin: 0 8px;
            padding: 0;
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

export default Cta;