import React, { useState } from "react";
import { navigate } from 'gatsby-link';
import Loading from "./Loading";
import styled from "styled-components";
import contactHero from "../assets/images/contact.jpg";

const ContactForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({});

    const handleChange = (event) => {
        setState({ ...state, [event.target.id]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (state["CF-709314"] === undefined) {
            setLoading(true);
            
            fetch(process.env.GATSBY_TAVE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encode({
                    'SecretKey': process.env.GATSBY_TAVE_SECRET_KEY,
                    ...state,
                }),
            })
            .then(() => {
                //navigate("https://www.awkwafox.com/form_response/default");
                console.log(encode({
                    'SecretKey': process.env.GATSBY_TAVE_SECRET_KEY,
                    ...state,
                }),)
            })
            .catch(function(error) {
                console.log(error);
            });
        }
        else {
            //navigate("https://www.awkwafox.com/form_response/default");
        }
    }

    return (
        <Wrapper>
            <div className="container">
                <form id="contact-form" name="contact" method="POST" onSubmit={handleSubmit}>
                    <div className="fields">
                        <div hidden>
                            <label>Don’t fill this out: <input type="text" id="CF-709314" onChange={handleChange} /></label>
                        </div>
                        <div className="form-left">
                            <h3>{props.data.heading}</h3>
                            <p>{props.data.content}</p>
                            <ul>
                                <li>Phone: {props.data.phone}</li>
                                <li>Email: {props.data.email}</li>
                            </ul>
                        </div>
                        <div className="form-right">
                            <div className="input-group">
                                <div className="form-group">
                                    <label htmlFor="FirstName">First Name</label><br />
                                    <input 
                                        type="text" 
                                        id="FirstName"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="LastName">Last Name</label><br />
                                    <input 
                                        type="text" 
                                        id="LastName" 
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email">Email</label><br />
                                <input 
                                    type="text" 
                                    id="Email" 
                                    onChange={handleChange} 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="phone-group" htmlFor={state["CF-710382"] !== undefined ? state["CF-710382"] : "MobilePhone"}>
                                    <div className="form-group">
                                        Phone
                                        <input 
                                            type="tel" 
                                            id={state["CF-710382"] !== undefined ? state["CF-710382"] : "MobilePhone"} 
                                            maxLength="14"
                                            onChange={handleChange} 
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select id="CF-710382" onChange={handleChange}>
                                            <option value="MobilePhone" defaultValue>mobile</option>
                                            <option value="HomePhone">home</option>
                                            <option value="WorkPhone">work</option>
                                        </select>
                                    </div>
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="JobType">What service are you interested in?</label><br />
                                <select id="JobType" onChange={handleChange} required>
                                    <option hidden value=""> -- select an option -- </option>
                                    <option value="Wedding">Wedding Videography</option>
                                    <option value="Live Stream">Live Stream</option>
                                    <option value="Website">Web Design</option>
                                </select>
                            </div>
                            <div className={state.JobType === "Wedding" ? "form-group" : "form-group hidden"}>
                                <label htmlFor="JobRole">I'm the...</label><br />
                                <select id="JobRole" onChange={handleChange} required={state.JobType === "Wedding" ? "required" : ""}>
                                    <option hidden value=""> -- select an option -- </option>
                                    <option value="Bride">Bride</option>
                                    <option value="Groom">Groom</option>
                                    <option value="Planner">Wedding Planner</option>
                                    <option value="Photographer">Photographer</option>
                                    <option value="Client 1">Other</option>
                                </select>
                            </div>

                            {state.JobType !== "Wedding" ? <input type="hidden" id="JobRole" value="Client 1" /> : null}

                            <div className={state.JobType === "Wedding" || state.JobType === "Live Stream" ? "form-group" : "form-group hidden"}>
                                <label htmlFor="EventDate">Event Date</label><br />
                                <input 
                                    type="date" 
                                    id="EventDate" 
                                    onChange={handleChange} 
                                    required={state.JobType === "Wedding" || state.JobType === "Live Stream" ? "required" : ""}
                                />
                            </div>
                            <div className={state.JobType === "Wedding" || state.JobType === "Live Stream" ? "form-group" : "form-group hidden"}>
                                <label htmlFor="CF-708912">Location (city or venue name)</label><br />
                                <input 
                                    type="text" 
                                    id="CF-708912" 
                                    onChange={handleChange} 
                                    required={state.JobType === "Wedding" || state.JobType === "Live Stream" ? "required" : ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Message">Message</label><br />
                                <textarea 
                                    id="Message"
                                    onChange={handleChange}
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

function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
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

    .form-group {
        margin-top: 0.8em;

        input, textarea, select {
            width: 100%;
            background: #fff;
            border: 0;
            color: #000;
            padding: 0 0.8em;
        }
        
        input, select {
            height: 40px;
        }
        
        textarea {
            height: 292px;
            padding: 0.8em;
        }
        
        label {
            color: var(--text-light);
            font-size: 0.8em;
        }

        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%235c6b8c'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;
            background-size: 12px;
            background-position: calc(100% - 13px) 18px;
            background-repeat: no-repeat;
            background-color: #fff;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0px 1000px #fff inset;      
        }
    }

    .phone-group {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .form-group:nth-of-type(1) {
            width: 100%;
        }

        .form-group:nth-of-type(2) {
            width: 115px;
        }
    }

    @media only screen and (min-width: 768px) {
        .container {
            padding: 8em 0;
            margin: 0 auto;

            .input-group {
                display: flex;
                justify-content: space-between;

                .form-group {
                    width: 48%;
                }
            } 
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