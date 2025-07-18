import React, { useState } from "react";
import { createEvent } from "../api/event.api";

export default function EventFormModal({ show, onHide, refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    location: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    await createEvent(formData);
    refresh();
    onHide();
    setForm({
      title: "",
      description: "",
      start: "",
      end: "",
      location: "",
      category: "",
      image: null,
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
          <input
            type="datetime-local"
            name="start"
            value={form.start}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
          <input
            type="datetime-local"
            name="end"
            value={form.end}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800"
          >
            <option value="">Select Category</option>
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
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onHide}
              className="px-4 py-2 border rounded text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}