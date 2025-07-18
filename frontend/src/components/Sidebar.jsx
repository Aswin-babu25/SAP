import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `block py-2 px-4 rounded-lg ${
      isActive
        ? "bg-indigo-100 text-indigo-800"
        : "hover:bg-indigo-100 text-gray-700"
    }`;

  return (
    <div className="bg-white shadow-md h-screen w-64 fixed p-4 flex flex-col border-r border-gray-200">
      <div className="text-2xl font-bold text-center text-indigo-600 mb-6">
        <NavLink to="/">SAP</NavLink>
      </div>
      <nav className="space-y-4">
        <NavLink to="/" className={linkClasses} end>
          Home
        </NavLink>
        <NavLink to="/calendar" className={linkClasses}>
          Calendar
        </NavLink>
        <NavLink to="/my-events" className={linkClasses}>
          My Events
        </NavLink>
      </nav>
    </div>
  );
}
