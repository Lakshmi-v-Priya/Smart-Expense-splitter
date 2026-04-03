import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paidBy: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      required: true,
    },
    splitType: {
      type: String,
      default: "equal",
    },
    category: {
      type: String,
      default: "General",
    },
    groupId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema);