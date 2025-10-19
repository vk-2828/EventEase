import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard.jsx';
import { useAuth } from '../context/AuthProvider.jsx';
import api from '../api/axios.js';

// Mock Data for the "Past Events" section
const pastEventsData = [
  { id: 101, title: 'InnovateAI Conference 2024', date: '2024-08-15T09:00:00Z', venue: 'Tech Dome', description: 'A look back at the future of AI.' },
  { id: 102, title: 'Global Developers Summit', date: '2024-07-22T10:00:00Z', venue: 'Virtual', description: 'Connecting developers worldwide.' },
  { id: 103, title: 'Startup Pitch Night', date: '2024-06-30T18:00:00Z', venue: 'Innovation Hub', description: 'Where great ideas took flight.' },
  { id: 104, title: 'Design Forward Workshop', date: '2024-05-18T11:00:00Z', venue: 'Creative Studio', description: 'Hands-on design thinking.' },
];

// Reusable Icon component for "Why EventEase?" section
const FeatureIcon = ({ children }) => (
  <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg w-12 h-12 flex items-center justify-center mb-4">
    {children}
  </div>
);

const Home = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      {/* Hero Section */}
      <div className="p-8">
        {/* --- Message for Guests (Not Logged In) --- */}
        {!user && (
          <div className="text-center mb-20">
            <h1 className="text-5xl font-extrabold text-purple-400 mb-4">
              Welcome to EventEase
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Your ultimate platform to organize and join events seamlessly!
            </p>
            <div className="space-x-4">
              <Link
                to="/signup"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-purple-500/20 transition-opacity duration-300 hover:opacity-90 font-semibold"
              >
                Get Started
              </Link>
              <Link
                to="/signin"
                className="inline-block bg-transparent text-purple-400 px-6 py-3 rounded-xl border-2 border-purple-400 hover:bg-purple-400 hover:text-slate-900 transition-colors duration-300 font-semibold"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

        {/* --- Personalized Welcome Message for Logged-In Users --- */}
        {user && (
          <div className="text-center mb-20">
            <h1 className="text-5xl font-extrabold text-purple-400 mb-4">
              Welcome back, {user.name || 'User'}!
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              You are logged in as a{" "}
              <span className="capitalize font-semibold text-pink-400">
                {user.roles?.[0] || 'User'}
              </span>.
            </p>
            <div className="space-x-4">
              {user.roles?.includes('organizer') && (
                <Link
                  to="/dashboard"
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-purple-500/20 transition-opacity duration-300 hover:opacity-90 font-semibold"
                >
                  Go to Dashboard
                </Link>
              )}
              {user.roles?.includes('participant') && (
                <Link
                  to="/my-registrations"
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-purple-500/20 transition-opacity duration-300 hover:opacity-90 font-semibold"
                >
                  View My Registrations
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* "Why EventEase?" Section */}
      <div className="py-16 bg-slate-800">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-purple-400 mb-4">
            Why Choose EventEase?
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-12">
            We provide powerful, easy-to-use tools for event organizers and a
            vibrant community for attendees. Create, manage, and experience
            events like never before.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <FeatureIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.921"
                  />
                </svg>
              </FeatureIcon>
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Community Building
              </h3>
              <p className="text-slate-400">
                Connect with attendees and build a lasting community around your
                events.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <FeatureIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </FeatureIcon>
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Seamless Management
              </h3>
              <p className="text-slate-400">
                From registration to feedback, our dashboard simplifies every
                step.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <FeatureIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
              </FeatureIcon>
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Powerful Analytics
              </h3>
              <p className="text-slate-400">
                Gain valuable insights with our detailed event performance
                analytics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Open Events Section */}
      <div className="p-8 pt-16">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-purple-400 mb-2">
            Open Events
          </h2>
          <p className="text-lg text-slate-300">
            Discover upcoming hackathons, workshops, and more.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
              className="cursor-pointer group"
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>

      {/* Past Events Section */}
      <div className="p-8 pt-16">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-purple-400 mb-2">
            Moments We've Created
          </h2>
          <p className="text-lg text-slate-300">
            A look back at some of our amazing past events.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {pastEventsData.map((event) => (
            <div
              key={event.id}
              className="cursor-pointer group filter grayscale hover:grayscale-0 transition-all duration-300"
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 mt-16">
        <div className="container mx-auto px-8 py-4 text-center text-slate-400">
          <p>&copy; 2025 EventEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;




















// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import EventCard from '../components/EventCard.jsx';
// import { useAuth } from '../context/AuthProvider.jsx';
// import api from '../api/axios.js';

// // Mock Data for the "Past Events" section
// const pastEventsData = [
//   { id: 101, title: 'InnovateAI Conference 2024', date: '2024-08-15T09:00:00Z', venue: 'Tech Dome', description: 'A look back at the future of AI.' },
//   { id: 102, title: 'Global Developers Summit', date: '2024-07-22T10:00:00Z', venue: 'Virtual', description: 'Connecting developers worldwide.' },
//   { id: 103, title: 'Startup Pitch Night', date: '2024-06-30T18:00:00Z', venue: 'Innovation Hub', description: 'Where great ideas took flight.' },
//   { id: 104, title: 'Design Forward Workshop', date: '2024-05-18T11:00:00Z', venue: 'Creative Studio', description: 'Hands-on design thinking.' },
// ];

// // A reusable Icon component for the "Why EventEase?" section
// const FeatureIcon = ({ children }) => (
//   <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg w-12 h-12 flex items-center justify-center mb-4">
//     {children}
//   </div>
// );

// const Home = () => {
//   const { user } = useAuth();
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await api.get("/events");
//         setEvents(res.data);
//       } catch (err) {
//         console.error("Error fetching events", err);
//       }
//     };
//     fetchEvents();
//   }, []);

//   return (
//     <div className="min-h-screen bg-slate-900 font-sans">
//       {/* Hero Section */}
//       <div className="p-8">
//         {/* --- Message for Guests (Not Logged In) --- */}
//         {!user && (
//           <div className="text-center mb-20">
//             <h1 className="text-5xl font-extrabold text-purple-400 mb-4">
//               Welcome to EventEase
//             </h1>
//             <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
//               Your ultimate platform to organize and join events seamlessly!
//             </p>
//             <div className="space-x-4">
//               <Link to="/signup" className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-purple-500/20 transition-opacity duration-300 hover:opacity-90 font-semibold">
//                 Get Started
//               </Link>
//               <Link to="/signin" className="inline-block bg-transparent text-purple-400 px-6 py-3 rounded-xl border-2 border-purple-400 hover:bg-purple-400 hover:text-slate-900 transition-colors duration-300 font-semibold">
//                 Sign In
//               </Link>
//             </div>
//           </div>
//         )}

//         {/* --- NEW: Personalized Welcome Message for Logged-In Users --- */}
//         {user && (
//           <div className="text-center mb-20">
//             <h1 className="text-5xl font-extrabold text-purple-400 mb-4">
//               Welcome back, {user.name}!
//             </h1>
//             <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
//               You are logged in as a <span className="capitalize font-semibold text-pink-400">{user.roles[0]}</span>.
//             </p>
//             <div>
//               {user.roles.includes('organizer') && (
//                 <Link to="/dashboard" className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-purple-500/20 transition-opacity duration-300 hover:opacity-90 font-semibold">
//                   Go to Dashboard
//                 </Link>
//               )}
//               {user.roles.includes('participant') && (
//                 <Link to="/my-registrations" className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-purple-500/20 transition-opacity duration-300 hover:opacity-90 font-semibold">
//                   View My Registrations
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* "Why EventEase?" Section */}
//       <div className="py-16 bg-slate-800">
//         <div className="container mx-auto px-8 text-center">
//           <h2 className="text-4xl font-bold text-purple-400 mb-4">Why Choose EventEase?</h2>
//           <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-12">
//             We provide powerful, easy-to-use tools for event organizers and a vibrant community for attendees. Create, manage, and experience events like never before.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             <div className="flex flex-col items-center">
//               <FeatureIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.921" /></svg></FeatureIcon>
//               <h3 className="text-xl font-bold text-slate-100 mb-2">Community Building</h3>
//               <p className="text-slate-400">Connect with attendees and build a lasting community around your events.</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <FeatureIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></FeatureIcon>
//               <h3 className="text-xl font-bold text-slate-100 mb-2">Seamless Management</h3>
//               <p className="text-slate-400">From registration to feedback, our dashboard simplifies every step.</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <FeatureIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg></FeatureIcon>
//               <h3 className="text-xl font-bold text-slate-100 mb-2">Powerful Analytics</h3>
//               <p className="text-slate-400">Gain valuable insights with our detailed event performance analytics.</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Open Events Section */}
//       <div className="p-8 pt-16">
//         <div className="mb-8 text-center">
//           <h2 className="text-4xl font-bold text-purple-400 mb-2">Open Events</h2>
//           <p className="text-lg text-slate-300">
//             Discover upcoming hackathons, workshops, and more.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {events.map(event => (
//             <div key={event.id} onClick={() => navigate(`/events/${event.id}`)} className="cursor-pointer group">
//               <EventCard event={event} />
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Past Events Section */}
//       <div className="p-8 pt-16">
//         <div className="mb-8 text-center">
//             <h2 className="text-4xl font-bold text-purple-400 mb-2">Moments We've Created</h2>
//             <p className="text-lg text-slate-300">
//                 A look back at some of our amazing past events.
//             </p>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             {pastEventsData.map(event => (
//                 <div key={event.id} className="cursor-pointer group filter grayscale hover:grayscale-0 transition-all duration-300">
//                     <EventCard event={event} />
//                 </div>
//             ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-slate-800 mt-16">
//         <div className="container mx-auto px-8 py-4 text-center text-slate-400">
//           <p>&copy; 2025 EventEase. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;