"use client";
import { useAuth } from "../../components/AuthProvider";
import Link from "next/link";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="bg-blue-600 p-4 text-white">
        {user ? (
          <>
            <Link href="/management" className="mr-4">
              Management
            </Link>
            <button onClick={logout} className="mr-4">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/signin" className="mr-4">
              Sign In
            </Link>
            <Link href="/signup" className="mr-4">
              Sign Up
            </Link>
          </>
        )}
      </nav>
      <h1 className="text-2xl mt-4">Welcome to Expense Tracker</h1>
    </div>
  );
};

export default Home;
