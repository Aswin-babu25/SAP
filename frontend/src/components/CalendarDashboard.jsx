// src/components/CalendarDashboard.jsx
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { getAllEvents } from "../api/event.api";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarDashboard.css";  // we'll override styles here

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// Define your category-based colors
const categoryColors = {
  Technology: "#007bff",
  Design: "#28a745",
  Art: "#ffc107",
  Health: "#dc3545",
  Music: "#6f42c1",
  Education: "#17a2b8",
};

export default function CalendarDashboard({ onSelectEvent }) {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");

  useEffect(() => {
    getAllEvents()
      .then(res => {
        const mapped = (res.data || []).map(e => ({
          ...e,
          start: new Date(e.start_datetime),
          end: new Date(e.end_datetime),
        }));
        setEvents(mapped);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="calendar-container bg-white p-4 rounded shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📅 Event Calendar</h3>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={setView}
        onSelectEvent={onSelectEvent}
        views={["month", "week", "day"]}
        style={{ height: 600 }}
        eventPropGetter={evt => ({
          style: {
            backgroundColor: categoryColors[evt.category] || "#6c757d",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
          }
        })}
      />
    </div>
  );
}
