import React from "react";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="mt-10 mx-2 ">
      <header>
        <nav className="flex gap-4">
          <Link to="/auth/login">Login</Link>{" "}
          <Link to="/auth/signup">Sign up</Link>
        </nav>
      </header>
      <main className="hero mt-4">
        <h1 className="text-center font-bold font-nunito text-[min(10vw,2rem)]">
          Ticketly
        </h1>
        <div className="relative">
          <div className="font-semibold font-nunito text-[min(5vw,1.1rem)]">
            <h2 className="text-center">Manage, track, and resolve tickets</h2>
            <p className="text-center">
              All in one smart dashboard built for speed and clarity
            </p>
          </div>

          <div className="flex gap-2.5 mt-3">
            <Link to="/auth/login" className="card py-2 px-4 inline-block ">
              Login
            </Link>
            <Link to="/auth/signup" className="card py-2 px-4 inline-block">
              Get Started
            </Link>
          </div>
        </div>
        <div
          className="circle"
          style={{
            width: 100,
            height: 100,
            right: 10,
            top: 10,
            background: "#4f46e5",
          }}
        />
        <div
          className="box"
          style={{
            width: 90,
            height: 90,
            left: 10,
            top: 10,
            background: "#06b6d4",
          }}
        />
        <svg viewBox="0 0 1440 320" className="wave">
          <path
            fill="#005f99"
            d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,165.3C672,139,768,85,864,69.3C960,53,1056,75,1152,96C1248,117,1344,139,1392,149.3L1440,160V320H0Z"
          ></path>
        </svg>
      </main>
    </div>
  );
}
