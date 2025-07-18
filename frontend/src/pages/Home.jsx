import React from "react";
import Typewriter from "typewriter-effect";
import {
  CalendarDaysIcon,
  CursorArrowRaysIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
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
    <div className="ml-64 p-10 min-h-screen bg-white dark:bg-black transition-all">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">
        <Typewriter
          options={{
            strings: ["Welcome to SAP", "Plan. Organize. Celebrate."],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
        Eventify is your all-in-one platform to schedule, manage, and view events with stunning UI & intuitive controls.
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 hover:scale-105 transition-all duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{feature.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10">
        <button className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 shadow transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
}