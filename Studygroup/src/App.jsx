// import React, { Suspense, lazy } from 'react';
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import { CookiesProvider } from "react-cookie";
import CreateGroup from "./components/CreateGroup";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import Group from "./pages/Group/Group";
import Profile from "./components/Profile";

// const Login = lazy(()=>import('./components/Login'))

function App() {
  return (
    <>
      <CookiesProvider>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create-group" element={<CreateGroup />} />
            <Route path="/getgroup" element={<Group />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}

export default App;
