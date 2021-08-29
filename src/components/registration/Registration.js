import React from "react";
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
            name: "",
            email: "",
            phone: "",
            referral: "",
            total: 0,
            category: "",
            date: null,
            location: "",
            requests: "",
            details: "",
            spouse_name: "",
            flashdrive: false,
            footage: false,
            ceremony_livestream: false,
            ceremony_edit: false,
            trailer: false,
            montage: false,
            website: false,
            cms: false,
            dbms: false
        }
    }

    handleChange = (event) => { 
        const {name, value} = event.target;
        if (name === "category") {
            let arr = event.target.value.split(",");
            this.setState({
                total: Number(arr[1]),
                category: arr[0],
                flashdrive: false,
                footage: false,
                ceremony: false,
                ceremony_edit: false,
                trailer: false,
                montage: false,
                website: false,
                cms: false,
                dbms: false,
                details: ""
            });
        }
        else if (event.target.type === "checkbox") {
            let arr = event.target.value.split(",");

            if (event.target.checked === true) {
                this.setState((state) => ({
                    total: state.total + Number(arr[1]),
                    [name]: true
                }));
            }
            else {
                this.setState((state) => ({
                    total: state.total - Number(arr[1]),
                    [name]: false
                }));
            }
        }
        else {
            this.setState({
                [name]: value
            });
        }
    }

    handleDayClick = (day, modifiers = {}) => {
        if (modifiers.disabled) {
            return;
        }

        this.setState({
          date: modifiers.selected ? null : day
        });
    }

    handleClick = (event) => {
        if (event.target.value === "next" && this.formValidation() === true) {
            if (this.props.type === "webdesign" && this.state.page === 1) {
                this.setState((state) => ({
                    page: state.page + 2,
                    error: "",
                    required: { color: "#111111" } 
                }));
            }
            else {
                this.setState((state) => ({
                    page: state.page + 1,
                    error: "",
                    required: { color: "#111111" } 
                }));
            }
        }
        else if (event.target.value === "previous") {
            if (this.props.type === "webdesign" && this.state.page === 3) {
                this.setState((state) => ({
                    page: state.page - 2,
                    error: "",
                    required: { color: "#111111" } 
                }));
            }
            else {
                this.setState((state) => ({
                    page: state.page - 1,
                    error: "",
                    required: { color: "#111111" } 
                }));
            }
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
        
        if (this.formValidation() === true) {
            this.setState({
                loading: true
            });

            setTimeout(() => {
                document.getElementById("registration-form").submit();
                this.setState({
                    loading: false
                });
            }, 3000);
        }
    }

    formValidation() {
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const phoneformat = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
        /* const zipformat = /(^\d{5}$)|(^\d{5}-\d{4}$)/; */

        if (this.state.page === 1) {
            if (this.state.category === "") {
                this.setState({ 
                    error: "Fields indicated with * are required!" 
                });
                
                return false;
            }
        }

        if (this.state.page === 2) {
            if (this.state.location === "") {
                this.setState({ 
                    error: "Fields indicated with * are required!" 
                });
                
                return false;
            }

            if (this.state.date === null) {
                this.setState({
                    error: "Please select an event date!"
                });

                return false;
            }
        }

        if (this.state.page === 3) {
            if (this.state.name === "" || this.state.email === "" || this.state.phone === "") {
                this.setState({
                    error: "Fields indicated with * are required!"
                });
            
                return false;
            }

            if (!mailformat.test(this.state.email)) {
                this.setState({
                    error: "Invalid email format!"
                });

                return false;
            }

            if (!phoneformat.test(this.state.phone)) {
                this.setState({
                    error: "Invalid phone number format!"
                });

                return false;
            }
        }

        return true;
    }

    render() {
        const service = this.props.data.filter(item => item.category === this.props.type && item.package === true);
        const details = this.props.data.filter(item => item.category === this.props.type && item.name === this.state.category && item.package === true);
        const addon = this.props.data.filter(item => item.category === this.props.type && item.addon === true);
        const serviceSummary = this.props.data.filter(item => item.category === this.props.type && item.name === this.state.category && item.package === true);
        const addonSummary = this.props.data.filter(item => item.category === this.props.type && item.addon === true && this.state[item.name] !== false);

        const page1 = <Package data={this.state} type={this.props.type} service={service} details={details} addon={addon} handleChange={this.handleChange} />;
        const page2 = <Event data={this.state} handleDayClick={this.handleDayClick} handleChange={this.handleChange} />;
        const page3 = <Customer data={this.state} handleChange={this.handleChange} />;
        const page4 = <Summary data={this.state} serviceSummary={serviceSummary} addonSummary={addonSummary} />;
        
        return (
            <Wrapper>
                <form id="registration-form" name="registration" method="POST" action="/success" data-netlify="true">

                    {/* Page 1 */}
                    <div style={this.state.page === 1 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Select Package</h2>
                        <hr />
                        <p className="step-indicator">({this.props.type === "webdesign" ? "1 of 3" : "1 of 4"})</p>
                        {page1}
                    </div>

                    {/* Page 2 */}
                    <div style={this.state.page === 2 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Event Info</h2>
                        <hr />
                        <p className="step-indicator">(2 of 4)</p>
                        {page2}
                    </div>

                    {/* Page 3 */}
                    <div style={this.state.page === 3 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Your Info</h2>
                        <hr />
                        <p className="step-indicator">({this.props.type === "webdesign" ? "2 of 3" : "3 of 4"})</p>
                        {page3}
                    </div>

                    {/* Page 4 */}
                    <div style={this.state.page === 4 ? {display: "block"} : {display: "none"}}>
                        <h2 className="step-title">Summary</h2>
                        <hr />
                        <p className="step-indicator">({this.props.type === "webdesign" ? "3 of 3" : "4 of 4"})</p>
                        {page4}
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
                            value="submit"
                            onClick={this.handleSubmit} 
                            style={this.state.page === 4 ? {display: "block"} : {display: "none"}}>
                            Submit
                        </button>
                    </div>

                    <input type="hidden" name="total" value={this.state.total} />
                    <input type="hidden" name="type" value={this.props.type} />
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
        z-index: 1;
    }

    .error {
        color: red;
        margin: 2em 0;
    }

    .form-group {
        margin: 2em 0;

        label {
            color: var(--text-dark);
            font-size: 0.9em;
        }

        select {
            width: 100%;
            height: 40px;
            font-size: 1em;
        }

        textarea {
            width: 100%;
            height: 150px;
            resize: none;
        }

        input {
            width: 100%;
            height: 35px;
        }

        input, textarea {
            background: #fff;
            color: var(--text-dark);
            border: 1px solid #aaa;
        }
    }

    .service ul {
        list-style-type: initial;
        margin-left: 1em;
    }

    .btn-group {
        display: flex;
        justify-content: flex-end;

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

    /* checkbox style */
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
    }
    
    .checkbox input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background: #eee;
    }
    
    .checkbox:hover input ~ .checkmark {
        background: #ccc;
    }
    
    .checkbox input:checked ~ .checkmark {
        background: var(--primary);
    }
    
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    
    .checkbox input:checked ~ .checkmark:after {
        display: block;
    }
    
    .checkbox .checkmark:after {
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
    }
`

export default Registration;