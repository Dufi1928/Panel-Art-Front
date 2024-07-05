// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Utilisez BrowserRouter uniquement dans l'index principal de l'application
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Client from "./pages/Client";
import Paints from "./pages/Paints";
import Orders from "./pages/Orders";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute />}>
                <Route index element={<Home />} />
                <Route path="/clients" element={<Client />} />
                <Route path="/tableaux" element={<Paints />} />
                <Route path="/orders" element={<Orders />} />
            </Route>
        </Routes>
    );
}

export default App;
