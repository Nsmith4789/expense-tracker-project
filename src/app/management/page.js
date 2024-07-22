"use client";
import { useState } from "react";
import ExpenseForm from "../../components/ExpenseForm";
import ExpenseList from "../../components/ExpenseList";
import Link from "next/link";

const Management = () => {
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const fetchExpenses = () => {
    setFetchTrigger(!fetchTrigger);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="bg-blue-600 p-4 text-white">
        <Link href="/" className="mr-4">
          Home
        </Link>
      </nav>
      <h1 className="text-2xl mt-4">Manage Expenses</h1>
      <ExpenseForm fetchExpenses={fetchExpenses} />
      <ExpenseList />
    </div>
  );
};

export default Management;
