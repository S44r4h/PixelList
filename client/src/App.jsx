

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footter";
import { UserContextProvider } from "./context/userContext";
import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <UserContextProvider> {/* Jakaa käyttäjätiedon kaikille alikomponenteille */}
      <div className="max-w-6xl mx-auto">
      <Navbar /> {/* Navigation */}
      <Outlet /> {/* Tänne tulee dynaaminen sisältö*/}
      </div>
      <Footer /> {/* Footter */}
      <ToastContainer/>
    </UserContextProvider> 
  );
};
export default App
