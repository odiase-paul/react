import React, { useState } from "react";
import { signup } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Signup() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      signup({
        username: user,
        password: password,
        confirmpassword: confirmpassword,
      });
      toast.success("Account created. Please login.");
      nav("/auth/login");
    } catch (e) {
      setErr(e.message);
      toast.error(e.message);
    }
  }
  return (
    <div className="">
      <main className="hero p-10 px-4 my-6 mx-auto">
        <h2 className="text-center font-semibold font-nunito text-[min(10vw,1.5rem)] mb-5">
          Sign up
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
          <label className="flex flex-col sm:flex-row gap-5 sm:items-center">
            Password
            <input
              className="outline-none bg-gray-100"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="flex flex-col sm:flex-row gap-5 sm:items-center">
            Password
            <input
              className="outline-none bg-gray-100"
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </label>
          {err && <div style={{ color: "red" }}>{err}</div>}
          <button
            className="card cursor-pointer mt-2 hover:bg-[#005f99]"
            type="submit"
          >
            Create account
          </button>
        </form>
      </main>
    </div>
  );
}
