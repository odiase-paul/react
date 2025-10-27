import { useState } from "react";

import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import TicketEdit from "./pages/TicketEdit";
import TicketNew from "./pages/TicketNew";
import { getSession } from "./utils/auth";
function RequireAuth({ children }) {
  return getSession() ? children : <Navigate to="/auth/login" />;
}
function App() {
  return (
    <div className="font-nunito my-10 mx-2 flex flex-col justify-center items-center">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/tickets"
          element={
            <RequireAuth>
              <Tickets />
            </RequireAuth>
          }
        />
        <Route
          path="/tickets/new"
          element={
            <RequireAuth>
              <TicketNew />
            </RequireAuth>
          }
        />
        <Route
          path="/tickets/:id/edit"
          element={
            <RequireAuth>
              <TicketEdit />
            </RequireAuth>
          }
        />
      </Routes>
      <footer className="mt-10 text-center">
        © {new Date().getFullYear()} Ticketly
      </footer>
    </div>
  );
}

export default App;
