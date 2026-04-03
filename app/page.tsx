import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-12 shadow-2xl">
      <div className="relative z-10 text-center py-20 space-y-8">
        <p className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
          AI-powered global expense intelligence
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent">
          Smart Expense Splitter
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Split trip, hostel, roommate, and team expenses with real-time balances.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/groups" className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950">
            Launch Workspace
          </Link>
          <Link href="/dashboard" className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-semibold">
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}