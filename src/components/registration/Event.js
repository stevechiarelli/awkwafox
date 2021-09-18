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

    if (props.data.category.includes("package")) {
        details = <div className="form-group">
            <label htmlFor="details">
                Are there any details you would like to share about your wedding?
            </label><br />
            <textarea name="CF-708918" id="details" value={props.data.details} onChange={props.handleChange} />
        </div>
    }
    else if (props.data.category === "sporting_event") {
        details = <div className="form-group">
            <label htmlFor="details">Sport</label><br />
            <select name="CF-708918" id="details" onChange={props.handleChange}>
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
            <label htmlFor="details">
                Are there any details you would like to share about your event?
            </label><br />
            <textarea name="CF-708918" id="details" value={props.data.details} onChange={props.handleChange} />
        </div>
    }

    return (
        <>
            <div className="form-group" >
                <label style={props.data.required} htmlFor="date">*Select the date of your event using the calendar below. 
                Only available days can be selected. Disabled days are unavailable.</label><br /><br />
                <div className="calendar hidden center">
                    <DayPicker 
                        selectedDays={props.data.date}
                        onDayClick={props.handleDayClick}
                        numberOfMonths={2} 
                        pagedNavigation
                        disabledDays={[{ daysOfWeek: [1, 2, 3, 4, 5] }, {before: new Date()}, ...disabledDays.map(day => new Date(day))]}
                    />
                </div>
                <div className="calendar-mobile center">
                    <DayPicker 
                        selectedDays={props.data.date}
                        onDayClick={props.handleDayClick}
                        numberOfMonths={1} 
                        pagedNavigation
                        disabledDays={[{ daysOfWeek: [1, 2, 3, 4, 5] }, {before: new Date()}, ...disabledDays.map(day => new Date(day))]}
                    />
                </div>
                <input type="text" name="EventDate" id="date" value={props.data.date ? props.data.date.toISOString().substring(0, 10) : ""} onChange={props.handleChange} readOnly/>
                <p>{props.data.date ? props.data.date.toLocaleDateString() + " is available!" : ""}</p>
            </div>
            <div className="form-group">
                <label style={props.data.required} htmlFor="location">*Location <small>(City or Venue Name)</small></label><br />
                <input type="text" name="CF-708912" id="location" value={props.data.location} onChange={props.handleChange} />
                <small>*Travel fees my apply if outside of Southwest Florida</small>
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