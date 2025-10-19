
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import EventCard from "../components/EventCard.jsx";
import api from "../api/axios.js";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    schedule: "",
    rules: "",
    contact: "",
  });
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      if (Array.isArray(res.data)) {
        setEvents(res.data);
      }
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load events");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) =>
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.description) {
      toast.error("Please fill in title & description!");
      return;
    }
    try {
      const res = await api.post("/events", newEvent);
      setEvents((prev) => [res.data, ...prev]);
      resetForm();
      toast.success("Event Created!");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to create event");
    }
  };

  const handleEditEvent = (event) => {
    setEditingEventId(event.id || event._id);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date ? event.date.split("T")[0] : "",
      venue: event.venue || "",
      schedule: event.schedule || "",
      rules: event.rules || "",
      contact: event.contact || "",
    });

    // Smooth scroll to top when editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateEvent = async () => {
    try {
      const res = await api.put(`/events/${editingEventId}`, newEvent);
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingEventId || e._id === editingEventId ? res.data : e
        )
      );
      toast.success("Event Updated!");
      resetForm();
      setEditingEventId(null);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to update event");
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await api.delete(`/events/${eventId}`);
      setEvents((prev) =>
        prev.filter((e) => e.id !== eventId && e._id !== eventId)
      );
      toast.info("Event Deleted!");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to delete event");
    }
  };

  const resetForm = () => {
    setNewEvent({
      title: "",
      description: "",
      date: "",
      venue: "",
      schedule: "",
      rules: "",
      contact: "",
    });
    setEditingEventId(null);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xl">
        Loading events...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          Organizer Dashboard
        </h1>

        {/* Add or Edit Event Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-12">
          <h2 className="text-3xl font-semibold text-purple-600 mb-6">
            {editingEventId ? "Edit Event" : "Add New Event"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["title", "description", "date", "venue", "schedule", "rules", "contact"].map(
              (field) => (
                <input
                  key={field}
                  type={field === "date" ? "date" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newEvent[field]}
                  onChange={handleChange}
                  className="p-3 bg-slate-100 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )
            )}
          </div>

          <button
            onClick={editingEventId ? handleUpdateEvent : handleAddEvent}
            className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg transition-opacity duration-300 hover:opacity-90 font-semibold"
          >
            {editingEventId ? "Update Event" : "Add Event"}
          </button>

          {/* Cancel button */}
          <button
            onClick={resetForm}
            className="mt-3 w-full bg-gray-200 text-gray-700 py-3 rounded-xl shadow-md transition-colors hover:bg-gray-300 font-semibold"
          >
            Cancel
          </button>
        </div>

        {/* Event List */}
        <h2 className="text-3xl font-bold text-purple-700 mb-6">Your Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id || event._id} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
              <div className="p-4">
                <EventCard event={event} />
              </div>
              <div className="border-t border-slate-200 p-4 mt-auto flex justify-end space-x-3">
                <button
                  onClick={() => handleEditEvent(event)}
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id || event._id)}
                  className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg font-semibold hover:bg-pink-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;