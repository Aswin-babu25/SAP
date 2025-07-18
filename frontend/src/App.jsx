import React, { useState, useEffect } from "react";
import CalendarDashboard from "./components/CalendarDashboard";
import EventFormModal from "./components/EventFormModal";
import EventViewModal from "./components/EventViewModal";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import MyEvents from "./pages/MyEvents";
import { getAllEvents } from "./api/event.api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventDetail from "./pages/EventDetail";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const data = await getAllEvents();
    setEvents(
      data.map((ev) => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end),
      }))
    );
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowView(true);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/calendar"
              element={
                <div className="ml-64 p-4 min-h-screen bg-white dark:bg-black">
                  <button
                    className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    onClick={() => setShowForm(true)}
                  >
                    + Add Event
                  </button>
                  <CalendarDashboard
                    events={events}
                    onSelectEvent={handleEventClick}
                  />
                  <EventFormModal
                    show={showForm}
                    onHide={() => setShowForm(false)}
                    refresh={fetchEvents}
                  />
                  <EventViewModal
                    show={showView}
                    onHide={() => setShowView(false)}
                    event={selectedEvent}
                  />
                </div>
              }
            />
            <Route path="/my-events" element={<MyEvents />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}