import React from "react";

const Customer = (props) => {
    return (
        <>
            <p>Complete the fields below and click next when complete.</p>
            <div className="input-group">
                <div className="form-group">
                    <label style={props.data.required} htmlFor="firstname">*First Name</label><br />
                    <input type="text" name="FirstName" id="firstname" value={props.data.firstname} onChange={props.handleChange} />
                </div>
                <div className="form-group">
                    <label style={props.data.required} htmlFor="lastname">*Last Name</label><br />
                    <input type="text" name="LastName" id="lastname" value={props.data.lastname} onChange={props.handleChange} />
                </div>
            </div>
            <div className="form-group">
                <label style={props.data.required} htmlFor="email">*Email</label><br />
                <input type="email" name="Email" id="email" value={props.data.email} onChange={props.handleChange} />
            </div>
            <div className="form-group">
                <label style={props.data.required} className="phone-group" htmlFor="phone">
                    <div className="form-group">*Phone
                        <input type="tel" name={props.data.phonetype} id="phone" maxLength="14" value={props.data.phone} onChange={props.handleChange} />
                    </div>
                    <div className="form-group">
                        <select id="phonetype" onChange={props.handleChange}>
                            <option value="MobilePhone" defaultValue>mobile</option>
                            <option value="HomePhone">home</option>
                            <option value="WorkPhone">work</option>
                        </select>
                    </div>
                </label>
            </div>
            <div className="form-group" style={props.data.category.includes("package") ? {display: "block"} : {display: "none"}}>
                <label htmlFor="jobrole">I'm the...</label><br />
                <select name="JobRole" id="jobrole" onChange={props.handleChange}>
                    <option hidden value=""> -- select an option -- </option>
                    <option value="Bride">Bride</option>
                    <option value="Groom">Groom</option>
                    <option value="Planner">Wedding Planner</option>
                    <option value="Photographer">Photographer</option>
                    <option value="Client 1">Other</option>
                </select>
            </div>

            {!props.data.category.includes("package") ? <input type="hidden" name="JobRole" id="jobrole" value="Client 1" /> : null}

            <div className="form-group" style={props.data.category.includes("package") ? {display: "block"} : {display: "none"}}>
                <label htmlFor="spouse_name">Your future spouse's name</label><br />
                <input type="text" name="CF-708915" id="spouse_name" value={props.data.spouse_name} onChange={props.handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="referral">How did you hear about us?</label><br />
                <select name="Source" id="referral" onChange={props.handleChange}>
                    <option hidden value="none"> -- select an option -- </option>
                    <option value="Google">Google</option>
                    <option value="Facebook">facebook</option>
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