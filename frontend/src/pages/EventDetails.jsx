import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import api from "../api/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ college: "", phone: "" });
  const [registered, setRegistered] = useState(false); // track if registered

  
  useEffect(() => {
  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch event details
      const eventRes = await api.get(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvent(eventRes.data);

      // Fetch user registrations to check if already registered
      if (user?.roles.includes("participant")) {
        const regRes = await api.get("/registrations/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const isRegistered = regRes.data.some(
          (reg) => reg.event_id === id
        );
        setRegistered(isRegistered); // ✅ mark as registered if already done
      }

      // Fetch participants if organizer
      if (user?.roles.includes("organizer")) {
        const participantsRes = await api.get(
          `/events/${id}/participants`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setParticipants(participantsRes.data);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  fetchEvent();
}, [id, user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!formData.college || !formData.phone) {
      toast.error("Please provide college and phone number");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const registrationData = {
        event_id: id,
        name: user.name || "",
        email: user.email || "",
        college: formData.college,
        phone: formData.phone,
      };

      await api.post("/registrations", registrationData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Registered successfully!");
      setRegistered(true);          // mark as registered
      setTimeout(() => navigate("/my-registrations"), 1500); // redirect after 1.5s
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(
        "Registration failed: " + JSON.stringify(err.response?.data)
      );
    }
  };

  if (loading) return <div className="text-center text-xl mt-20">Loading...</div>;
  if (!event) return <div className="text-center text-xl mt-20">Event not found!</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 p-8">
      <ToastContainer />
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
        <h1 className="text-5xl font-bold text-purple-700 mb-4">{event.title}</h1>
        <p className="text-gray-700 text-lg"><span className="font-semibold">Date:</span> {new Date(event.date).toDateString()}</p>
        <p className="text-gray-700 text-lg"><span className="font-semibold">Venue:</span> {event.venue || 'N/A'}</p>
        <p className="text-gray-700 text-lg"><span className="font-semibold">Description:</span> {event.description}</p>
        {event.schedule && <p className="text-gray-700 text-lg"><span className="font-semibold">Schedule:</span> {event.schedule}</p>}
        {event.rules && event.rules.length > 0 && (

          <div className="bg-white rounded-2xl shadow-xl p-8">
  <h2 className="text-3xl font-bold text-purple-700 mb-4">Rules & Guidelines</h2>
  
  <ol className="list-decimal list-inside space-y-3 text-gray-700">
    {event.rules
      .replace(/\./g, '.\n') // First, replace every period with itself plus a newline
      .split('\n')           // Now, split the entire string by newlines
      .filter(rule => rule.trim() !== "") // This cleans up any empty lines
      .map((rule, idx) => (
        <li key={idx} className="pl-2">
          {rule.trim()}
        </li>
      ))
    }
  </ol>
</div>
        )}
        {event.contact && <p className="text-gray-700 text-lg mt-2"><span className="font-semibold">Contact:</span> {event.contact}</p>}
      </div>


      {/* Registration Form for Participants */}
      {user?.roles.includes("participant") && !registered && (
        <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-3xl shadow-2xl p-6">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Register for Event</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={user.name || ""} disabled placeholder="Name" className="p-3 border rounded-xl" />
            <input type="email" value={user.email || ""} disabled placeholder="Email" className="p-3 border rounded-xl" />
            <input type="text" name="college" value={formData.college} onChange={handleInputChange} placeholder="College" className="p-3 border rounded-xl" />
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="p-3 border rounded-xl" />
          </div>
          <button
            onClick={handleRegister}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold"
          >
            Register
          </button>
        </div>
      )}

      {/* Participants List for Organizer */}
      {user?.roles.includes("organizer") && (
        <div className="w-full max-w-4xl mx-auto mt-10">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Participants ({participants.length})</h2>
          {participants.length === 0 ? (
            <p className="text-gray-700 text-lg">No participants registered yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {participants.map((p, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition">
                  <h3 className="text-xl font-semibold text-purple-700">{p.name}</h3>
                  <p className="text-gray-700"><span className="font-semibold">Email:</span> {p.email}</p>
                  {p.college && <p className="text-gray-700"><span className="font-semibold">College:</span> {p.college}</p>}
                  {p.phone && <p className="text-gray-700"><span className="font-semibold">Phone:</span> {p.phone}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Link to="/" className="block text-center mt-8 text-purple-600 font-semibold hover:underline">
        Back to Events
      </Link>
    </div>
  );
};

export default EventDetails;
