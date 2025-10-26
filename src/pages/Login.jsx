import React, { useState } from "react";
import { login } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      login({ username: user, password: password });
      toast.success("Welcome!");
      nav("/dashboard");
    } catch (e) {
      setErr("Invalid credentials");
      toast.error("Invalid credentials");
    }
  }
  return (
    <div className="">
      <main className="hero p-10 px-4 my-6 mx-auto">
        <h2 className="text-center font-semibold font-nunito text-[min(10vw,1.5rem)] mb-5">
          Login
        </h2>
        <form className="flex flex-col gap-5" onSubmit={submit}>
          <label className="flex flex-col sm:flex-row gap-5 sm:items-center">
            Username
            <input
              className="outline-none bg-gray-100"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </label>
          <label className="flex flex-col sm:flex-row gap-5 sm:items-center ">
            Password
            <input
              className="outline-none bg-gray-100"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {err && <div style={{ color: "red" }}>{err}</div>}
          <button className="card cursor-pointer mt-2" type="submit">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
