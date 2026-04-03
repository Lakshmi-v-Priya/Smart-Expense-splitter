import Link from "next/link";

export default function GroupCard({ group }: any) {
  return (
    <Link href={`/groups/${group._id}`}>
      <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold">{group.name}</h2>
        <p>{group.members.length} members</p>
      </div>
    </Link>
  );
}