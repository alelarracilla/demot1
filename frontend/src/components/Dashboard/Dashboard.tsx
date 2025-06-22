"use client";

import { useEffect, useState } from "react";
import { DonutChart } from "../DonutChart/DonutChart";

interface Stat {
  name: string;
  action: string;
  variant?: string;
  timestamp: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const Dashboard = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [total, setTotal] = useState(0);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/components/stats`);
      const data = await res.json();
      setStats(data);
      setTotal(data.length);
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    const id = setInterval(fetchStats, 5000);
    return () => clearInterval(id);
  }, []);

  const grouped = stats.reduce((acc, curr) => {
    acc[curr.name] = (acc[curr.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const entries = Object.entries(grouped);

  const exportCSV = () => {
    const header = "name,action,variant,timestamp\n";
    const rows = stats
      .map((s) => `${s.name},${s.action},${s.variant || ""},${s.timestamp}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "component-stats.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(stats, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "component-stats.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="bg-transparent text-gray-800 rounded-xl w-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Estadísticas en tiempo real
          </h2>
          <p className="text-sm text-gray-500">
            Total de interacciones: {total}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-start">
        {entries.map(([name, count], idx) => {
          const percentage = Math.round((count / total) * 100);
          return (
            <div key={name} className="flex flex-col items-center text-sm">
              <DonutChart percentage={percentage} gradientId={`grad-${idx}`} />
              <span className="mt-2 text-gray-600">{name}</span>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <button
          onClick={exportCSV}
          className="px-5 py-3 text-sm text-white bg-green-500 hover:bg-green-600 rounded transition"
        >
          Exportar CSV
        </button>
        <button
          onClick={exportJSON}
          className="px-5 py-3 text-sm text-white bg-green-500 hover:bg-green-600 rounded transition"
        >
          Exportar JSON
        </button>
      </div>
    </div>
  );
};
