import React, { useState } from "react";
import { loadTickets, saveTickets } from "../utils/storage";
import { getSession } from "../utils/auth";
import { Link } from "react-router-dom";
export default function Tickets() {
  const session = getSession();
  const user = session?.user || "";
  const [tickets, setTickets] = useState(
    loadTickets().filter((t) => t.user === user)
  );
  return (
    <div className="sm:w-[350px]">
      <main className="hero my-6 mx-auto flex flex-col gap-4 ">
        <header className="flex flex-col gap-5">
          <h1 className="text-center font-semibold font-nunito text-[min(10vw,1.8rem)] mb-5">
            Your Tickets
          </h1>
          <Link to="/tickets/new" className="card py-2 px-4 text-center">
            Add New Ticket
          </Link>
        </header>

        <div style={{ display: "grid", gap: 12 }}>
          {tickets.map((t) => (
            <div
              key={t.id}
              className="bg-[#2275ad] text-white rounded-md py-2 px-4 flex flex-col gap-3 justify-between items-center"
            >
              <div className="flex flex-col justify-center items-center">
                <p className="text-[1.2rem] font-semibold">
                  Title:{" "}
                  <span className="text-[1rem] font-semibold">{t.title}</span>
                </p>
                <div>
                  <p className="text-[1.1rem] font-semibold">
                    Status:{" "}
                    <span className="text-[1rem] font-semibold">
                      {t.status}
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <Link
                  to={`/tickets/${t.id}/edit`}
                  className="border rounded-lg border-[#2275ad] bg-white text-[#2275ad] hover:bg-[#005f99] hover:text-white py-1 px-4 flex justify-center items-center font-semibold"
                >
                  Edit
                </Link>
                <Link
                  className="border rounded-lg border-[#2275ad] bg-white text-[#2275ad] hover:bg-[#005f99] hover:text-white px-4 flex justify-center items-center font-semibold"
                  onClick={() => {
                    if (confirm("Delete ticket?")) {
                      const all = loadTickets().filter((x) => x.id !== t.id);
                      saveTickets(all);
                      setTickets(tickets.filter((x) => x.id !== t.id));
                    }
                  }}
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
          {tickets.length === 0 && (
            <div className="text-center">No tickets yet</div>
          )}
        </div>
      </main>
    </div>
  );
}
