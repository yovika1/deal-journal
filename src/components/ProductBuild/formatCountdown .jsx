import { useState, useEffect } from "react";

const formatCountdown = (end) => {
  if (!end) return null;

  const diff = Math.max(0, new Date(end) - Date.now());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (diff <= 0) {
    return "Expired";
  }

  return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
};

export const CountdownTimer = ({ expiry }) => {
  const [timeLeft, setTimeLeft] = useState(formatCountdown(expiry));

  useEffect(() => {
    if (!expiry) return;

    const update = () => setTimeLeft(formatCountdown(expiry));
    update(); 

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiry]);

  return <span style={{ color: "red", fontWeight: "bold" }}>{timeLeft}</span>;
};
