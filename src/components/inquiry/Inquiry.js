import React from "react";
import { navigate } from 'gatsby-link';
import Loading from "../Loading";
import styled from "styled-components";
import Package from "./Package";
import Addons from "./Addons";
import EventDate from "./EventDate";
import EventInfo from "./EventInfo";
import Customer from "./Customer";
import Summary from "./Summary";

class Inquiry extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            error: "",
            loading: false,
            required: { color: "#666666" },
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
                second_shooter: false,
                raw_footage: false,
                ceremony_live_stream: false,
                ceremony_edit: false,
                cinematic_trailer: false,
                event_promo: false,
                photo_montage: false,
                wedding_website: false,
                event_website: false,
                content_management_system: false,
                database_integration: false,
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
                    second_shooter: false,
                    raw_footage: false,
                    ceremony_live_stream: false,
                    ceremony_edit: false,
                    cinematic_trailer: false,
                    event_promo: false,
                    photo_montage: false,
                    wedding_website: false,
                    event_website: false,
                    content_management_system: false,
                    database_integration: false,
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

        if (id === "phone") {
            if ((value.length === 3 && this.state.phone.length !== 4) || (value.length === 7 && this.state.phone.length !== 8)) {
                this.setState({ [id]: value + "-" })
            }
            else if (value.length === 10 && !value.includes("-")) {
                this.setState({ [id]: value.substring(0, 3) + "-" + value.substring(3, 6) + "-" + value.substring(6, 10) })
            } 
            else {
                this.setState({ [id]: value })
            }
        }
        else if (id === "phonetype" || id === "botfield") {
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
                required: { color: "#666666" }  
            }));
        }
        else if (event.target.value === "previous") {
            this.setState((state) => ({ 
                page: state.page - 1,
                error: "",
                required: { color: "#666666" }  
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
        let responseURL = "https://www.awkwafox.com/" + this.props.type + "/?modal=true";

        if (this.props.type === "videography") {
            responseURL = "https://www.awkwafox.com/weddingfilms/?modal=true";
        }
     
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
                    'EventDate': this.state.formData.EventDate.toISOString().substring(0, 10),
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
        const phoneformat = /^[1-9]\d{2}-\d{3}-\d{4}/;
        // const phoneformat = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im; 
        // const zipformat = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

        if (this.state.page === 1) {
            if (this.state.package === "") {
                this.setState({ error: "*Please select a package!" });
                return false;
            }
        }

        if (this.state.page === 3) {
            if (this.state.formData.EventDate.toISOString().substring(0, 10) === new Date("0001-01-01").toISOString().substring(0, 10)) {
                this.setState({ error: "*Please select an event date!" });
                return false;
            }
        }

        
        if (this.state.page === 4) {
            if (this.state.customFields['CF-708912'] === "") {
                this.setState({ error: "*Location is required!" });
                return false;
            }
        }

        if (this.state.page === 5) {
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
                <form id="inquiry-form" name="inquiry" method="POST" onSubmit={this.handleSubmit}>
                    <div hidden>
                        <label>Don’t fill this out: <input type="text" id="botfield" onChange={this.handleChange} /></label>
                    </div>

                    {/* Page 1 */}
                    <div style={this.state.page === 1 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Select Package  <span className="step-indicator">(1 of 6)</span></h2>
                        <hr />
                        <Package data={this.state} type={this.props.type} service={service} details={details} handleData={this.handleData} />
                    </div>

                    {/* Page 2 */}
                    <div style={this.state.page === 2 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">{this.state.package.includes("other") ? "Select Package Cont." : "Select Add-ons"} <span className="step-indicator">(2 of 6)</span></h2>
                        <hr />
                        <Addons data={this.state} type={this.props.type} addon={addon} handleData={this.handleData} />
                    </div>

                    {/* Page 3 */}
                    <div style={this.state.page === 3 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Event Date <span className="step-indicator">(3 of 6)</span></h2>
                        <hr />
                        <EventDate data={this.state} type={this.props.type} handleDayClick={this.handleDayClick} handleData={this.handleData} />
                    </div>
                    
                    {/* Page 4 */}
                    <div style={this.state.page === 4 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Event Info <span className="step-indicator">(4 of 6)</span></h2>
                        <hr />
                        <EventInfo data={this.state} type={this.props.type} handleDayClick={this.handleDayClick} handleData={this.handleData} />
                    </div>

                    {/* Page 5 */}
                    <div style={this.state.page === 5 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Your Info <span className="step-indicator">(5 of 6)</span></h2>
                        <hr />
                        <Customer data={this.state} handleChange={this.handleChange} />
                    </div>

                    {/* Page 6 */}
                    <div style={this.state.page === 6 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Summary <span className="step-indicator">(6 of 6)</span></h2>
                        <hr />
                        <Summary data={this.state} type={this.props.type} serviceSummary={serviceSummary} addonSummary={addonSummary} />
                    </div>

                    {/* Navigation */}
                    <div className="error"><small>{this.state.error}</small></div>
                    <div className="btn-group">
                        <button 
                            className="btn-primary" 
                            value="previous" 
                            onClick={this.handleClick} 
                            style={this.state.page > 1 && this.state.page <= 6 ? {display: "block"} : {display: "none"}}>
                            Previous
                        </button>
                        <button 
                            className="btn-primary" 
                            value="next" 
                            onClick={this.handleClick}
                            style={this.state.page < 6 && this.state.package !== "" ? {display: "block"} : {display: "none"}}>
                            Next
                        </button>
                        <button 
                            className="btn-primary" 
                            type="submit"
                            style={this.state.page === 6 ? {display: "block"} : {display: "none"}}>
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
    padding: 0 1.5em;

    form {
        position: relative;
        max-width: 900px;
        margin: 0;
        height: 575px;
    }

    &::after {
        content: 'awkwa fox';
        position: absolute;
        top: -90px;
        right: -50px;
        font-size: 6em;
        font-weight: 600;
        color: #f9f9f9;
        z-index: 0;
        width: 1000px;
    }



    h3 {
        color: var(--primary);
        margin: 1em 0;
        font-size: 0.9em;
    }

    p, .form-group p {
        color: var(--text-dark);
        font-size: 0.8em;
        text-align: left;
    }

    .small {
        font-size: 0.6em;
    }

    .step-title {
        position: relative;
        z-index: 1;
        font-weight: 600;
        color: var(--primary);
        font-size: 1.2em;
    }

    .step-indicator {
        position: relative;
        z-index: 1;
        color: var(--primary);
        font-size: 0.6em;
    }

    ul {
        li {
            font-size: 0.7em;
        }
    }

    .highlight {
        position: relative;
        text-align: left;
        background: var(--background1);
        color: var(--primary);
        padding: 11px 0 8px 8px;
        width: 100%;
        height: 45px;
        z-index: 1;
    }

    .error {
        color: red;
        margin: 0.5em 0;
    }

    .form-group {
        margin: 0.5em 0;
        color: var(--text-dark);
        font-size: 0.9em;

        label {
            color: var(--text-dark);
            font-size: 0.8em;
        }

        input, textarea, select {
            padding: 0 0.8em;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%235c6b8c'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;
            background-size: 12px;
            background-position: calc(100% - 13px) 16px;
            background-repeat: no-repeat;
            background-color: transparent;
            font-size: 1em;
        }

        textarea {
            width: 100%;
            height: 90px;
            resize: none;
            padding: 0.8em;
            margin-top: 0.5em;
        }

        input, select {
            width: 100%;
            height: 40px;
        }

        input, textarea {
            background: #fff;
            color: var(--text-dark);
        }
    }

    .phone-group {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .form-group {
            margin-top: 0;
        }

        .input-type:nth-of-type(1) {
            width: 100%;
            margin-right: 10px;
        }

        .input-type:nth-of-type(2) {
            width: 140px;
            
            select {
                height: 40px;
                width: 100%;
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
        /* position: absolute;
        bottom: 0;
        right: 0; */
        display: flex;
        justify-content: flex-end;
        margin: 1em 0;

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

        td {
            font-size: 0.7em;
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
        padding: 0 2em;

        .calendar {
            display: block;
            width: 100%;
        }

        .calendar-mobile {
            display: none;
        }

        .form-group {
            select {
                width: 50%;
            }
        }

        .input-group {
            display: flex;
            justify-content: space-between;

            .form-group {
                width: 49%;
                margin: 0;
            }
        } 

        .step-title {
            margin-top: 1em;
        }

        ul {
            li {
                font-size: 0.8em;
            }
        }

        .summary {
            display: grid;
            grid-template-columns: 48% 48%;
            grid-column-gap: 25px;

            p, td {
                font-size: 0.7em;
            }

            .small {
                font-size: 0.6em;
            }
        }
    }
`

export default Inquiry;