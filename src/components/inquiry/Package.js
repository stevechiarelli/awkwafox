import React from "react";
import CsvToUl from "../CsvToUl";

const Package = (props) => {
    const packages = props.service.filter(item => item.description !== "Other");
    
    return (
        <>
            <div className="form-group">
                <label style={props.data.required} htmlFor="CF-708855">Select from the list of {props.type} packages below and click next when complete.<span className="error">&nbsp;*</span></label><br /><br />
                <select id="CF-708855" 
                    onChange={props.handleData} 
                    value={props.data.package + "," + props.data.customFields['CF-708855'] + "," + props.data.customFields['CF-708858']} 
                    style={props.data.package !== "" ? {display: "block"} : {display: "none"}}
                >
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

                <div className="option-row" style={props.data.package === "" ? {display: "block"} : {display: "none"}}>
                    {packages.map(item => {
                            return (
                                <div 
                                    className="column" 
                                    role="button" 
                                    tabIndex={0} 
                                    onClick={() => props.handleOption(item.name, item.description, item.price)}
                                    onKeyDown={() => props.handleOption(item.name, item.description, item.price)}
                                    key={item.id}
                                >
                                    <div className="card">
                                        <h2>{item.description}</h2>
                                        <p>{ item.details }.</p>
                                        <p className="total">{item.price === 0 && item.name.includes("other") ? "$TBD" : (Number(item.price)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                                    </div>
                                </div>
                            );
                        })}     
                </div>
            </div>
            <div className="service">
                <div style={props.data.package === "" || props.data.package.includes("other") ? {display: "none"} : {display: "block"}}>
                    <h3>Here's what's included</h3>
                    <CsvToUl package={props.details[0] === undefined ? "" : props.details[0].details} />
                </div>
                <p className="highlight" style={props.data.package !== "" ? {display: "block"} : {display: "none"}}>
                    {props.data.customFields['CF-708858'] === 0 && props.data.package.includes("other") ? "$TBD" : (props.data.customFields['CF-708858']).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                </p>
            </div>
        </>
    );
}

export default Package;