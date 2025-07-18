// pages/EventDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../api/event.api";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await getEventById(id);
      setEvent(data);
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p className="ml-64 p-6">Loading...</p>;

  return (
    <div className="ml-64 p-6 bg-white dark:bg-black min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">{event.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
      <p className="mb-2">📅 {new Date(event.start).toLocaleString()}</p>
      <p className="mb-2">📍 {event.location}</p>
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt="Event"
          className="rounded-lg shadow w-full max-w-xl mb-4"
        />
      )}
    </div>
  );
}
