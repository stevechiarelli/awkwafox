import React from "react";

const Summary = (props) => {
    let details;

    if (props.data.package === "sporting_event") {
        details = "Sport: " + props.data.customFields['CF-708918'];
    }
    else if (props.data.customFields['CF-708918'] !== "") {
        details = "Additional details: " + props.data.customFields['CF-708918'];
    }
    else {
        details = "Additional details: none";
    }

    return (
        <>
            <p>Verify all details below and click submit to send this form.</p>
            
            <p className="highlight">Package Details</p>
            <table>
                <tbody>
                    {props.serviceSummary.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.description}</td>
                                <td>{item.price === 0 && item.name === "Other" ? "$TBD" : (Number(item.price)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                            </tr>
                        );
                    })}

                    {props.addonSummary.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.description}</td>
                                <td>{(Number(item.price)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td>quote total</td>
                        <td>{props.data.customFields['CF-708858'] === 0 && props.data.package.includes("Other") ? "$TBD" : (props.data.customFields['CF-708858']).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                    </tr>
                </tbody>
            </table>

            <p className="highlight">Additional Requests</p>
            <p>{props.data.customFields['CF-708921'] === "" ? "none" : props.data.customFields['CF-708921']}</p>

            <div style={props.type !== "webdesign" ? {display: "block"} : {display: "none"}}>
                <p className="highlight">Event Info</p>
                <p>*Event Date: {props.data.formData.EventDate ? props.data.formData.EventDate.toLocaleDateString() : ""}<br />
                    Location: {props.data.customFields['CF-708912']}<br />
                    {details}
                </p>
                <small>*{props.data.formData.EventDate ? props.data.formData.EventDate.toLocaleDateString() : ""} is available, however
                an initial payment of 50% and a signed contract are required to officially reserve this date.</small>
            </div>

            <div style={props.type === "webdesign" ? {display: "block"} : {display: "none"}}>
                <p className="highlight">Website Info</p>
                <p>Website type: {props.data.customFields['CF-711552']}<br />
                   Business or Event name: {props.data.customFields['CF-711549']}<br />
                   {details}
                </p>
            </div>

            <p className="highlight">Your Info</p>
            <p>Name: {props.data.formData.FirstName + " " + props.data.formData.LastName}<br />
                Email: {props.data.formData.Email}<br />
                Phone: {props.data.phone}<br />
                {props.data.formData.Source === "" ? "" : "How did you hear about us? " + props.data.formData.Source}
            </p><br />
        </>
    );
}

export default Summary;