import React from "react";

const Customer = (props) => {
    return (
        <>
            <p>Complete the fields below and click next when complete.</p>
            <div className="form-group">
                <label style={props.data.required} htmlFor="name">*Name</label><br />
                <input type="text" name="name" value={props.data.name} onChange={props.handleChange} />
            </div>
            <div className="form-group">
                <label style={props.data.required} htmlFor="email">*Email</label><br />
                <input type="email" name="email" value={props.data.email} onChange={props.handleChange} />
            </div>
            <div className="form-group">
                <label style={props.data.required} htmlFor="phone">*Phone</label><br />
                <input type="tel" name="phone" maxLength="14" value={props.data.phone} onChange={props.handleChange} />
            </div>
            <div className="form-group" style={props.data.category.includes("package") ? {display: "block"} : {display: "none"}}>
                <label htmlFor="spouse_name">Your future spouse's name</label><br />
                <input type="text" name="spouse_name" value={props.data.spouse_name} onChange={props.handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="referral">How did you hear about us?</label><br />
                <select name="referral" onChange={props.handleChange}>
                    <option hidden value="none"> -- select an option -- </option>
                    <option value="google">Google</option>
                    <option value="facebook">facebook</option>
                    <option value="theknot">The Knot</option>
                    <option value="weddingwire">Wedding Wire</option>
                    <option value="vendor">Vendor Referral</option>
                    <option value="client">Client Referral</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </>
    );
}

export default Customer;