"use client";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const ExpenseList = ({ expenses, setExpenses, fetchTrigger }) => {
  const [editing, setEditing] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");

  const fetchExpenses = async () => {
    try {
      const expenseSnapshot = await getDocs(collection(db, "expenses"));
      const expenseList = expenseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expenseList);
    } catch (error) {
      console.error("Error fetching expenses: ", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchTrigger]);

  const startEditing = (expense) => {
    setEditing(expense.id);
    setUpdatedName(expense.name);
    setUpdatedAmount(expense.amount);
  };

  const saveEdit = async (id) => {
    const expenseDoc = doc(db, "expenses", id);
    await updateDoc(expenseDoc, { name: updatedName, amount: updatedAmount });
    setEditing(null);
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    const expenseDoc = doc(db, "expenses", id);
    await deleteDoc(expenseDoc);
    fetchExpenses();
  };

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id} className="border-b p-2 flex items-center">
          {editing === expense.id ? (
            <>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="border p-2 mr-2"
              />
              <input
                type="number"
                value={updatedAmount}
                onChange={(e) => setUpdatedAmount(e.target.value)}
                className="border p-2 mr-2"
              />
              <button
                onClick={() => saveEdit(expense.id)}
                className="bg-green-600 text-white p-2 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(null)}
                className="bg-gray-600 text-white p-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span className="flex-1">
                {expense.name} - ${expense.amount}
              </span>
              <button
                onClick={() => startEditing(expense)}
                className="bg-blue-600 text-white p-2 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="bg-red-600 text-white p-2"
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
