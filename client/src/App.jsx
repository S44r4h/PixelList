

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footter";
import { UserContextProvider } from "../context/userContext";

const App = () => {
  return (
    <UserContextProvider>
      <div className="max-w-6xl mx-auto">
      <Navbar />
      <Outlet /> {/* Tänne tulee dynaaminen sisältö, esim. MainPage */}
      </div>
      <Footer />
    </UserContextProvider>
  );
};
export default App
