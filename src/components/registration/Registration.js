import React from "react";
import { navigate } from 'gatsby-link';
import Loading from "../Loading";
import styled from "styled-components";
import Package from "./Package";
import Event from "./Event";
import Customer from "./Customer";
import Summary from "./Summary";
import dots_sm from "../../assets/images/dots-sm.svg";

class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            error: "",
            loading: false,
            required: { color: "#111111" },
            botfield: "",
            package: "",
            phone: "",
            phonetype: "MobilePhone",
            formData: {
                FirstName: "",
                LastName: "",
                Email: "",
                JobRole: "Primary Contact",
                Source: "",
                EventDate: new Date("0001-01-01"),
            },
            customFields: {
                'CF-708858': 0, // quote total
                'CF-708855': "", // package
                'CF-708918': "", // details
                'CF-708921': "", // requests
                'CF-708912': "", // location
                'CF-711549': "", // business or event name
                'CF-711552': "", // website type
            },
            addons: {
                Second_Shooter: false,
                Raw_Footage: false,
                Ceremony_Live_Stream: false,
                Ceremony_Edit: false,
                Cinematic_Trailer: false,
                Event_Promo: false,
                Photo_Montage: false,
                Wedding_Website: false,
                Event_Website: false,
                Content_Management_System: false,
                Database_Integration: false,
            }
        }
    }

    handleData = (event) => { 
        const {id, value, type, checked} = event.target;
        const arr = value.split(",");

        if (id === "CF-708855") {
            this.setState((state) => ({
                package: arr[0],
                customFields: {
                    ...state.customFields,
                    'CF-708858': Number(arr[2]), // quote total
                    'CF-708855': arr[1], // package,
                    'CF-708918': "", // details
                },
                addons: {
                    Second_Shooter: false,
                    Raw_Footage: false,
                    Ceremony_Live_Stream: false,
                    Ceremony_Edit: false,
                    Cinematic_Trailer: false,
                    Event_Promo: false,
                    Photo_Montage: false,
                    Wedding_Website: false,
                    Event_Website: false,
                    Content_Management_System: false,
                    Database_Integration: false,
                }
            }));
        }
        else if (type === "checkbox") {
            if (checked === true) {
                this.setState((state) => ({
                    customFields: { 
                        ...state.customFields,
                        'CF-708858': state.customFields['CF-708858'] + Number(arr[1]),  
                    },
                    addons: {
                        ...state.addons,
                        [id]: true
                    }
                }));
            }
            else {
                this.setState((state) => ({
                    customFields: {
                        ...state.customFields, 
                        'CF-708858': state.customFields['CF-708858'] - Number(arr[1]),
                    },
                    addons: {
                        ...state.addons,
                        [id]: false 
                    }
                }));
            }
        }
        else {
            this.setState((state) => ({
                customFields: { 
                    ...state.customFields, 
                    [id]: value 
                }
            }));
        }
    }

    handleChange = (event) => {
        const {id, value} = event.target;

        if (id === "phone" || id === "phonetype" || id === "botfield") {
            this.setState({ [id]: value })
        }
        else {
            this.setState((state) => ({
                formData: { 
                    ...state.formData, 
                    [id]: value 
                }
            }));
        }
    }

    handleDayClick = (day, modifiers = {}) => {
        if (modifiers.disabled) {
            return;
        }

        this.setState((state) => ({
            formData: {
                ...state.formData,
                EventDate: modifiers.selected ? null : day
            }
        }));
    }

    handleClick = (event) => {
        if (event.target.value === "next" && this.formValidation() === true) {
            this.setState((state) => ({ 
                page: state.page + 1,
                error: "",
                required: { color: "#111111" }  
            }));
        }
        else if (event.target.value === "previous") {
            this.setState((state) => ({ 
                page: state.page - 1,
                error: "",
                required: { color: "#111111" }  
            }));
        }
        else {
            this.setState({  
                required: { color: "red" }
            });
        }

        document.querySelector("#modal-form").scrollTo(0, 0);
        event.preventDefault();
    }

    handleSubmit = (event) => {  
        event.preventDefault();
        const responseURL = "https://www.awkwafox.com/form_response/" + this.props.type;
        
        if (this.state.botfield === "") {
            this.setState({ loading: true });
            
            fetch(process.env.GATSBY_TAVE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: this.encode({
                    'SecretKey': process.env.GATSBY_TAVE_SECRET_KEY,
                    'JobType': this.getJobType(),
                    [this.state.phonetype]: this.state.phone,
                    ...this.state.formData,
                    ...this.state.customFields,
                    'CF-708858': this.state.customFields['CF-708858'].toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
                    'EventDate': this.props.type !== "webdesign" ? this.state.formData.EventDate.toISOString().substring(0, 10) : "",
                    'CF-711795': this.getAddonList(),
                    'Message': "Submitted on " + new Date()
                }),
            })
            .then(() => {
                navigate(responseURL);
            })
        }
        else {
            navigate(responseURL);
        }
    }

    getJobType() {
        if (this.props.type === "videography") {
            return "Wedding";
        }
        else if (this.props.type === "livestream") {
            return "Live Stream";
        }
        else {
            return "Website";
        }
    }

    getAddonList() {
        let addons = "";
        let selected = false;

        for (let key in this.state.addons) {
            if (this.state.addons[key] === true) {
                addons = addons + key.replaceAll("_", " ") + ", ";
                selected = true;
            }
        }

        if (selected === true) {
            return addons.slice(0, -2);
        }

        return "none";
    }

    formValidation() {
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const phoneformat = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
        /* const zipformat = /(^\d{5}$)|(^\d{5}-\d{4}$)/; */

        if (this.state.page === 1) {
            if (this.state.package === "") {
                this.setState({ error: "*Please select a package!" });
                return false;
            }
        }

        if (this.state.page === 2) {
            if (this.props.type !== "webdesign") {
                if (this.state.formData.EventDate.toISOString().substring(0, 10) === new Date("0001-01-01").toISOString().substring(0, 10)) {
                    this.setState({ error: "*Please select an event date!" });
                    return false;
                }
    
                if (this.state.customFields['CF-708912'] === "") {
                    this.setState({ error: "*Location is required!" });
                    return false;
                }
            }
        }

        if (this.state.page === 3) {
            let requiredFields = ["FirstName", "LastName", "Email"];

            for (let required of requiredFields) {
                if (this.state.formData[required] === "") {
                    this.setState({ error: "*" + required + " is required!" });
                    return false;
                }
            }

            if (this.state.phone === "") {
                this.setState({ error: "*Phone number is required!" });
                return false;
            }

            if (!mailformat.test(this.state.formData.Email)) {
                this.setState({ error: "*Invalid email format!" });
                return false;
            }

            if (!phoneformat.test(this.state.phone)) {
                this.setState({ error: "*Invalid phone number format!" });
                return false;
            }
        }

        return true;
    }

    encode(data) {
        let str = "";

        Object.keys(data).forEach(function(key) {
            // Do not include empty or false data in the URI string
            if (data[key] !== false && data[key] !== "") {
                str = str + encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
                str = str + '&';
            }
        });

        return str.slice(0, -1);
    }

    render() {
        const service = this.props.data.filter(item => item.category === this.props.type && item.package === true);
        const details = this.props.data.filter(item => item.category === this.props.type && item.name === this.state.package && item.package === true);
        const addon = this.props.data.filter(item => item.category === this.props.type && item.addon === true);
        const serviceSummary = this.props.data.filter(item => item.category === this.props.type && item.name === this.state.package && item.package === true);
        const addonSummary = this.props.data.filter(item => item.category === this.props.type && item.addon === true && this.state.addons[item.name] !== false);
        
        return (
            <Wrapper>
                <form id="registration-form" name="registration" method="POST" onSubmit={this.handleSubmit}>
                    <div hidden>
                        <label>Don’t fill this out: <input type="text" id="botfield" onChange={this.handleChange} /></label>
                    </div>

                    {/* Page 1 */}
                    <div style={this.state.page === 1 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Select Package</h2>
                        <hr />
                        <p className="step-indicator">({this.props.type === "webdesign" ? "1 of 3" : "1 of 4"})</p>
                        <Package data={this.state} type={this.props.type} service={service} details={details} addon={addon} handleData={this.handleData} />
                    </div>

                    {/* Page 2 */}
                    <div style={this.state.page === 2 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">{this.props.type === "webdesign" ? "Website Info" : "Event Info"}</h2>
                        <hr />
                        <p className="step-indicator">(2 of 4)</p>
                        <Event data={this.state} type={this.props.type} handleDayClick={this.handleDayClick} handleData={this.handleData} />
                    </div>

                    {/* Page 3 */}
                    <div style={this.state.page === 3 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Your Info</h2>
                        <hr />
                        <p className="step-indicator">({this.props.type === "webdesign" ? "2 of 3" : "3 of 4"})</p>
                        <Customer data={this.state} handleChange={this.handleChange} />
                    </div>

                    {/* Page 4 */}
                    <div style={this.state.page === 4 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Summary</h2>
                        <hr />
                        <p className="step-indicator">({this.props.type === "webdesign" ? "3 of 3" : "4 of 4"})</p>
                        <Summary data={this.state} type={this.props.type} serviceSummary={serviceSummary} addonSummary={addonSummary} />
                    </div>

                    {/* Navigation */}
                    <div className="error"><small>{this.state.error}</small></div>
                    <div className="btn-group">
                        <button 
                            className="btn-primary" 
                            value="previous" 
                            onClick={this.handleClick} 
                            style={this.state.page > 1 && this.state.page < 5 ? {display: "block"} : {display: "none"}}>
                            Previous
                        </button>
                        <button 
                            className="btn-primary" 
                            value="next" 
                            onClick={this.handleClick}
                            style={this.state.page < 4 ? {display: "block"} : {display: "none"}}>
                            Next
                        </button>
                        <button 
                            className="btn-primary" 
                            type="submit"
                            style={this.state.page === 4 ? {display: "block"} : {display: "none"}}>
                            Submit
                        </button>
                    </div>
                </form>

                {this.state.loading === true ? <Loading /> : null}
            </Wrapper>
        );
    }
}

const Wrapper = styled.section`
    position: relative;
    padding: 2em;

    form {
        max-width: 600px;
        margin: -5.0em auto 2em auto;
    }

    &::after {
        content: 'awkwa fox';
        position: absolute;
        top: -20px;
        left: -30px;
        font-size: 8em;
        font-weight: 600;
        color: #f9f9f9;
        z-index: 0;
        width: 1000px;
    }

    &::before {
        content: '';
        background: url(${dots_sm});
        background-repeat: no-repeat;
        position: absolute;
        right: -20px;
        top: 125px;
        width: 50px;
        height: 700px;
        z-index: 1000;
    }

    h3 {
        color: var(--primary);
        margin: 1em 0;
    }

    p, .form-group p {
        color: var(--text-dark);
        font-size: 1em;
        text-align: left;
    }

    .step-title {
        position: relative;
        z-index: 1;
        font-weight: 600;
        color: var(--primary);
        margin-top: 6em;
    }

    .step-indicator {
        position: relative;
        z-index: 1;
        color: var(--primary);
        font-size: 0.9em;
        text-align: center;
    }

    ul {
        margin-top: 1em;
    }

    .highlight {
        position: relative;
        text-align: left;
        background: var(--background1);
        color: var(--primary);
        padding: 0.5em;
        width: 100%;
        height: 50px;
        z-index: 1;
    }

    .error {
        color: red;
        margin: 2em 0;
    }

    .form-group {
        margin-top: 1.5em;

        label {
            color: var(--text-dark);
            font-size: 0.9em;
        }

        input, textarea, select {
            padding: 0 0.8em;
        }

        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%235c6b8c'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;
            background-size: 12px;
            background-position: calc(100% - 13px) 16px;
            background-repeat: no-repeat;
            background-color: var(--background1);
            font-size: 1em;
        }

        textarea {
            width: 100%;
            height: 150px;
            resize: none;
            padding: 0.8em;
        }

        input, select {
            width: 100%;
            height: 40px;
        }

        input, textarea {
            background: #fff;
            color: var(--text-dark);
            border: 1px solid #aaa;
        }
    }

    .phone-group {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .form-group {
            margin-top: 0;
        }

        .form-group:nth-of-type(1) {
            width: 100%;
            margin-right: 1.5em;
        }

        .form-group:nth-of-type(2) {
            width: 125px;
            
            select {
                height: 40px;
            }
        }
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

    .service ul {
        list-style-type: initial;
        margin-left: 1em;
    }

    .btn-group {
        display: flex;
        justify-content: flex-end;
        margin-top: 2em;

        button:first-child {
            margin-right: 5px;
        }
    }

    table {
        border: none;
        width: 100%;

        tr:last-child {
            font-weight: 600;
        }

        td:first-child {
            padding-right: 1em;
        }
    }

    .checkbox {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        input {
            position: relative;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        &:hover input ~ .checkmark {
            background: #ccc;
        }

        input:checked:enabled ~ .checkmark {
            background: var(--primary);
        }

        input:checked ~ .checkmark:after {
            display: block;
        }

        .checkmark:after {
            left: 9px;
            top: 5px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    }
    
    .checkbox.disabled {
        cursor: initial;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background: #eee;
        
        &:after {
            content: "";
            position: absolute;
            display: none;
        }
    }

    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
        background: var(--primary) !important;
    }

    @media only screen and (min-width: 768px) {
        .calendar {
            display: block;
            width: 100%;
        }

        .calendar-mobile {
            display: none;
        }

        .input-group {
            display: flex;
            justify-content: space-between;

            .form-group {
                width: 48%;
                margin: 0;
            }
        } 
    }
`

export default Registration;