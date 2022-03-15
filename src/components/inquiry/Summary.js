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
        <p>Verify all details below and click submit to finish.</p>
        <div className="summary">
            <div className="left">
                <p className="highlight">Package Details</p>
                <table>
                    <tbody>
                        {props.serviceSummary.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.description}</td>
                                    <td>{item.price === 0 && item.name.includes("other") ? "$TBD" : (Number(item.price)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
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
                            <td>{props.data.customFields['CF-708858'] === 0 && props.data.package.includes("other") ? "$TBD" : (props.data.customFields['CF-708858']).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                        </tr>
                    </tbody>
                </table>
                <div style={window.screen.width < 768 ? {display: "none"} : {display: "block"}}>
                    <p className="highlight">Additional Info</p>
                    <p>{props.data.customFields['CF-708921'] === "" ? "none" : props.data.customFields['CF-708921']}</p>
                </div>
            </div>
            <div className="right">
                <p className="highlight">Event Info</p>
                <p>*Event Date: {props.data.formData.EventDate ? props.data.formData.EventDate.toLocaleDateString() : ""}<br />
                    Location: {props.data.customFields['CF-708912']}<br />
                    {details}
                </p>
                <p className="small">*{props.data.formData.EventDate ? props.data.formData.EventDate.toLocaleDateString() : ""} is available, however
                an initial payment of 50% and a signed contract are required to officially reserve this date.</p>

                <div style={window.screen.width < 768 ? {display: "none"} : {display: "block"}}>
                    <p className="highlight">Your Info</p>
                    <p>Name: {props.data.formData.FirstName + " " + props.data.formData.LastName}<br />
                        Email: {props.data.formData.Email}<br />
                        Phone: {props.data.phone}<br />
                        {props.data.formData.Source === "" ? "" : "How did you hear about us? " + props.data.formData.Source}
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Summary;