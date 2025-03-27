

//import './App.css'
//import Navbar from "./components/Navbar";
//function App() {
// 
//
//  return (
//    <>
//      <Navbar />
//      <h1 class="text-3xl font-bold underline">
//    Hello world!
//  </h1>
//    </>
//  )
//}
//
//export default App

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footter";
const App = () => {
  return (
    <div >
      <div className="max-w-7xl mx-auto">
      <Navbar />
      <Outlet /> {/* Tänne tulee dynaaminen sisältö, esim. MainPage */}
      </div>
      <Footer />
    </div>
  );
};
export default App
