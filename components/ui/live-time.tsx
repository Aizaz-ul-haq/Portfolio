"use client";

import { useEffect, useState } from "react";

export function ClientLiveTime({
  label,
  location,
}: {
  label: string;
  location: string;
}) {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="block">
      <div className="label mb-2">{label}</div>
      <div className="font-mono text-sm uppercase tracking-widest font-semibold">
        {location}
        <span className="ml-2 tabular-nums font-bold">{time} PKT</span>
      </div>
    </div>
  );
}
