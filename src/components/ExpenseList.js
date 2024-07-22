import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const expenseSnapshot = await getDocs(collection(db, "expenses"));
    const expenseList = expenseSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setExpenses(expenseList);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const updateExpense = async (id, updatedName, updatedAmount) => {
    const expenseDoc = doc(db, "expenses", id);
    await updateDoc(expenseDoc, { name: updatedName, amount: updatedAmount });
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
        <li key={expense.id} className="border-b p-2">
          <input
            type="text"
            value={expense.name}
            onChange={(e) =>
              updateExpense(expense.id, e.target.value, expense.amount)
            }
            className="border p-2"
          />
          <input
            type="number"
            value={expense.amount}
            onChange={(e) =>
              updateExpense(expense.id, expense.name, e.target.value)
            }
            className="border p-2"
          />
          <button
            onClick={() => deleteExpense(expense.id)}
            className="bg-red-600 text-white p-2 ml-2"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
