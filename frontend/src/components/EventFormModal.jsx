// src/components/EventFormModal.jsx

import React, { useState } from "react";
import { createEvent } from "../api/event.api";

export default function EventFormModal({ show, onHide, refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_datetime: "",
    end_datetime: "",
    location: "",
    category: "",
    status: "upcoming",
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    // Match backend schema
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("start_datetime", form.start_datetime);
    fd.append("end_datetime", form.end_datetime);
    fd.append("location", form.location);
    fd.append("category", form.category);
    fd.append("status", form.status || "upcoming");

    // Add created_at and updated_at
    const now = new Date().toISOString();
    fd.append("created_at", now);
    fd.append("updated_at", now);

    // Add image
    if (form.image) {
      fd.append("image", form.image);
    }

    try {
      await createEvent(fd);
      refresh();
      onHide();
      setForm({
        title: "",
        description: "",
        start_datetime: "",
        end_datetime: "",
        location: "",
        category: "",
        status: "upcoming",
        image: null,
      });
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="datetime-local"
            name="start_datetime"
            value={form.start_datetime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="datetime-local"
            name="end_datetime"
            value={form.end_datetime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Choose a category...</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Art">Art</option>
            <option value="Health">Health</option>
            <option value="Music">Music</option>
            <option value="Education">Education</option>
          </select>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onHide}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
