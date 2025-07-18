import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-white dark:bg-black shadow-md h-screen w-64 fixed p-4 flex flex-col border-r border-gray-200 dark:border-gray-800">
      <div className="text-2xl font-bold text-center text-indigo-600 mb-6">
        <Link to="/">SAP</Link>
      </div>
      <nav className="space-y-4">
        <Link
          to="/"
          className="block py-2 px-4 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800"
        >
          Home
        </Link>
        <Link
          to="/calendar"
          className="block py-2 px-4 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800"
        >
          Calendar
        </Link>
        <Link
          to="/my-events"
          className="block py-2 px-4 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800"
        >
          My Events
        </Link>
      </nav>
    </div>
  );
}