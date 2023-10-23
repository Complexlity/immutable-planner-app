'use client'

import Calendar from "react-calendar";


export default function CalendarWidget() {
  return (
    <div style={{ minWidth: 300 }}>
      <Calendar style={{ width: 300, color: "black" }} />
    </div>
  );
}
