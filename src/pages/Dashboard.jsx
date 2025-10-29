import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import BalanceCard from "../components/BalanceCard";
import ExpensePieChart from "../components/ExpensePieChart";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import TransactionList from "../components/TransactionList";
import ExportButtons from "../components/ExportButtons";
import { getTransactions } from "../api/api";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTransactions();
        const data = res.data?.data?.transactions || res.data?.data || res.data || [];
        if (!Array.isArray(data)) return;
        setTransactions(data);

        const totalIncome = data.filter(t => t.type === "REVENUE").reduce((sum, t) => sum + (t.amount || 0), 0);
        const totalExpense = data.filter(t => t.type === "DEPENSE").reduce((sum, t) => sum + (t.amount || 0), 0);

        setIncome(totalIncome);
        setExpense(totalExpense);
        setBalance(totalIncome - totalExpense);

        const categoriesMap = {};
        data.forEach(t => {
          if (t.type === "DEPENSE") {
            const name = t.category?.name || t.category || "Inconnue";
            categoriesMap[name] = (categoriesMap[name] || 0) + t.amount;
          }
        });
        setPieData(Object.entries(categoriesMap).map(([category, value]) => ({ category, value })));

        const monthly = {};
        data.forEach(t => {
          const month = new Date(t.date).toLocaleString("fr-FR", { month: "short" });
          if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
          if (t.type === "REVENUE") monthly[month].income += t.amount;
          if (t.type === "DEPENSE") monthly[month].expense += t.amount;
        });
        setBarData(Object.entries(monthly).map(([month, values]) => ({ month, ...values })));
      } catch (err) {
        console.error("Erreur lors du chargement du dashboard :", err.response?.data || err);
        alert("Impossible de charger les données du tableau de bord ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-600">
        Chargement du tableau de bord...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar responsive */}
      <div className="w-full md:w-64">
        <Sidebar />
      </div>

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <BalanceCard balance={balance} income={income} expense={expense} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpensePieChart data={pieData} />
          <IncomeExpenseChart data={barData} />
        </div>

        <div className="mt-6 space-y-6">
          <TransactionList transactions={transactions} />
          <ExportButtons transactions={transactions} />
        </div>
      </main>
    </div>
  );
}




