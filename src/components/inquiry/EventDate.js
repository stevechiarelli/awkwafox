import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const EventDate = (props) => {
    let disabledDays = [];
    let scheduled = [];

    const data = useStaticQuery(query);
    scheduled = data.calendar.nodes;
    
    scheduled.map(item => {
        const date = new Date(item.start.date);
        const offset = new Date(date.getTime() + Math.abs(date.getTimezoneOffset()*60000));
        const dd = offset.getDate();
        const mm = offset.getMonth();
        const yyyy = offset.getFullYear();

        return disabledDays.push(new Date(yyyy, mm, dd));
    });

    return (
        <>
            <div className="form-group">
                <label style={props.data.required} htmlFor="EventDate">Select the date of your 
                    {props.data.customFields['CF-708855'].includes("Package") ? " wedding " : " event "} 
                    using the calendar below. Only available days can be selected. Disabled days are unavailable.<span className="error">&nbsp;*</span>
                </label>
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
        </>
    );
}

const query = graphql`
  {
    calendar:allCalendarEvent {
      nodes {
        start {
          date
        }
      }
    }
  }
`

export default EventDate;