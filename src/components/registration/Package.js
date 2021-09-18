import React from "react";

const Package = (props) => {
    return (
        <>
            <div className="form-group">
                <label style={props.data.required} htmlFor="category">*Select from the list of {props.type} options below and click next when complete.</label><br /><br />
                <select name="CF-708855" id="category" onChange={props.handleChange}>
                    <option hidden value=""> -- select an option -- </option>
                    {props.service.map(item => {
                        return (
                            <option 
                                key={item.id} 
                                value={item.name + "," + item.price}>
                                {item.description} ({item.price === 0 && item.subcategory === "other" ? "$TBD" : (Number(item.price)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})})
                            </option>
                        );
                    })}                                
                </select>
            </div>
            <div className="service">
                <div style={props.data.category === "" || props.data.category.includes("other") ? {display: "none"} : {display: "block"}}>
                    <h3>Here's what's included</h3>
                    <ul dangerouslySetInnerHTML={{ __html: props.details[0] === undefined ? "" : props.details[0].details }}></ul>
                    <div className="form-group">
                        <h3>Choose your add-ons</h3>
                        {props.addon.map(item => {
                            return (
                                <label key={item.id} htmlFor={item.subcategory} className="checkbox">{item.description} (+${item.price})
                                    <input type="checkbox" name={item.name} id={item.subcategory} value={true + "," + item.price} onChange={props.handleChange} checked={props.data[item.subcategory]} />
                                    <span className="checkmark"></span><br />
                                    <small>{item.details}</small>
                                </label>
                            );
                        })}
                    </div>
                    <div className="form-group">
                        <label htmlFor="requests">Do you have any other requests?</label><br />
                        <textarea 
                            name="CF-708921"
                            id="requests"
                            value={props.data.requests}
                            onChange={props.handleChange}
                        />
                        <small>*Additional fees my apply for requests and will not be reflected in the total price.</small>
                    </div>
                </div>
                <div style={props.data.category.includes("other") ? {display: "block"} : {display: "none"}}>
                    <div className="form-group">
                        <label htmlFor="requests">Tell us about your event</label><br />
                        <textarea 
                            name="CF-708921"
                            id="requests"
                            value={props.data.requests}
                            onChange={props.handleChange}
                        />
                    </div>
                </div>
                <p className="highlight" style={props.data.category !== "" ? {display: "block"} : {display: "none"}}>
                    {props.data.total === 0 && props.data.category.includes("other") ? "$TBD" : (props.data.total).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                </p>
            </div>
        </>
    );
}

export default Package;