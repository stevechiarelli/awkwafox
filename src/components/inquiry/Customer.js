import React from "react";

const Customer = (props) => {
    return (
        <>
            <p>Complete the fields below and click next when complete.</p>
            <div className="input-group">
                <div className="form-group">
                    <label style={props.data.required} htmlFor="FirstName">*First Name</label><br />
                    <input type="text" id="FirstName" value={props.data.formData.FirstName} onChange={props.handleChange} />
                </div>
                <div className="form-group">
                    <label style={props.data.required} htmlFor="LastName">*Last Name</label><br />
                    <input type="text" id="LastName" value={props.data.formData.LastName} onChange={props.handleChange} />
                </div>
            </div>
            <div className="form-group">
                <label style={props.data.required} htmlFor="Email">*Email</label><br />
                <input type="email" id="Email" value={props.data.formData.Email} onChange={props.handleChange} />
            </div>
            <div className="form-group">
                <label style={props.data.required} className="phone-group" htmlFor="phone">
                    <div className="form-group">*Phone
                        <input type="tel" id="phone" placeholder="___-___-____" maxLength="12" value={props.data.phone} onChange={props.handleChange} />
                    </div>
                    <div className="form-group">
                        <select id="phonetype" onChange={props.handleChange}>
                            <option value="MobilePhone">mobile</option>
                            <option value="HomePhone">home</option>
                            <option value="WorkPhone">work</option>
                        </select>
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="Source">How did you hear about us?</label><br />
                <select id="Source" onChange={props.handleChange}>
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
        </>
    );
}

export default Customer;