import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import { toast } from "react-toastify";

const Signup = () => {
  // This core logic is all preserved
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    roles: ["participant"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "roles") {
      setForm({ ...form, roles: [value] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      toast.success("Signup Successful!");
      navigate(res.user.roles.includes("organizer") ? "/dashboard" : "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!");
    }
  };

  const imageSrc = `https://picsum.photos/seed/signup/800/1200`;

  return (
    // UPDATED: Main container with the light theme background
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-4xl flex flex-row rounded-2xl shadow-2xl overflow-hidden">
        
        {/* --- Left Panel (Branding & Image) --- */}
        {/* This panel is hidden on smaller screens */}
        <div 
          className="hidden md:block w-1/2 bg-cover bg-center relative" 
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
          <div className="absolute inset-0 bg-purple-800 bg-opacity-60 flex flex-col justify-center items-center text-center p-8">
            <h1 className="text-white text-4xl font-bold mb-4">Join the Community</h1>
            <p className="text-purple-200">
              Create and discover events that match your passion. EventEase is where it all begins.
            </p>
          </div>
        </div>

        {/* --- Right Panel (Signup Form) --- */}
        <div className="w-full md:w-1/2 bg-white p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-purple-700 text-center">
              Create Your Account
            </h2>
            
            {/* Styled Inputs */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">I am an</label>
              <select
                name="roles"
                value={form.roles[0]}
                onChange={handleChange}
                className="mt-1 w-full p-3 bg-slate-100 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="participant">Participant</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>

            {/* Styled Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg transition-opacity duration-300 hover:opacity-90 font-semibold"
            >
              Sign Up
            </button>
            
            {/* Styled Link */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-purple-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;