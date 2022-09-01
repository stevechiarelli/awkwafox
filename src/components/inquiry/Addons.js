import React from "react";

const Addons = (props) => {
    return (
        <>
            <div className="service">
                <div style={props.data.package === "" || props.data.package.includes("other") ? {display: "none"} : {display: "block"}}>
                    <p>Choose your add-ons below and click next when complete.</p>
                    <div className="form-group">
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
                </div>
                <div style={props.data.package.includes("other") ? {display: "block"} : {display: "none"}}>
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
                    {props.data.customFields['CF-708858'] === 0 && props.data.package.includes("other") ? "$TBD" : (props.data.customFields['CF-708858']).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                </p>
            </div>
        </>
    );
}

export default Addons;