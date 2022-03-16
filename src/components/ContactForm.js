import React, { useState, useEffect } from "react";
import { navigate } from 'gatsby-link';
import Loading from "./Loading";
import styled from "styled-components";
import contactHero from "../assets/images/contact.jpg";

const ContactForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState("");
    const [phoneType, setPhoneType] = useState("MobilePhone");
    const [state, setState] = useState({});

    useEffect(() => {
        setState({JobRole: "Primary Contact"})
    }, []);

    const handleChange = (event) => {
        const {id, value} = event.target;

        if (id === "phone") {
            if ((value.length === 3 && phone.length !== 4) || (value.length === 7 && phone.length !== 8)) {
                setPhone(value + "-");
            }
            else if (value.length === 10 && !value.includes("-")) {
                setPhone(value.substring(0, 3) + "-" + value.substring(3, 6) + "-" + value.substring(6, 10));
            } 
            else {
                setPhone(value);
            }
        }
        else {
            setState({ ...state, [id]: value });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (state.botfield === undefined) {
            setLoading(true);
            
            fetch(process.env.GATSBY_TAVE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encode({
                    'SecretKey': process.env.GATSBY_TAVE_SECRET_KEY,
                    ...state, 
                    [phoneType]: phone
                }),
            })
            .then(() => {
                navigate("https://www.awkwafox.com/?modal=true");
            })
        }
        else {
            navigate("https://www.awkwafox.com/?modal=true");
        }
    }

    return (
        <Wrapper>
            <div className="container">
                <form id="contact-form" name="contact" method="POST" onSubmit={handleSubmit}>
                    <div className="fields">
                        <div hidden>
                            <label>Don’t fill this out: <input type="text" id="botfield" onChange={handleChange} /></label>
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
                                    type="email" 
                                    id="Email" 
                                    onChange={handleChange} 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="phone-group" htmlFor="phone">
                                    <div className="input-type">
                                        Phone
                                        <input 
                                            type="tel"
                                            id="phone"
                                            value={phone}
                                            maxLength="12"
                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            onChange={handleChange} 
                                            required
                                        />
                                    </div>
                                    <div className="input-type">
                                        <select onChange={(e) => setPhoneType(e.target.value)}>
                                            <option value="MobilePhone">mobile</option>
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
                            <div className={state.JobType === undefined ? "form-group hidden" : "form-group"}>
                                <label htmlFor="Source">How did you hear about us?</label><br />
                                <select id="Source" onChange={handleChange} required>
                                    <option hidden value=""> -- select an option -- </option>
                                    <option value="Google">Google</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="The Knot">The Knot</option>
                                    <option value="Wedding Wire">Wedding Wire</option>
                                    <option value="Vendor Referral">Vendor Referral</option>
                                    <option value="Client Referral">Client Referral</option>
                                    <option value="Other">Other</option>
                                </select>
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
            -webkit-min-logical-width: calc(100% - 16px);
            border: 1px solid #ccc;
            border-radius: 4px;
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

        .input-type:nth-of-type(1) {
            width: 100%;
            margin-right: 10px;
        }

        .input-type:nth-of-type(2) {
            width: 140px;
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
                    width: 49%;
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