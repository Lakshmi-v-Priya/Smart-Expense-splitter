"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [summary, setSummary] = useState<any[]>([]);
  const [overall, setOverall] = useState(0);
  const [food, setFood] = useState(0);
  const [travel, setTravel] = useState(0);
  const [rent, setRent] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      const groupsRes = await fetch("/api/groups");
      const groups = await groupsRes.json();

      let total = 0;
      let foodSpend = 0;
      let travelSpend = 0;
      let rentSpend = 0;
      const result: any[] = [];

      for (const group of groups) {
        const expRes = await fetch(
          `/api/expenses?groupId=${group._id}`
        );
        const expenses = await expRes.json();

        const members: Record<string, number> = {};
        let groupTotal = 0;

        expenses.forEach((e: any) => {
          const amt = Number(e.amount);
          total += amt;
          groupTotal += amt;

          members[e.paidBy] =
            (members[e.paidBy] || 0) + amt;

          const title = e.title.toLowerCase();
          if (title.includes("food") || title.includes("dinner"))
            foodSpend += amt;
          else if (
            title.includes("uber") ||
            title.includes("travel")
          )
            travelSpend += amt;
          else if (title.includes("rent"))
            rentSpend += amt;
        });

        result.push({
          name: group.name,
          total: groupTotal,
          members,
        });
      }

      setSummary(result);
      setOverall(total);
      setFood(foodSpend);
      setTravel(travelSpend);
      setRent(rentSpend);
    }

    loadDashboard();
  }, []);

  const insight =
    food > travel
      ? `You spent ${Math.round(
          ((food - travel) / Math.max(travel || 1, 1)) * 100
        )}% more on food than travel.`
      : "Travel spending is currently higher.";

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] bg-white/10 p-8">
        <h1 className="text-4xl font-bold text-cyan-300">
          AI Dashboard
        </h1>
        <p className="mt-3 text-5xl font-bold text-white">
          ₹{overall}
        </p>
      </div>

      {summary.map((group, i) => (
        <div key={i} className="rounded-[32px] bg-white/10 p-8">
          <h2 className="text-3xl font-bold text-purple-300">
            {group.name}
          </h2>
          <p className="mt-2 text-cyan-300">
            Total: ₹{group.total}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {Object.entries(group.members).map(
              ([name, amount]) => (
                <div
                  key={name}
                  className="rounded-2xl bg-slate-900/70 p-5"
                >
                  <p className="text-white font-semibold">
                    {name}
                  </p>
                  <p className="text-emerald-300 text-2xl font-bold mt-2">
                    ₹{String(amount)}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      ))}

      <div className="rounded-[32px] bg-white/10 p-8">
        <h2 className="text-2xl font-bold text-pink-300">
          AI Spending Insight
        </h2>
        <p className="mt-4 text-lg text-white">{insight}</p>
      </div>
    </div>
  );
}