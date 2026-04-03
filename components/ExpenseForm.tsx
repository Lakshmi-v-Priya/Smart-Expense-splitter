"use client";
import { useState } from "react";

export default function ExpenseForm({ groupId, onExpenseAdded }: { groupId: string; onExpenseAdded: () => void }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitBetween, setSplitBetween] = useState("");

  async function handleSubmit() {
    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupId,
        title,
        amount: Number(amount),
        paidBy,
        splitBetween: splitBetween.split(",").map((m) => m.trim()),
        splitType: "equal",
      }),
    });
    setTitle("");
    setAmount("");
    setPaidBy("");
    setSplitBetween("");
    onExpenseAdded();
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="relative z-10 space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Add Shared Expense
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="rounded-2xl bg-slate-900/70 p-4 border border-white/10 text-white" placeholder="Expense title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="rounded-2xl bg-slate-900/70 p-4 border border-white/10 text-white" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input className="rounded-2xl bg-slate-900/70 p-4 border border-white/10 text-white" placeholder="Paid by" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} />
          <input className="rounded-2xl bg-slate-900/70 p-4 border border-white/10 text-white" placeholder="Split between" value={splitBetween} onChange={(e) => setSplitBetween(e.target.value)} />
        </div>
        <button onClick={handleSubmit} className="rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 px-8 py-4 font-bold text-slate-950 shadow-lg hover:scale-105 transition">
          Add Expense
        </button>
      </div>
    </div>
  );
}