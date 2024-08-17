import React from "react";

const DateBox = () => {
  const today = new Date();
  const options = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  return <div className="date-box">{formattedDate}</div>;
};

export default DateBox;
