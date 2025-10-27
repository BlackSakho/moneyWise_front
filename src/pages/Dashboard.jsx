import React from "react";
import Sidebar from "../components/Sidebar";
import BalanceCard from "../components/BalanceCard";
import ExpensePieChart from "../components/ExpensePieChart";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import TransactionList from "../components/TransactionList";
import ExportButtons from "../components/ExportButtons";

export default function Dashboard() {
  // données factices (mock) pour l'instant
  const balance = 2350;
  const income = 4000;
  const expense = 1650;

  const pieData = [
    { category: "Loyer", value: 800 },
    { category: "Alimentation", value: 400 },
    { category: "Loisirs", value: 300 },
    { category: "Transport", value: 150 },
  ];

  const barData = [
    { month: "Jan", income: 1000, expense: 600 },
    { month: "Feb", income: 1500, expense: 700 },
    { month: "Mar", income: 1200, expense: 800 },
    { month: "Apr", income: 1100, expense: 700 },
    { month: "May", income: 1400, expense: 900 },
    { month: "Jun", income: 1250, expense: 850 },
  ];

  const transactions = [
    { type: "revenu", amount: 300, category: "Freelance", date: "02/10" },
    { type: "depense", amount: 50, category: "Courses", date: "03/10" },
    { type: "depense", amount: 20, category: "Transport", date: "04/10" },
  ];

  return (
    <div className="min-h-screen bg- flex">
    
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <BalanceCard balance={balance} income={income} expense={expense} />
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpensePieChart data={pieData} />
              <IncomeExpenseChart data={barData} />
            </div>
          </div>

          <div>
            <TransactionList transactions={transactions} />
            <ExportButtons transactions={transactions} />
          </div>
        </div>
      </main>
    </div>
  );
}
