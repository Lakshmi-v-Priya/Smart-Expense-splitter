"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";

type GroupType = {
  _id: string;
  name: string;
  members: string[];
};

type ExpenseItem = {
  title: string;
  amount: number;
  paidBy?: string;
  splitBetween?: string[];
  members?: string[];
  category?: string;
};

export default function GroupDetails() {
  const params = useParams();
  const groupId = params.groupId as string;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [group, setGroup] = useState<GroupType | null>(null);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [showMembers, setShowMembers] = useState(false);

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    paidBy: "",
    splitBetween: [] as string[],
  });

  async function fetchData() {
    try {
      const groupsRes = await fetch("/api/groups", {
        cache: "no-store",
      });
      const groups = await groupsRes.json();
      const current = groups.find((g: GroupType) => g._id === groupId);

      setGroup(current || null);

      const expRes = await fetch(
        `/api/expenses?groupId=${groupId}`,
        { cache: "no-store" }
      );

      const expData = await expRes.json();
      setExpenses(Array.isArray(expData) ? expData : []);
    } catch {
      setGroup(null);
      setExpenses([]);
    }
  }

  useEffect(() => {
    if (groupId) fetchData();
  }, [groupId]);

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMembers(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, []);

  function detectCategory(title: string) {
    const text = title.toLowerCase();

    if (
      text.includes("food") ||
      text.includes("dinner") ||
      text.includes("lunch")
    )
      return "Food";

    if (
      text.includes("uber") ||
      text.includes("travel") ||
      text.includes("bus")
    )
      return "Travel";

    if (
      text.includes("rent") ||
      text.includes("hotel") ||
      text.includes("room")
    )
      return "Rent";

    return "General";
  }

  function toggleMember(member: string) {
    const exists = expense.splitBetween.includes(member);

    if (exists) {
      setExpense({
        ...expense,
        splitBetween: expense.splitBetween.filter(
          (m) => m !== member
        ),
      });
    } else {
      setExpense({
        ...expense,
        splitBetween: [...expense.splitBetween, member],
      });
    }
  }

  // ✅ AUTO SPLIT COSTS EQUALLY
  async function handleAddExpense() {
    if (
      !expense.title ||
      !expense.amount ||
      !expense.paidBy ||
      expense.splitBetween.length === 0
    ) {
      alert("Please fill all fields");
      return;
    }

    const selectedMembers = expense.splitBetween;
    const totalAmount = Number(expense.amount);
    const splitAmount = totalAmount / selectedMembers.length;

    const payload = {
      groupId,
      title: expense.title,
      amount: totalAmount,
      paidBy: expense.paidBy,
      splitBetween: selectedMembers,
      splitAmount, // ✅ explicit equal split
      category: detectCategory(expense.title),
    };

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setExpense({
        title: "",
        amount: "",
        paidBy: "",
        splitBetween: [],
      });

      await fetchData();
    }
  }

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    expenses.forEach((exp) => {
      const cat = exp.category || "General";
      totals[cat] =
        (totals[cat] || 0) + Number(exp.amount || 0);
    });

    return totals;
  }, [expenses]);

  const computedBalances = useMemo(() => {
    const balances: Record<string, number> = {};

    group?.members?.forEach((member) => {
      balances[member] = 0;
    });

    expenses.forEach((exp) => {
      const amount = Number(exp.amount || 0);
      const payer = exp.paidBy || "";

      const splitMembers = Array.isArray(exp.splitBetween)
        ? exp.splitBetween
        : Array.isArray(exp.members)
        ? exp.members
        : [];

      if (!payer || splitMembers.length === 0) return;

      const share = amount / splitMembers.length;

      balances[payer] =
        (balances[payer] || 0) + amount;

      splitMembers.forEach((member) => {
        balances[member] =
          (balances[member] || 0) - share;
      });
    });

    return balances;
  }, [expenses, group]);

  const settlements = useMemo(() => {
    const debtors: [string, number][] = [];
    const creditors: [string, number][] = [];

    Object.entries(computedBalances).forEach(
      ([name, value]) => {
        if (value < -0.01) {
          debtors.push([name, Math.abs(value)]);
        } else if (value > 0.01) {
          creditors.push([name, value]);
        }
      }
    );

    const result: string[] = [];
    let i = 0;
    let j = 0;

    while (i < debtors.length && j < creditors.length) {
      const pay = Math.min(
        debtors[i][1],
        creditors[j][1]
      );

      result.push(
        `${debtors[i][0]} owes ₹${pay.toFixed(
          2
        )} to ${creditors[j][0]}`
      );

      debtors[i][1] -= pay;
      creditors[j][1] -= pay;

      if (debtors[i][1] < 0.01) i++;
      if (creditors[j][1] < 0.01) j++;
    }

    return result;
  }, [computedBalances]);

  return (
    <div className="space-y-8">
      {/* Add Expense */}
      <div className="rounded-[32px] bg-white/10 p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-cyan-300">
          Add Shared Expense
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <input
            className="rounded-2xl bg-slate-900/70 p-4 text-white"
            placeholder="Dinner / Uber / Rent"
            value={expense.title}
            onChange={(e) =>
              setExpense({
                ...expense,
                title: e.target.value,
              })
            }
          />

          <input
            className="rounded-2xl bg-slate-900/70 p-4 text-white"
            placeholder="Amount"
            value={expense.amount}
            onChange={(e) =>
              setExpense({
                ...expense,
                amount: e.target.value,
              })
            }
          />

          <select
            className="rounded-2xl bg-slate-900/70 p-4 text-white"
            value={expense.paidBy}
            onChange={(e) =>
              setExpense({
                ...expense,
                paidBy: e.target.value,
              })
            }
          >
            <option value="">Select payer</option>
            {group?.members?.map((member) => (
              <option key={member}>{member}</option>
            ))}
          </select>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowMembers(!showMembers)}
              className="w-full rounded-2xl bg-slate-900/70 p-4 text-left text-white"
            >
              {expense.splitBetween.length
                ? expense.splitBetween.join(", ")
                : "Split Among"}
            </button>

            {showMembers && (
              <div className="absolute z-20 mt-2 w-full rounded-2xl bg-slate-950 border border-cyan-500 p-4 shadow-xl">
                {group?.members?.map((member) => (
                  <label
                    key={member}
                    className="flex items-center gap-3 py-2 text-white"
                  >
                    <input
                      type="checkbox"
                      checked={expense.splitBetween.includes(
                        member
                      )}
                      onChange={() => toggleMember(member)}
                    />
                    {member}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleAddExpense}
          className="mt-5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 font-bold text-slate-950"
        >
          Auto Split Expense
        </button>
      </div>

      {/* Category */}
      <div className="rounded-[32px] bg-white/10 p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-pink-300">
          Category-wise Spending
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {Object.entries(categoryTotals).map(([cat, total]) => (
            <div key={cat} className="rounded-2xl bg-slate-900/70 p-5">
              <p className="text-white">{cat}</p>
              <p className="text-cyan-300 text-2xl font-bold">
                ₹{total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Expense Split Breakdown */}
      <div className="rounded-[32px] bg-white/10 p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-cyan-300">
          Expense Split Breakdown
        </h2>

        <div className="mt-6 space-y-5">
          {expenses.map((exp, index) => {
            const splitMembers = Array.isArray(exp.splitBetween)
              ? exp.splitBetween
              : Array.isArray(exp.members)
              ? exp.members
              : [];

            const share =
              splitMembers.length > 0
                ? Number(exp.amount) / splitMembers.length
                : 0;

            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-900/70 p-5"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {exp.title}
                    </p>
                    <p className="text-slate-400">
                      Paid by {exp.paidBy}
                    </p>
                  </div>

                  <p className="text-cyan-300 text-xl font-bold">
                    ₹{Number(exp.amount).toFixed(2)}
                  </p>
                </div>

                <div className="mt-4 grid md:grid-cols-3 gap-3">
                  {splitMembers.map((member, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-white/5 p-3"
                    >
                      <p className="text-white">{member}</p>
                      <p className="text-pink-300 font-bold">
                        ₹{share.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Balances */}
      <div className="rounded-[32px] bg-white/10 p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-emerald-300">
          Live Balances
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {Object.entries(computedBalances).map(([name, amount]) => (
            <div
              key={name}
              className="rounded-2xl bg-slate-900/70 p-5"
            >
              <p className="text-white">{name}</p>
              <p
                className={`font-bold text-xl ${
                  amount > 0
                    ? "text-emerald-300"
                    : amount < 0
                    ? "text-rose-400"
                    : "text-slate-300"
                }`}
              >
                {amount > 0
                  ? `Gets ₹${amount.toFixed(2)}`
                  : amount < 0
                  ? `Owes ₹${Math.abs(amount).toFixed(2)}`
                  : "Settled"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Who Owes Whom */}
      <div className="rounded-[32px] bg-white/10 p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-purple-300">
          Who Owes Whom
        </h2>

        <div className="mt-6 space-y-4">
          {settlements.length === 0 ? (
            <p className="text-slate-300">
              No pending settlements 🎉
            </p>
          ) : (
            settlements.map((line, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/70 p-4 text-white"
              >
                {line}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}