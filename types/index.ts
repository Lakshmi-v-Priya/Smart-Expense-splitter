export interface GroupType {
  _id?: string;
  name: string;
  members: string[];
}

export interface ExpenseType {
  _id?: string;
  groupId: string;
  title: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  splitType: string;
}