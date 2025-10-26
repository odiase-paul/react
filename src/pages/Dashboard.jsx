import React from "react";
import { useNavigate } from "react-router-dom";
import { loadTickets } from "../utils/storage";
import { getSession, clearSession } from "../utils/auth";
import toast from "react-hot-toast";
export default function Dashboard() {
  const nav = useNavigate();
  const session = getSession();
  const user = session?.user;
  const tickets = loadTickets().filter((t) => t.user === user);
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const closed = tickets.filter((t) => t.status === "closed").length;
  return (
    <div className="sm:w-[350px]">
      <main className="hero my-6 mx-auto ">
        <header>
          <h1 className="text-center font-semibold font-nunito text-[min(10vw,1.8rem)] mb-5">
            Dashboard
          </h1>
        </header>
        <div className="min-w-[250px] flex flex-col gap-3">
          <div className="rounded-2xl bg-[#2275ad] text-white p-4">
            <h3 className="font-semibold text-[1.1rem]">Total Tickets</h3>
            <p>{total}</p>
          </div>
          <div className="rounded-2xl  bg-[#2275ad] text-white p-4">
            <h3 className="font-semibold text-[1.1rem]">Open</h3>
            <p>{open}</p>
          </div>
          <div className="rounded-2xl bg-[#2275ad] text-white p-4">
            <h3 className="font-semibold text-[1.1rem]">Closed</h3>
            <p>{closed}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-between">
          <button
            className="border-[#2275ad] border hover:bg-[#005f99] hover:text-white transition-all cursor-pointer"
            onClick={() => nav("/tickets")}
          >
            Manage Tickets
          </button>
          <div>
            <button
              className="border-[#2275ad] border hover:bg-[#005f99] hover:text-white transition-all cursor-pointer"
              onClick={() => {
                clearSession();
                toast("Logged out");
                nav("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
