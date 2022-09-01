import React from "react";
import "react-day-picker/lib/style.css";

const EventInfo = (props) => {
    let details;
    let requests;

    if (props.data.customFields['CF-708855'].includes("Package")) {
        details = <div className="form-group">
            <label htmlFor="CF-708918">
                Are there any details you would like to share about your wedding?
            </label><br />
            <textarea id="CF-708918" value={props.data.customFields['CF-708918']} onChange={props.handleData} />
        </div>
    }
    else if (props.data.package === "sporting_event") {
        details = <div className="form-group">
            <label htmlFor="CF-708918">Sport</label><br />
            <select id="CF-708918" onChange={props.handleData}>
                <option hidden value="none"> -- select an option -- </option>
                <option value="soccer">soccer</option>
                <option value="baseball">baseball</option>
                <option value="football">football</option>
                <option value="basketball">basketball</option>
                <option value="hockey">hockey</option>
                <option value="other">other</option>
            </select>
        </div>
    }
    else {
        details = <div className="form-group">
            <label htmlFor="CF-708918">
                Are there any details you would like to share about your event?
            </label><br />
            <textarea id="CF-708918" value={props.data.customFields['CF-708918']} onChange={props.handleData} />
        </div>
    }

    if (props.data.package === "sporting_event") { 
        requests = <div className="form-group">
            <label htmlFor="CF-708921">Are there any additional details you would like to provide (i.e. start time, team name, field name, etc)</label><br />
            <textarea 
                id="CF-708921"
                value={props.data.customFields['CF-708921']}
                onChange={props.handleData}
            />
        </div>
    }
    else if (!props.data.package.includes("other")) {
        requests = <div className="form-group">
            <label htmlFor="CF-708921">Do you have any other requests?</label><br />
            <textarea 
                id="CF-708921"
                value={props.data.customFields['CF-708921']}
                onChange={props.handleData}
            />
            <span className="small">*Additional fees my apply for requests and will not be reflected in the total price.</span>
        </div>
    }

    return (
        <>
            <p>Complete the fields below and click next when complete.</p>
            <div className="form-group">
                <label style={props.data.required} htmlFor="CF-708912">Location <small>(City or Venue Name)</small><span className="error">&nbsp;*</span></label><br />
                <input type="text" id="CF-708912" value={props.data.customFields['CF-708912']} onChange={props.handleData} />
                <span className="small">*Travel fees my apply if outside of Southwest Florida</span>
            </div>
            {details}
            {requests}
        </>
    );
}

export default EventInfo;