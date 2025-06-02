

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footter";
import { UserContextProvider } from "./context/userContext";

const App = () => {
  return (
    <UserContextProvider> {/* Jakaa käyttäjätiedon kaikille alikomponenteille */}
      <div className="max-w-6xl mx-auto">
      <Navbar /> {/* Navigation */}
      <Outlet /> {/* Tänne tulee dynaaminen sisältö*/}
      </div>
      <Footer /> {/* Footter */}
    </UserContextProvider> 
  );
};
export default App
