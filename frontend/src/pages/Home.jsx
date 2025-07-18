// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import {
  CalendarDaysIcon,
  CursorArrowRaysIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";
import { getAllEvents } from "../api/event.api";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents()
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data.events || [];
        console.log("Home API Response:", list);
        setEvents(list);
      })
      .catch(console.error);
  }, []);

  const features = [
    {
      title: "Plan Events Effortlessly",
      icon: <CalendarDaysIcon className="h-10 w-10 text-indigo-500" />,
      description:
        "Create and schedule events with ease. Visualize everything in a streamlined dashboard calendar.",
    },
    {
      title: "Engaging Event Pages",
      icon: <CursorArrowRaysIcon className="h-10 w-10 text-indigo-500" />,
      description:
        "Add images, categories, locations, and more. Your events become attractive and easy to explore.",
    },
    {
      title: "Track and Manage",
      icon: <ChartBarSquareIcon className="h-10 w-10 text-indigo-500" />,
      description:
        "Monitor event engagement and attendance. Manage edits and updates all in one place.",
    },
  ];

  return (
    <div className="ml-64 p-10 min-h-screen bg-white transition-all">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">
        <Typewriter
          options={{
            strings: ["Welcome to SAP", "Plan. Organize. Celebrate."],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>

      <p className="text-lg text-gray-700 max-w-2xl mb-8">
        Eventify is your all-in-one platform to schedule, manage, and view events with stunning UI & intuitive controls.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:scale-105 transition-all duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Upcoming Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-500">No upcoming events found.</p>
        ) : (
          <ul className="space-y-4">
            {events.slice(0, 3).map((evt) => (
              <li
                key={evt.id}
                className="border rounded p-4 shadow-sm flex items-start gap-4 bg-white"
              >
                {evt.image_path && (
                  <img
                    src={`http://localhost:2345/events/${evt.id}/image`}
                    alt="event-preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold">{evt.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{evt.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    📅 {new Date(evt.start_datetime).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-10">
        <button className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 shadow transition-all">
          View All Events
        </button>
      </div>
    </div>
  );
}
