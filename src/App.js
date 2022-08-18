import React, { useState, useEffect } from "react";
import "./styles.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import constantEvents from "./constantEvents";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Event from "./Event.js";
import { EventPopoverWrapper } from "./EventPopoverWrapper";
import EventPopover from "./EventPopover";

import DateHeader from "./DateHeader";
import { isPassedDateOfThisMonth, isPassedDate } from "./constants.js";

const DnDCalendar = withDragAndDrop(Calendar);
const locales = {
  "en-US": enUS
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

export default function App() {
  const [events, setEvents] = useState(constantEvents);
  const [blockedDays, setBlockedDays] = useState({});

  const onEventDrop = (data) => {
    const { event, start, end } = data;

    if (isPassedDate(start) || isPassedDate(event.start)) {
      return;
    }

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    setEvents(nextEvents);
  };

  const resetToDefault = () => {
    setEvents(constantEvents);
    setBlockedDays({});
  };

  const savePlan = () => {
    alert(JSON.stringify(events, null, 2));
  };

  return (
    <div className="App">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-heading">Replan Sessions</div>
          <div className="modal-close">x</div>
        </div>
        <div className="modal-panel">
          <div className="modal-description">
            Click the scheduled block to reschedule date
          </div>
          <div className="btn green" onClick={resetToDefault}>
            RESET TO DEFAULT
          </div>
        </div>
        <div className="modal-calendar">
          <DnDCalendar
            defaultDate={new Date()}
            defaultView="month"
            events={events}
            localizer={localizer}
            onEventDrop={onEventDrop}
            resizable={false}
            toolbar={false}
            dayPropGetter={(date) => {
              return {
                style: {
                  backgroundColor: `${
                    date.getDay() === 0
                      ? "#F5F5F5"
                      : isPassedDateOfThisMonth(date)
                      ? "#BEBEBE"
                      : "white"
                  }`
                }
              };
            }}
            components={{
              month: {
                dateHeader: ({ date }) => (
                  <DateHeader date={date} setBlockedDays={setBlockedDays} />
                )
              },
              eventWrapper: (props) => (
                <EventPopoverWrapper
                  {...props}
                  popover={
                    <EventPopover {...props} onEventChange={onEventDrop} />
                  }
                />
              ),
              event: Event
            }}
            eventPropGetter={(event, start, end, isSelected) => ({
              event,
              start,
              end,
              isSelected,
              style: {
                backgroundColor: `${
                  isPassedDateOfThisMonth(start)
                    ? "#F5F5F5"
                    : event.title.startsWith("QnA")
                    ? "#FFF7E0"
                    : "#D2F4F6"
                }`,
                color: "black"
              }
            })}
          />
        </div>
        <div className="modal-actions">
          <div className="btn black">CANCEL</div>
          <div className="btn green" onClick={savePlan}>
            SAVE PLAN
          </div>
        </div>
      </div>
    </div>
  );
}
