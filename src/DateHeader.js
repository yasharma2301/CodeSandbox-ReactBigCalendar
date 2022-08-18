import format from "date-fns/format";
import NotInterestedOutlinedIcon from "@material-ui/icons/NotInterestedOutlined";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { useState } from "react";
import { isPassedDateOfThisMonth } from "./constants.js";

export default function DateHeader({ date, setBlockedDays }) {
  const [blocked, setBlocked] = useState(false);
  let todaysDate = new Date().getDate();
  let todaysMonth = new Date().getMonth();

  let getDayOfMonth = new Date(date).getDate();
  let getMonth = new Date(date).getMonth();
  let getAlpahbeticMonth = format(new Date(date), "MMM");
  const timeStamp = new Date(date).getTime();

  const getClassName = () => {
    if (todaysDate === getDayOfMonth && todaysMonth === getMonth) {
      return "data-cell-date today";
    } else {
      return "data-cell-date";
    }
  };

  const onBlockClick = () => {
    if (blocked) {
      setBlocked(false);
      setBlockedDays(function (oldBlockers) {
        let newBlockerDays = { ...oldBlockers };
        delete newBlockerDays[timeStamp];
        return newBlockerDays;
      });
    } else {
      setBlocked(true);
      const newBlockerDays = {};
      newBlockerDays[timeStamp] = 1;
      setBlockedDays((oldBlockers) => ({
        ...oldBlockers,
        ...newBlockerDays
      }));
    }
  };

  return (
    <div className="data-cell-header">
      {isPassedDateOfThisMonth(date) ? (
        <DoneIcon
          style={{
            fontSize: "14px"
          }}
        />
      ) : (
        <div className="data-cell-header-icon" onClick={onBlockClick}>
          {!blocked ? (
            <NotInterestedOutlinedIcon
              style={{
                fontSize: "12px",
                color: "red"
              }}
            />
          ) : (
            <CloseIcon
              style={{
                fontSize: "12px",
                color: "red"
              }}
            />
          )}
        </div>
      )}

      <div className={getClassName()}>
        <div>
          {getDayOfMonth === 1
            ? `${getDayOfMonth} ${getAlpahbeticMonth}`
            : getDayOfMonth}
        </div>
      </div>
    </div>
  );
}
