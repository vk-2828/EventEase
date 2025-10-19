import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import EventDetails from './pages/EventDetails.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Navbar from './components/Navbar.jsx';
import { useAuth } from './context/AuthProvider.jsx';
import MyRegistrations from './pages/MyResgistrations.jsx';
import Chatbot from './components/Chatbot/Chatbot';
import Footer from './components/Footer';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route
          path="/dashboard"
          element={user?.roles?.includes('organizer') ? <Dashboard /> : <Navigate to="/signin" />}
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Chatbot/>
      <Footer/>
    </Router>
    
  );
}

export default App;








// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div> 
//          <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// // export default App
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import Home from 'pages/Home.jsx';
// import Signup from 'pages/Signup.jsx';
// import Signin from 'pages/Signin.jsx';
// import Dashboard from 'pages/Dashboard.jsx';
// import Navbar from 'components/Navbar.jsx';
// import { useAuth } from 'acontext/AuthProvider.jsx';

// function App() {
//   const { user } = useAuth();

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route
//           path="/dashboard"
//           element={user?.role === 'organizer' ? <Dashboard /> : <Navigate to="/signin" />}
//         />
//       </Routes>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </Router>
//   );
// }

// export default App;