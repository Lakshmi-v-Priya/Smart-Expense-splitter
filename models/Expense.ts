import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExpense extends Document {
  title: string;
  amount: number;
  paidBy: string;
  members: string[];
  splitType: string;
  category: string;
  groupId: string;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: String, required: true },
    members: [{ type: String, required: true }],
    splitType: { type: String, default: "equal" },
    category: { type: String, default: "General" },
    groupId: { type: String, required: true },
  },
  { timestamps: true }
);

const Expense: Model<IExpense> =
  (mongoose.models.Expense as Model<IExpense>) ||
  mongoose.model<IExpense>("Expense", ExpenseSchema);

export default Expense;