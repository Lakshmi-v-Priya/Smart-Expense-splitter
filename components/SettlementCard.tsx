export default function SettlementCard({ from, to, amount }: any) {
  return (
    <div className="p-4 border rounded-xl">
      {from} pays {to} ₹{amount}
    </div>
  );
}