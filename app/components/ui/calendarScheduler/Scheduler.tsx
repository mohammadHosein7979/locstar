"use client";

import { dayNames, monthNames } from "@/app/constants/date";
import moment from "moment-jalaali";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.loadPersian({ dialect: "persian-modern" });

const localizer = momentLocalizer(moment);

const events = [
  {
    start: moment("1403-12-25 07:00", "jYYYY-jMM-jDD HH:mm").toDate(),
    end: moment("1403-12-25 08:00", "jYYYY-jMM-jDD HH:mm").toDate(),
    title: "جلسه مهم",
  },
];

const formats = {
  dateFormat: (date: Date) => moment(date).format("jDD"),
  dayFormat: (date: Date) => dayNames[moment(date).day()],
  monthHeaderFormat: (date: Date) => `${monthNames[moment(date).jMonth()]} ${moment(date).jYear()}`,
};

const Scheduler = () => {
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      formats={formats}
      style={{ height: 500, direction: "rtl" }}
      culture="fa"
    />
  );
};

export default Scheduler;
