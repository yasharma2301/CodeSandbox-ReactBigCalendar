import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const generateTimeSlots = () => {
  var x = 30; //minutes interval
  var times = []; // time array
  var tt = 0; // start time
  var ap = ["AM", "PM"]; // AM-PM

  //loop to increment the time and push results in array
  for (var i = 0; tt < 24 * 60; i++) {
    var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    var mm = tt % 60; // getting minutes of the hour in 0-55 format
    times[i] =
      ("0" + (hh % 12)).slice(-2) +
      ":" +
      ("0" + mm).slice(-2) +
      ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
    tt = tt + x;
  }

  return times;
};

export default function TimeSelect({ handleChange, time }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Time</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={time}
        label="Age"
        onChange={handleChange}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              style: {
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 16,
                maxHeight: "140px",
                borderBottom: "12px",
                marginTop: 1,
                zIndex: 1
              }
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left"
            }
          }
        }}
      >
        {generateTimeSlots().map((timeSlot) => {
          return (
            <MenuItem value={timeSlot.trim()} key={timeSlot.trim()}>
              {timeSlot.trim()}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
