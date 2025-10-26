import React, { useState } from "react";
import { loadTickets, saveTickets } from "../utils/storage";
import { getSession } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function TicketNew() {
  const nav = useNavigate();
  const session = getSession();
  const user = session?.user || "";
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("open");
  const [err, setErr] = useState("");
  function submit(e) {
    e.preventDefault();
    setErr("");
    if (!title.trim()) {
      setErr("Title required");
      toast.error("Title required");
      return;
    }
    if (!["open", "in_progress", "closed"].includes(status)) {
      setErr("Invalid status");
      toast.error("Invalid status");
      return;
    }
    const all = loadTickets();
    const t = {
      id: Date.now().toString(),
      title,
      status,
      user,
      createdAt: new Date().toISOString(),
    };
    const next = [...all, t];
    saveTickets(next);
    toast.success("Ticket created");
    nav("/tickets");
  }
  return (
    <div className="sm:w-[350px]">
      <main className="hero p-10 px-4 my-6 mx-auto">
        <h2 className="text-center font-semibold font-nunito text-[min(10vw,1.5rem)] mb-5">
          Create Ticket
        </h2>
        <form className="flex flex-col gap-5" onSubmit={submit}>
          <label className="flex flex-col sm:flex-row gap-5 sm:items-center">
            Title
            <input
              className="outline-none bg-gray-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col sm:flex-row gap-5 sm:items-center">
            Status
            <select
              className="outline-none bg-gray-100 cursor-pointer"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="open">open</option>
              <option value="in_progress">in_progress</option>
              <option value="closed">closed</option>
            </select>
          </label>
          {err && <div style={{ color: "red" }}>{err}</div>}
          <button className=" bg-[#2275ad] hover:bg-[#005f99] text-white cursor-pointer">
            Create
          </button>
        </form>
      </main>
    </div>
  );
}
