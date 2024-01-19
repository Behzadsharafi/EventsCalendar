import React from "react";

interface props {
  date: Date;
}

const Day = ({ date }: props) => {
  return <div className="w-11/12 bg-slate-500">{date.getDate()}</div>;
};

export default Day;
