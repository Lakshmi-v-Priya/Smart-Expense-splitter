export default function BalanceSummary({
  balances,
}: {
  balances: Record<string, number>;
}) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-400 bg-clip-text text-transparent mb-6">
        Live Balances
      </h2>

      {Object.keys(balances).length === 0 ? (
        <p className="text-slate-300">No expenses yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(balances).map(([person, amount]) => (
            <div
              key={person}
              className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl hover:-translate-y-1 transition"
            >
              <p className="text-lg font-semibold text-white">
                {person}
              </p>

              <p
                className={`mt-3 text-3xl font-bold ${
                  amount >= 0
                    ? "text-emerald-300"
                    : "text-rose-400"
                }`}
              >
                ₹{amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}