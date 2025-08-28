import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/footter";
import { UserContextProvider } from "./context/userContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <UserContextProvider>
      {" "}
      {/* Jakaa käyttäjätiedon kaikille alikomponenteille */}
      <div className="max-w-6xl min-h-screen mx-auto">
        <Navbar /> {/* Navigation */}
        <Outlet /> {/* Tänne tulee dynaaminen sisältö*/}
      </div>
      <Footer /> {/* Footter */}
      <ToastContainer theme="dark" />
    </UserContextProvider>
  );
};
export default App;
