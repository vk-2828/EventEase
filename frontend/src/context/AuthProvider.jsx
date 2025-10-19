import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const signup = async (data) => {
    try {
      const res = await api.post("/auth/signup", data);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("roles", JSON.stringify(res.data.user.roles)); // store array
      localStorage.setItem("token", res.data.access_token);
      return res.data;
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      throw err;
    }
  };

  const signin = async (data) => {
    try {
      const res = await api.post("/auth/signin", data);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("roles", JSON.stringify(res.data.user.roles)); // store array
      localStorage.setItem("token", res.data.access_token);
      return res.data;
    } catch (err) {
      console.error("Signin failed:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



