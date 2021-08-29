import React, { useState } from "react";
import Loading from "./Loading";
import styled from "styled-components";
import contactHero from "../assets/images/contact.jpg";

const ContactForm = (props) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        if (formValidation(event) === true) {
            setLoading(true);

            setTimeout(() => {
                document.getElementById("contact-form").submit();
                setLoading(false);
            }, 3000);
        }
    }

    const formValidation = (event) => {
        let form = document.getElementById("contact-form");

        for (var i=0; i < form.elements.length; i++){
            if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
                return false;
            }
        }

        event.preventDefault();
        return true;
    }

    return (
        <Wrapper>
            <div className="container">
                <form id="contact-form" name="contact" method="POST" data-netlify="true">
                    <div className="fields">
                        <div className="form-left">
                            <h3>{props.data.heading}</h3>
                            <p>{props.data.content}</p>
                            <ul>
                                <li>Phone: {props.data.phone}</li>
                                <li>Email: {props.data.email}</li>
                            </ul>
                            <div className="form-group">
                                <label htmlFor="first_name">first name</label><br />
                                <input 
                                    type="text" 
                                    name="first_name" 
                                    placeholder="first name here..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">last name</label><br />
                                <input 
                                    type="text" 
                                    name="last_name" 
                                    placeholder="last name here..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">email</label><br />
                                <input 
                                    type="text" 
                                    name="email" 
                                    placeholder="email here..." 
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-right">
                            <div className="form-group">
                                <label htmlFor="subject">subject</label><br />
                                <input 
                                    type="text" 
                                    name="subject" 
                                    placeholder="subject here..." 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">message</label><br />
                                <textarea 
                                    name="message"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary">submit</button>
                        </div>
                    </div>
                </form>

                {loading === true ? <Loading /> : null}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    background: url(${contactHero});
    background-position: top center;

    .container {
        margin: 0;
        padding: 4em 0;
        min-height: 600px;
    }

    form {
        background: var(--background3);
        opacity: 0.8;
        padding: 3em;
    }
    
    h3 {
        color: var(--secondary);
    }
    
    p, ul li {
        color: var(--text-light);
    }

    .btn-primary {
        color: var(--text-light);
        border: 3px solid var(--text-light);
        margin-top: 1.7em;
    }

    .btn-primary:hover {
        background: #333;
    }

    .iframe {
        width: 100%;
        height: 300px;
        overflow: visible;
        border: none;
        margin: 3em 0 0 0;
        padding: 0;
    }

    .loading {
        position: fixed;
        background: rgba(0, 0, 0, 0.7);
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        z-index: 1000;
    }

    .form-group {
        margin: 0.8em 0;

        input, textarea {
            width: 100%;
            background: var(--background4);
            border: 0;
            color: #eee;
        }
        
        input {
            height: 40px;
        }
        
        textarea {
            height: 292px;
        }
        
        label {
            color: var(--text-light);
            font-size: 0.8em;
        }
    }

    @media only screen and (min-width: 768px) {
        .container {
            padding: 8em 0;
            margin: 0 auto;
        }
    }

    @media only screen and (min-width: 992px) {
        .container .fields {
            display: grid;
            grid-template-columns: 48% 48%;
            grid-column-gap: 4%;
        }
    }
`

export default ContactForm;