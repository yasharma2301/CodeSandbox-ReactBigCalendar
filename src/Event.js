import React from "react";
import format from "date-fns/format";
import "./styles.css";

export default function Event(eventProp) {
  const { title, start, end } = eventProp.event;
  const time = `${format(start, "h:mm a")} - ${format(end, "h:m a")}`;
  return (
    <div className="event">
      <div>{title}</div>
      <div>{time}</div>
    </div>
  );
}
