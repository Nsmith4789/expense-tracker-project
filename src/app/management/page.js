"use client";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import ExpenseForm from "../../components/ExpenseForm";
import ExpenseList from "../../components/ExpenseList";
import Link from "next/link";

const Management = () => {
  const [expenses, setExpenses] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const fetchExpenses = async () => {
    try {
      const expenseSnapshot = await getDocs(collection(db, "expenses"));
      const expenseList = expenseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expenseList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchTrigger]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="bg-blue-600 p-4 text-white">
        <Link href="/" className="mr-4">
          Home
        </Link>
      </nav>
      <h1 className="text-2xl mt-4">Manage Expenses</h1>
      <ExpenseForm fetchExpenses={() => setFetchTrigger(!fetchTrigger)} />
      <ExpenseList
        expenses={expenses}
        setExpenses={setExpenses}
        fetchTrigger={fetchTrigger}
      />
    </div>
  );
};

export default Management;
