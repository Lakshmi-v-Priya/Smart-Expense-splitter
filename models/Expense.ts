import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IExpense extends Document {
  groupId: string;
  title: string;
  amount: number;
  paidBy: string;
  members: string[];
  splitType: string;
  category: string;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    groupId: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: String, required: true },
    members: [{ type: String }],
    splitType: { type: String, default: "equal" },
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

const Expense =
  models.Expense || model<IExpense>("Expense", ExpenseSchema);

export default Expense;