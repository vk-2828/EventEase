import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import api from "../api/axios.js";
import EventCard from "../components/EventCard.jsx";
import { toast } from "react-toastify";

function MyRegistrations() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRegistrations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/registrations/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // res.data contains registration objects with event details
        setRegistrations(res.data);
        console.log(res.data)
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data || err.message);
        toast.error("Failed to fetch registrations");
        setLoading(false);
      }
    };

    if (user?.roles?.includes("participant")) {
      fetchMyRegistrations();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl text-gray-600">
        Loading your registrations...
      </div>
    );
  }

  if (!user?.roles?.includes("participant")) {
    return (
      <div className="text-center mt-10 text-xl text-red-600">
        Only participants can view this page.
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="text-center mt-10 text-xl text-gray-600">
        You have not registered for any events yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
        My Registered Events
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {registrations.map((reg) => (
          <EventCard
            key={reg.registration_id}
            event={reg.event_details} // directly use the event object
          />
        ))}
      </div>
    </div>
  );
}

export default MyRegistrations;
