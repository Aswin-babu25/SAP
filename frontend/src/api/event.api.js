// src/api/event.api.js
import axios from "axios";

// Base URL can be changed if using proxy
const API_URL = "/api/events";

// Get all events
export const getAllEvents = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Get a single event
export const getEventById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Add a new event
export const createEvent = async (formData) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Update an event
export const updateEvent = async (id, formData) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Delete an event
export const deleteEvent = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
