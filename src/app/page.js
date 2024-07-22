"use client";
import { AuthProvider } from "../components/AuthProvider";
import Home from "./home/page";

const App = () => (
  <AuthProvider>
    <Home />
  </AuthProvider>
);

export default App;
