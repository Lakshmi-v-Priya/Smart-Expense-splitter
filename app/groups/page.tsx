"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GroupsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [members, setMembers] = useState("");

  async function fetchGroups() {
    const res = await fetch("/api/groups");
    const data = await res.json();
    setGroups(data || []);
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  async function handleCreate() {
    if (!name || !members) return;

    await fetch("/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        members: members.split(",").map((m) => m.trim()),
      }),
    });

    setName("");
    setMembers("");
    fetchGroups();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/groups?groupId=${id}`, {
      method: "DELETE",
    });
    fetchGroups();
  }

  return (
    <div className="space-y-8">
      {/* Create */}
      <div className="rounded-[32px] bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
        <h1 className="text-4xl font-bold text-cyan-300">
          Create Group
        </h1>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <input
            className="rounded-2xl bg-slate-900/70 p-4 text-white"
            placeholder="Group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="rounded-2xl bg-slate-900/70 p-4 text-white"
            placeholder="Lakshmi, Priya, Nithik"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
          />
        </div>

        <button
          onClick={handleCreate}
          className="mt-5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 font-bold text-slate-950"
        >
          Add Group
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group._id}
            className="rounded-[28px] bg-white/10 p-6 shadow-xl"
          >
            <Link href={`/groups/${group._id}`}>
              <h2 className="text-2xl font-bold text-white">
                {group.name}
              </h2>
            </Link>

            <p className="mt-3 text-slate-300">
              {group.members.join(", ")}
            </p>

            <button
              onClick={() => handleDelete(group._id)}
              className="mt-4 rounded-xl bg-rose-500 px-4 py-2 text-white"
            >
              Delete Group
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}