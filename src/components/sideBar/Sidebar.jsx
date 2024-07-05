import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Sidebar.css";
import Categorie from "../../icons/category-2.jsx";
import Gallery from "../../icons/gallery.jsx";
import People from "../../icons/people.jsx";
import OrdersIcon from "../../icons/OrdersIcon.jsx";
import axios from "axios";

const Sidebar = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paints, setPaints] = useState([]);
    const [selectedPaintId, setSelectedPaintId] = useState("");
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState("");
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        navigate("/login");
    };

    const handleEditClick = () => setIsModalOpen(true);
    const modalClose = () => setIsModalOpen(false);

    const handleInputChangePainture = (e) => {
        setSelectedPaintId(e.target.value);
    };

    const handleInputChangeClient = (e) => {
        setSelectedClientId(e.target.value);
    };

    const handleInputGenerate = async (selectedClientId, selectedPaintId) => {
        try {
            const token = localStorage.getItem("jwt");
            if (!token) {
                throw new Error("Pas de token d'authentification");
            }

            const data = {
                clientId: selectedClientId,
                paintingId: selectedPaintId,
            };
            console.log(JSON.stringify(data));

            const config = {
                method: "post",
                url: "http://panelart.fun:3759/api/certificates/generate",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(data),
                responseType: "blob", // Indique à axios de traiter la réponse comme un blob
                maxBodyLength: Infinity,
            };

            const response = await axios.request(config);

            // Créer un blob à partir de la réponse
            const blob = new Blob([response.data], { type: "application/pdf" });
            // Créer une URL à partir du blob
            const url = window.URL.createObjectURL(blob);
            // Ouvrir cette URL dans une nouvelle fenêtre
            window.open(url);

            console.log("PDF généré et ouvert dans une nouvelle fenêtre.");
        } catch (error) {
            console.error("Erreur lors de la génération du certificat:", error);
            setError("Erreur lors de la génération du certificat");
        }
    };



    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = localStorage.getItem("jwt");
                if (!token) {
                    throw new Error("Pas de token d'authentification");
                }
                const apiBaseUrl = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${apiBaseUrl}/api/clients/`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setClients(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des clients:", err);
                setError(err.message || "Erreur lors de la récupération des clients");
            }
        };

        const fetchPaints = async () => {
            try {
                const token = localStorage.getItem("jwt");
                if (!token) {
                    throw new Error("Pas de token d'authentification");
                }
                const apiBaseUrl = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${apiBaseUrl}/api/paintings/`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setPaints(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des peintures:", err);
                setError(err.message || "Erreur lors de la récupération des peintures");
            }
        };

        fetchPaints();
        fetchClients();
    }, []);

    return (
        <>
            <aside className="sidebar">
                <div className="sidebar-header">
                    {/* Espace vide pour aligner avec le header principal */}
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className="menu-item">
                            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                                <Categorie /> Tableau de bord
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/clients" className={({ isActive }) => (isActive ? "active" : "")}>
                                <People /> Clients
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/tableaux" className={({ isActive }) => (isActive ? "active" : "")}>
                                <Gallery /> Tableaux
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
                                <OrdersIcon /> Commandes
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleEditClick}>
                        Generer un certificat
                    </button>
                </div>
                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        Déconnexion
                    </button>
                </div>
            </aside>

            {isModalOpen && (
                <div className="sertif-modal">
                    <div>
                        <label>
                            Peinture
                            <select
                                name="painture"
                                value={selectedPaintId}
                                onChange={handleInputChangePainture}
                                required
                            >
                                {paints.map((paint) => (
                                    <option key={paint.id} value={paint.id}>
                                        {paint.title}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Client
                            <select
                                name="client"
                                value={selectedClientId}
                                onChange={handleInputChangeClient}
                                required
                            >
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.firstname} {client.lastname}
                                    </option>
                                ))}
                            </select>
                        </label>
                        {error && <div className="error">{error}</div>}
                        <button className="logout-btn" onClick={modalClose}>
                            Annuler
                        </button>
                        <button
                            className="logout-btn"
                            onClick={() => handleInputGenerate(selectedClientId, selectedPaintId)}
                        >
                            Valider
                        </button>
                    </div>
                </div>

            )}
        </>
    );
};

export default Sidebar;
