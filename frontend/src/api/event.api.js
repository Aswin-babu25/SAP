import axios from "axios";
const API = "http://localhost:2345/events";

export const getAllEvents = () => axios.get(API);
export const getEventById = (id) => axios.get(`${API}/${id}`);
export const createEvent = (data) => axios.post(API, data);           // FormData with image
export const updateEvent = (id, data) => axios.put(`${API}/${id}`, data); // FormData with image
export const deleteEvent = (id) => axios.delete(`${API}/${id}`);