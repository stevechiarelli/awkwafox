import React from "react";

const Package = (props) => {
    return (
        <>
            <div className="form-group">
                <label style={props.data.required} htmlFor="CF-708855">Select from the list of {props.type} options below and click next when complete.<span className="error">&nbsp;*</span></label><br /><br />
                <select id="CF-708855" onChange={props.handleData}>
                    <option hidden value=""> -- select an option -- </option>
                    {props.service.map(item => {
                        return (
                            <option 
                                key={item.id} 
                                value={item.name + "," + item.description + "," + item.price}>
                                {item.description} ({item.price === 0 && item.name.includes("other") ? "$TBD" : (Number(item.price)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})})
                            </option>
                        );
                    })}                                
                </select>
            </div>
            <div className="service">
                <div style={props.data.package === "" || props.data.package.includes("other") ? {display: "none"} : {display: "block"}}>
                    <h3>Here's what's included</h3>
                    <ul dangerouslySetInnerHTML={{ __html: props.details[0] === undefined ? "" : props.details[0].details }}></ul>
                </div>
                <p className="highlight" style={props.data.package !== "" ? {display: "block"} : {display: "none"}}>
                    {props.data.customFields['CF-708858'] === 0 && props.data.package.includes("other") ? "$TBD" : (props.data.customFields['CF-708858']).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                </p>
            </div>
        </>
    );
}

export default Package;