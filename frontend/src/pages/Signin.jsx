import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import { toast } from "react-toastify";

const Signin = () => {
  // Your original, working logic is preserved
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signin(form);
      toast.success("Signin Successful!");
      navigate(res.user.roles.includes("organizer") ? "/dashboard" : "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signin failed!");
    }
  };

  const imageSrc = `https://picsum.photos/seed/signin/800/1200`;

  return (
    // UPDATED: Main container with the light theme background
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-4xl flex flex-row rounded-2xl shadow-2xl overflow-hidden">
        
        {/* --- Left Panel (Branding & Image) --- */}
        <div 
          className="hidden md:block w-1/2 bg-cover bg-center relative" 
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
          <div className="absolute inset-0 bg-purple-800 bg-opacity-60 flex flex-col justify-center items-center text-center p-8">
            <h1 className="text-white text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-purple-200">
              Sign in to manage your events or discover your next great experience.
            </p>
          </div>
        </div>

        {/* --- Right Panel (Signin Form) --- */}
        <div className="w-full md:w-1/2 bg-white p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-purple-700 text-center">
              Sign In to Your Account
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

            {/* Styled Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg transition-opacity duration-300 hover:opacity-90 font-semibold"
            >
              Sign In
            </button>
            
            {/* Styled Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;