import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const Event = (props) => {
    let disabledDays = [];
    let scheduled = [];
    let details;

    const data = useStaticQuery(query);
    scheduled = data.calendar.edges[0].node.childrenCalendarEvent;
    
    scheduled.map(item => {
        const date = new Date(item.start.date);
        const offset = new Date(date.getTime() + Math.abs(date.getTimezoneOffset()*60000));
        const dd = offset.getDate();
        const mm = offset.getMonth();
        const yyyy = offset.getFullYear();

        return disabledDays.push(new Date(yyyy, mm, dd));
    });

    console.log(disabledDays)

    if (props.data.package.includes("package")) {
        details = <div className="form-group">
            <label htmlFor="CF-708918">
                Are there any details you would like to share about your wedding?
            </label><br />
            <textarea id="CF-708918" value={props.data.customFields['CF-708918']} onChange={props.handleData} />
        </div>
    }
    else if (props.data.package === "Sporting_Event") {
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
    else if (props.type === "webdesign") {
        details = <div className="form-group">
            <label htmlFor="CF-708918">
                Are there any design details that you would like included in your website?
            </label><br />
            <textarea id="CF-708918" value={props.data.customFields['CF-708918']} onChange={props.handleData} />
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

    return (
        <>
            <div className="form-group" style={props.type === "webdesign" ? {display: "none"} : {display: "block"}}>
                <label style={props.data.required} htmlFor="EventDate">*Select the date of your event using the calendar below. 
                Only available days can be selected. Disabled days are unavailable.</label><br /><br />
                <div className="calendar hidden center">
                    <DayPicker 
                        selectedDays={props.data.formData.EventDate}
                        onDayClick={props.handleDayClick}
                        numberOfMonths={2} 
                        pagedNavigation
                        disabledDays={[{ daysOfWeek: [1, 2, 3, 4, 5] }, {before: new Date()}, ...disabledDays.map(day => new Date(day))]}
                    />
                </div>
                <div className="calendar-mobile center">
                    <DayPicker 
                        selectedDays={props.data.formData.EventDate}
                        onDayClick={props.handleDayClick}
                        numberOfMonths={1} 
                        pagedNavigation
                        disabledDays={[{ daysOfWeek: [1, 2, 3, 4, 5] }, {before: new Date()}, ...disabledDays.map(day => new Date(day))]}
                    />
                </div>
                <p className="highlight">{props.data.formData.EventDate.toISOString().substring(0, 10) === new Date("0001-01-01").toISOString().substring(0, 10) ? "No date selected" : props.data.formData.EventDate.toLocaleDateString() + " is available!"}</p>
            </div>

            <div className="form-group" style={props.type === "webdesign" ? {display: "none"} : {display: "block"}}>
                <label style={props.data.required} htmlFor="CF-708912">*Location <small>(City or Venue Name)</small></label><br />
                <input type="text" id="CF-708912" value={props.data.customFields['CF-708912']} onChange={props.handleData} />
                <small>*Travel fees my apply if outside of Southwest Florida</small>
            </div>
            <div className="form-group" style={props.type === "webdesign" ? {display: "block"} : {display: "none"}}>
                <label htmlFor="CF-711552">Website type?</label><br />
                <select id="CF-711552" onChange={props.handleData}>
                    <option hidden value=""> -- select an option -- </option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Event">Event</option>
                    <option value="Business">Business</option>
                    <option value="Blog">Blog</option>
                    <option value="Startup">Startup</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-group" style={props.type === "webdesign" ? {display: "block"} : {display: "none"}}>
                <label htmlFor="CF-711549">Business or Event name (leave blank if none)</label><br />
                <input type="text" id="CF-711549" value={props.data.customFields['CF-711549']} onChange={props.handleData} />
            </div>
            {details}
        </>
    );
}

const query = graphql`
  {
    calendar:allCalendar {
      edges {
        node {
          childrenCalendarEvent {
            start {
              date
            }
          }
        }
      }
    }
  }
`

export default Event;