import Popover from "@material-ui/core/Popover";
import React, { useState } from "react";

export function EventPopoverWrapper({ children, popover }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "event-popover" : undefined;

  return (
    <>
      <div className="eventWrapper" aria-describedby={id} onClick={handleClick}>
        {children}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        {React.cloneElement(popover, { handleClose })}
      </Popover>
    </>
  );
}
