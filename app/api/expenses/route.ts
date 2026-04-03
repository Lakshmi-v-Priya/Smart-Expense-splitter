import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const groupId = searchParams.get("groupId");
  const expenses = await Expense.find({ groupId });
  return NextResponse.json(expenses);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const expense = await Expense.create(body);
  return NextResponse.json(expense);
}