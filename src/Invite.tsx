import React from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaPhone,
} from "react-icons/fa";

export default function Invitation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-pink-50 relative overflow-hidden flex items-center justify-center px-4 py-12 font-sans">
      {/* 🎈 CSS Balloons */}

      <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 z-10 text-center">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`absolute bottom-0 bg-pink-${
              300 + (i % 2) * 100
            } rounded-full opacity-70 w-4 h-4 sm:w-6 sm:h-6 animate-rise`}
            style={{
              left: `${i * 6 + 5}%`,
              animationDuration: `${5 + (i % 5)}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        <h1 className="text-sm uppercase tracking-widest text-pink-700 font-semibold animate-fade-in">
          You're invited to celebrate
        </h1>

        <h2 className="text-5xl md:text-6xl font-extrabold text-pink-800 my-4 italic animate-pop-in">
          Dhara's 1<sup>st</sup> Birthday!
        </h2>

        <div className="mt-6 space-y-4 text-pink-700 text-lg animate-fade-in delay-200">
          <div className="flex items-center justify-center gap-3">
            <FaCalendarAlt className="text-pink-500 w-5 h-5" />
            Monday, July 21<sup>st</sup>
          </div>
          <div className="flex items-center justify-center gap-3">
            <FaClock className="text-pink-500 w-5 h-5" />
            7:00 PM – 10:00 PM
          </div>
          <div className="flex items-center justify-center gap-3">
            <FaMapMarkerAlt className="text-pink-500 w-5 h-5" />
            <a
              href="https://maps.google.com/?q=Lemon+Tree+Hotel+Electronic+City+Phase+1"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-pink-800"
            >
              Tangerine Grand, Lemon Tree, E‑City Phase 1
            </a>
          </div>
          <div className="flex items-center justify-center gap-3">
            <FaPhone className="text-pink-500 w-5 h-5" />
            Wish Dhara at <strong>7093580735</strong>
          </div>
        </div>

        <a
          href="#rsvp"
          className="mt-8 inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg animate-pop-in delay-400 transition"
        >
          RSVP Now
        </a>
      </div>

      {/* 🔧 Inline CSS Animations */}
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-120vh); opacity: 0; }
        }
        .animate-rise { animation: rise linear infinite; }
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-pop-in { animation: popIn 0.8s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-fade-in.delay-200 { animation-delay: 0.2s; }
        .animate-pop-in.delay-400 { animation-delay: 0.4s; }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
