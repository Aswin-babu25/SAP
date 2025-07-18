// src/pages/MyEvents.jsx
import React, { useEffect, useState } from "react";
import { getAllEvents, deleteEvent } from "../api/event.api";
import { Link } from "react-router-dom";
import EventViewModal from "../components/EventViewModal";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showView, setShowView] = useState(false);

  const fetchEvents = async () => {
    const data = await getAllEvents();
    console.log("API Response", data);
    setEvents(Array.isArray(data) ? data : data.events || []);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
      fetchEvents();
    }
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setShowView(true);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="ml-64 p-6 bg-white dark:bg-black min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">My Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt="event"
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-indigo-700">
                {event.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {event.description}
              </p>
              <span className="inline-block text-sm text-white bg-indigo-500 px-3 py-1 rounded-full">
                {event.category}
              </span>
              <p className="text-sm text-gray-500 mt-2">
                📅 {new Date(event.start).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleView(event)}
                  className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                >
                  View
                </button>
                <Link
                  to={`/events/${event._id}`}
                  className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-900"
                >
                  Full Page
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      <EventViewModal
        show={showView}
        onHide={() => setShowView(false)}
        event={selectedEvent}
      />
    </div>
  );
}
