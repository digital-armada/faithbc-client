"use client";

import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
export default function Sms({ data }) {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [mobileNumbers, setMobileNumbers] = useState([]);
  // console.log(mobileNumbers);

  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;

  const sendMessage = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);
    const res = await fetch("/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: mobileNumbers, message: message }),
    });
  };

  const handleGroupClick = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/commgroups/${id}?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const users = res.data.data.attributes.users.data;
      const numbers = users
        .map((user) => user.attributes.contactNumber)
        .filter((number) => number);
      setMobileNumbers(numbers);
      console.log(numbers);
    } catch (err) {
      console.log(err);
    }
    console.log(id);
  };

  return (
    <div>
      {data.map((group) => (
        <div
          className="cursor-pointer"
          key={group.id}
          onClick={() => handleGroupClick(group.id)}
        >
          <div>{group.attributes.groupName}</div>
          <div>{group.id}</div>
        </div>
      ))}
      <form onSubmit={sendMessage}>
        <h1>Send message using Next.js and Twilio</h1>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            required
            placeholder="Message"
          ></textarea>
        </div>
        <button disabled={loading} type="submit">
          Broadcast Message
        </button>
        {success && <p>Message sent successfully.</p>}
        {error && <p>Something went wrong. Please check the number.</p>}
      </form>
    </div>
  );
}
