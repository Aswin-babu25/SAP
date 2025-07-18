import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarDashboard.css"; 


const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const categoryColors = {
  Conference: "#007bff",
  Workshop: "#28a745",
  Meetup: "#ffc107",
  Webinar: "#dc3545",
};

export default function CalendarDashboard({ events, onSelectEvent }) {
  const [view, setView] = useState("month");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  const eventStyleGetter = (event) => {
    const backgroundColor = categoryColors[event.category] || "#6c757d";
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "5px",
        border: "none",
      },
    };
  };

  const today = new Date();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📅 Event Calendar</h3>
        <div>
          <select
            className="form-select d-inline-block w-auto me-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {Object.keys(categoryColors).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="form-select d-inline-block w-auto"
            value={view}
            onChange={(e) => setView(e.target.value)}
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        view={view}
        onView={setView}
        onSelectEvent={onSelectEvent}
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        popup
        dayPropGetter={(date) => {
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
          return {
            style: {
              backgroundColor: isToday ? "#e3f2fd" : undefined,
            },
          };
        }}
      />
    </div>
  );
}
