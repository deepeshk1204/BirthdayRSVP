import { useState, ChangeEvent, FormEvent } from "react";

type RSVPFormData = {
  name: string;
  email: string;
  guests: number;
  attending: string;
};

export default function RSVPForm() {
  const [form, setForm] = useState<RSVPFormData>({
    name: "",
    email: "",
    guests: 1,
    attending: "Yes",
  });
  const [submitted, setSubmitted] = useState(false);

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

    const scriptURL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL"; // replace this

    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else alert("Submission failed");
    } catch {
      alert("Network error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">RSVP for Dhara's Birthday 🎉</h2>
      {submitted ? (
        <div className="text-green-600 font-medium">Thank you for your response!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="guests"
            type="number"
            min="1"
            placeholder="Number of Guests"
            value={form.guests}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <select
            name="attending"
            value={form.attending}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Yes">Yes, I’ll be there!</option>
            <option value="No">Sorry, can’t make it</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit RSVP
          </button>
        </form>
      )}
    </div>
  );
}
