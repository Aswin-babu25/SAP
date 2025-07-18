import React, { useEffect, useState } from "react";
import { getAllEvents, deleteEvent } from "../api/event.api";
import { Link } from "react-router-dom";
import EventViewModal from "../components/EventViewModal";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showView, setShowView] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await getAllEvents();
      const list = Array.isArray(res.data) ? res.data : res.data.events || [];
      console.log("API response data:", res.data);
      setEvents(list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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

  return (
    <div className="ml-64 p-6 bg-white dark:bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">My Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border dark:border-gray-700"
          >
            {evt.image_path && (
              <img
                src={`http://localhost:2345/events/${evt.id}/image`}
                alt="cover"
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-indigo-700">
                {evt.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {evt.description}
              </p>
              <span className="text-sm text-white bg-indigo-500 px-3 py-1 rounded-full">
                {evt.category}
              </span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                📅 {new Date(evt.start_datetime).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleView(evt)}
                  className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                >
                  View
                </button>
                <Link
                  to={`/events/${evt.id}`}
                  className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-900"
                >
                  Full Page
                </Link>
                <button
                  onClick={() => handleDelete(evt.id)}
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
