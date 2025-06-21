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

  return (
    <div className="bg-transparent text-gray-800 rounded-xl w-full shadow-none space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-1">Estadísticas en Tiempo Real</h2>
        <p className="text-sm text-gray-500">Total de interacciones: {total}</p>
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
    </div>
  );
};
