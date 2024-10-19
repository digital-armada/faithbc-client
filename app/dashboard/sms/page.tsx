"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [balanceInfo, setBalanceInfo] = useState({
    balance: null,
    currency: "",
  });
  const [messageInfo, setMessageInfo] = useState({ count: 0, totalCost: 0 });

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch("/api/getAccountBalance");
      const data = await res.json();
      setBalanceInfo(data);
    };

    const fetchMessages = async () => {
      const res = await fetch("/api/getMessages");
      const data = await res.json();
      setMessageInfo(data);
    };

    fetchBalance();
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Twilio Dashboard</h1>
      <div>
        <h2>Account Balance</h2>
        {balanceInfo.balance !== null ? (
          <p>
            {balanceInfo.currency} {balanceInfo.balance}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h2>Message Summary</h2>
        <p>Total Messages Sent: {messageInfo.count}</p>
        <p>Total Cost: ${Math.abs(messageInfo.totalCost).toFixed(2)}</p>
      </div>
    </div>
  );
}
