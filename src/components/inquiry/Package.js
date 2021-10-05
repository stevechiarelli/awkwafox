import React from "react";

const Package = (props) => {
    return (
        <>
            <div className="form-group">
                <label style={props.data.required} htmlFor="CF-708855">*Select from the list of {props.type} options below and click next when complete.</label><br /><br />
                <select id="CF-708855" onChange={props.handleData}>
                    <option hidden value=""> -- select an option -- </option>
                    {props.service.map(item => {
                        return (
                            <option 
                                key={item.id} 
                                value={item.name + "," + item.description + "," + item.price}>
                                {item.description} ({item.price === 0 && item.name === "Other" ? "$TBD" : (Number(item.price)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})})
                            </option>
                        );
                    })}                                
                </select>
            </div>
            <div className="service">
                <div style={props.data.package === "" || props.data.package.includes("Other") ? {display: "none"} : {display: "block"}}>
                    <h3>Here's what's included</h3>
                    <ul dangerouslySetInnerHTML={{ __html: props.details[0] === undefined ? "" : props.details[0].details }}></ul>
                    <div className="form-group">
                        <h3>Choose your add-ons</h3>
                        {props.addon.map(item => {
                            let disabled = item.disabledPackageList === null ? "" : item.disabledPackageList;
                            return (
                                <label 
                                    key={item.id} 
                                    htmlFor={item.name} 
                                    className={disabled.includes(props.data.package) ? "checkbox disabled" :  "checkbox"}
                                >{item.description} (+${item.price})
                                    <input 
                                        type="checkbox" 
                                        id={item.name} 
                                        value={true + "," + item.price} 
                                        onChange={props.handleData}
                                        checked={disabled.includes(props.data.package) ? true : props.data.addons[item.name]} 
                                        disabled={disabled.includes(props.data.package) ? true : false}
                                    />
                                    <span className="checkmark"></span><br />
                                    <small>{item.details}</small>
                                </label>
                            );
                        })}
                    </div>
                    <div className="form-group">
                        <label htmlFor="CF-708921">Do you have any other requests?</label><br />
                        <textarea 
                            id="CF-708921"
                            value={props.data.customFields['CF-708921']}
                            onChange={props.handleData}
                        />
                        <small>*Additional fees my apply for requests and will not be reflected in the total price.</small>
                    </div>
                </div>
                <div style={props.data.package.includes("Other") ? {display: "block"} : {display: "none"}}>
                    <div className="form-group">
                        <label htmlFor="CF-708921">Tell us about your event</label><br />
                        <textarea 
                            id="CF-708921"
                            value={props.data.customFields['CF-708921']}
                            onChange={props.handleData}
                        />
                    </div>
                </div>
                <p className="highlight" style={props.data.package !== "" ? {display: "block"} : {display: "none"}}>
                    {props.data.customFields['CF-708858'] === 0 && props.data.package.includes("Other") ? "$TBD" : (props.data.customFields['CF-708858']).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                </p>
            </div>
        </>
    );
}

export default Package;