import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Group from "@/models/Group";

export async function GET() {
  await connectDB();

  const groups = await (Group as any).find().lean();

  return NextResponse.json(groups || []);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const group = await (Group as any).create({
    name: body.name,
    members: body.members || [],
  });

  return NextResponse.json(group);
}

export async function DELETE(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const groupId = searchParams.get("groupId");

  if (!groupId) {
    return NextResponse.json(
      { error: "groupId missing" },
      { status: 400 }
    );
  }

  await (Group as any).findByIdAndDelete(groupId);

  return NextResponse.json({ success: true });
}