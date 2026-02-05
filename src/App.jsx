import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppNavbar from "./components/AppNavbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ClientList from "./pages/ClientList";
import AddClient from "./pages/AddClient";
import ClientDetails from "./pages/ClientDetails";
import CaseList from "./pages/CaseList";
import AddCase from "./pages/AddCase";
import HearingList from "./pages/HearingList";
import AddHearing from "./pages/AddHearing";


const App = () => {
  return (
    <Router>
      <AppNavbar />

      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cases" element={<CaseList />} />
        <Route path="/cases/add" element={<AddCase />} />


        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/add" element={<AddClient />} />
        <Route path="/clients/:id" element={<ClientDetails />} />
        <Route path="/hearings" element={<HearingList />} />
        <Route path="/hearings/add" element={<AddHearing />} />

      </Routes>
    </Router>
  );
};

export default App;
