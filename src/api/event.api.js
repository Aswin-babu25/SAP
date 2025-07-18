import axios from "axios";

const API = "http://localhost:2345/events";

export const getAllEvents = () => axios.get(API);
export const getEventById = (id) => axios.get(`${API}/${id}`);
export const createEvent = (data) => axios.post(API, data); // expects FormData for image
export const updateEventById = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteEventById = (id) => axios.delete(`${API}/${id}`);
