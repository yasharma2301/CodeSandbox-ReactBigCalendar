import React, { useState } from "react";
import "./styles.css";
import format from "date-fns/format";
import TimeSelect from "./TimeSelect.js";

export default function EventPopover(props) {
  const { event } = props;

  const [time, setTime] = useState(format(event.start, "hh:ma"));

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const onSave = () => {
    const hour = time.split(":")[0].substring(0, 2);
    const minute = time.split(":")[1].substring(0, 2);
    const newStartDateTime = new Date(event.start);
    newStartDateTime.setHours(hour);
    newStartDateTime.setMinutes(minute);

    props.onEventChange({
      event: event,
      start: newStartDateTime,
      end: event.end
    });

    props.handleClose();
  };

  return (
    <div className="popover">
      <div className="session-heading">{event.title}</div>
      <div className="session-date">
        {format(event.start, "EEE, d MMM yyyy")}
      </div>
      <div className="sesstion-start-time-label">Scheduled start time</div>
      <TimeSelect time={time} handleChange={handleChange} />
      <div className="popup-btn btn green" onClick={onSave}>
        SAVE
      </div>
    </div>
  );
}
