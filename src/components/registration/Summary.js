import React from "react";

const Summary = (props) => {
    let details;

    if (props.data.category === "sporting_event") {
        details = "Sport: " + props.data.details;
    }
    else if (props.data.details !== "") {
        details = "Additional details: " + props.data.details;
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
                                <td>{item.price === 0 && item.subcategory === "other" ? "$TBD" : (Number(item.price)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
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
                        <td>total</td>
                        <td>{props.data.total === 0 && props.data.category.includes("other") ? "$TBD" : (props.data.total).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                    </tr>
                </tbody>
            </table>

            <p className="highlight">Additional Requests</p>
            <p>{props.data.requests === "" ? "none" : props.data.requests}</p>

            <div style={props.data.date !== null ? {display: "block"} : {display: "none"}}>
                <p className="highlight">Event Info</p>
                <p>*Event Date: {props.data.date ? props.data.date.toLocaleDateString() : ""}<br />
                    Location: {props.data.location}<br />
                    {details}
                </p>
                <small>*{props.data.date ? props.data.date.toLocaleDateString() : ""} is available, however
                an initial payment of 50% and a signed contract are required to officially reserve this date.</small>
            </div>

            <p className="highlight">Your Info</p>
            <p>Name: {props.data.firstname + " " + props.data.lastname}<br />
                Email: {props.data.email}<br />
                Phone: {props.data.phone}<br />
                {props.data.category.includes("package") ? "Your future spouse's name: " + props.data.spouse_name : "" }<br />
                How did you hear about us? {props.data.referral}
            </p><br />
        </>
    );
}

export default Summary;