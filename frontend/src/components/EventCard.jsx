import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const { id, title, date, venue, description } = event;
  const navigate = useNavigate();

  const handleViewEvent = () => {
    navigate(`/events/${id}`);
  };

  const imageSrc = `https://picsum.photos/seed/${id}/600/400`;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
      <img
        src={imageSrc} // Using the new, reliable image source
        alt={title}
        className="w-full h-48 object-cover bg-slate-200" // Added a background color for loading
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-purple-700 mb-2">{title}</h3>

        <p className="text-sm text-gray-700 mb-1">
          <span className="font-semibold text-gray-800">Date:</span> {new Date(date).toDateString()}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          <span className="font-semibold text-gray-800">Location:</span> {venue}
        </p>

        <p className="text-sm text-gray-700 mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        
        <button
          onClick={handleViewEvent}
          className="w-full mt-auto bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-xl shadow-lg transition-opacity duration-300 hover:opacity-90 font-semibold"
        >
          View Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
