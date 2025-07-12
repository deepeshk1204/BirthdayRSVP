import { useState, ChangeEvent, FormEvent } from "react";
import {
  FaUser,
  FaPhone,
  FaUsers,
  FaCheckCircle,
  FaUtensils,
  FaBirthdayCake,
} from "react-icons/fa";

type RSVPFormData = {
  name: string;
  whatsapp: string;
  guests: number;
  attending: string;
  foodPreference: string;
};

const scriptURL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export default function RSVPForm() {
  const [form, setForm] = useState<RSVPFormData>({
    name: "",
    whatsapp: "",
    guests: 1,
    attending: "Yes",
    foodPreference: "Veg",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (res.ok) setSubmitted(true);
      else alert("Something went wrong.");

      setLoading(false);
    } catch {
      alert("Submission failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-start py-10 px-4">
      {/* 🎀 HEADER */}
      <header className="text-center w-full max-w-4xl mb-8 bg-pink-100 border border-pink-200 rounded-xl shadow-sm p-6">
        {/* Optional photo/logo */}
        <img
          src="/dhara.png"
          className="w-20 h-20 mx-auto mb-3 rounded-full shadow"
        />
        <h1 className="text-4xl font-bold text-pink-700 mb-2 tracking-tight flex items-center justify-center gap-2">
          <FaBirthdayCake className="text-pink-500 w-7 h-7" />
          You're Invited!
        </h1>
        <h2 className="text-xl font-medium text-pink-600">
          Celebrate Dhara’s 1<sup>st</sup> Birthday 🎉
        </h2>
        <p className="mt-2 text-pink-500 text-sm">
          Kindly RSVP below to confirm your presence
        </p>
      </header>

      {/* 📋 RSVP FORM */}
      <div className="w-full max-w-4xl bg-white border border-pink-200 rounded-xl shadow-md p-6">
        {submitted ? (
          <div className="text-pink-700 text-xl font-semibold text-center">
            🎀 Thank you! Your RSVP has been submitted.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div>
              <label className="block text-pink-800 font-medium mb-1 flex items-center gap-2">
                <FaUser className="text-pink-500" />
                Full Name *
              </label>
              <input
                name="name"
                required
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border border-pink-300 rounded focus:outline-pink-400"
              />
            </div>

            <div>
              <label className="block text-pink-800 font-medium mb-1 flex items-center gap-2">
                <FaPhone className="text-pink-500" />
                WhatsApp Number *
              </label>
              <input
                name="whatsapp"
                required
                type="tel"
                placeholder="e.g. 9876543210"
                pattern="[6-9]\d{9}"
                title="Enter a valid 10-digit Indian mobile number"
                value={form.whatsapp}
                onChange={handleChange}
                className="w-full p-2 border border-pink-300 rounded focus:outline-pink-400"
              />
            </div>

            <div>
              <label className="block text-pink-800 font-medium mb-1 flex items-center gap-2">
                <FaUsers className="text-pink-500" />
                Number of Guests *
              </label>
              <input
                name="guests"
                type="number"
                required
                min={1}
                value={form.guests}
                onChange={handleChange}
                className="w-full p-2 border border-pink-300 rounded focus:outline-pink-400"
              />
            </div>

            <div>
              <label className="block text-pink-800 font-medium mb-1 flex items-center gap-2">
                <FaCheckCircle className="text-pink-500" />
                Will you attend? *
              </label>
              <select
                name="attending"
                value={form.attending}
                onChange={handleChange}
                className="w-full p-2 border border-pink-300 rounded focus:outline-pink-400"
              >
                <option value="Yes">Yes, I’ll be there!</option>
                <option value="No">Sorry, can’t make it</option>
              </select>
            </div>

            <div>
              <label className="block text-pink-800 font-medium mb-1 flex items-center gap-2">
                <FaUtensils className="text-pink-500" />
                Food Preference *
              </label>
              <select
                name="foodPreference"
                value={form.foodPreference}
                onChange={handleChange}
                className="w-full p-2 border border-pink-300 rounded focus:outline-pink-400"
              >
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
            </div>
            <button
              type="submit"
              className={`mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded shadow flex items-center justify-center ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit RSVP"
              )}
            </button>

            {/* <button
              type="submit"
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded shadow"
            >
              Submit RSVP
            </button> */}
          </form>
        )}
      </div>
    </div>
  );
}
