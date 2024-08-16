"use client";

import { useState } from "react";

export default function SendSMS({ sms }) {
  const [number] = useState(sms.split(","));
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number, message }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse({ success: true, message: "SMS sent successfully" });
      } else {
        setResponse({ success: false, message: data.error });
      }
    } catch (error) {
      setResponse({ success: false, message: "An error occurred" });
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-4 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Send SMS</h1>
      <form onSubmit={handleSubmit}>
        {/* <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div> */}
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send SMS"}
        </button>
      </form>
      {response && (
        <div
          className={`mt-4 rounded-md p-2 ${response.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {response.message}
        </div>
      )}
    </div>
  );
}
