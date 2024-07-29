import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const ExpenseForm = ({ fetchExpenses }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "expenses"), { name, amount });
    setName("");
    setAmount("");
    fetchExpenses();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Expense Name"
        required
        className="border p-2 mb-4"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className="border p-2 mb-4"
      />
      <button type="submit" className="bg-blue-600 text-white p-2">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
