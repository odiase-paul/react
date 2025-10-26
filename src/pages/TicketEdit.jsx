import React, { useState, useEffect } from "react";
import { loadTickets, saveTickets } from "../utils/storage";
import { useParams, useNavigate } from "react-router-dom";
import { getSession } from "../utils/auth";
import toast from "react-hot-toast";
export default function TicketEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const session = getSession();
  const user = session?.user || "";
  const [ticket, setTicket] = useState(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("open");
  const [err, setErr] = useState("");
  useEffect(() => {
    const t = loadTickets().find((x) => x.id === id);
    if (!t) {
      toast.error("Ticket not found");
      nav("/tickets");
      return;
    }
    if (t.user !== user) {
      toast.error("Unauthorized");
      nav("/tickets");
      return;
    }
    setTicket(t);
    setTitle(t.title);
    setStatus(t.status);
  }, [id]);
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
    const next = all.map((x) =>
      x.id === id
        ? { ...x, title, status, updatedAt: new Date().toISOString() }
        : x
    );
    saveTickets(next);
    toast.success("Ticket updated");
    nav("/tickets");
  }
  return ticket ? (
    <div className="sm:w-[350px]">
      <main className="hero my-6 mx-auto">
        <h2 className="text-center font-semibold font-nunito text-[min(10vw,1.5rem)] mb-5">
          Edit Ticket
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
          <label className="flex flex-col sm:flex-row gap-5 sm:items-center ">
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
          <button
            className=" bg-[#2275ad] hover:bg-[#005f99] text-white cursor-pointer"
            type="submit"
            style={{ marginTop: 8 }}
          >
            Save changes
          </button>
        </form>
      </main>
    </div>
  ) : null;
}
