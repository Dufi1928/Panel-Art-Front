import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sideBar/Sidebar.jsx";
import User from "../components/user/User.jsx";
import "./Home.css";
import "./Client.css";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des clients:", err);
        setError(err.message || "Erreur lors de la récupération des clients");
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-container">
        <header className="header">
          <User />
        </header>
        <main className="main-content">
          <button className="add-client-btn">Ajouter un client</button>

          <div className="alert">
            <span className="alert-icon">⚠️</span>
            <p>
              Attention ! Des utilisateurs n'ont pas encore validé leur profil
            </p>
          </div>
          <div className="client-count">{clients.length} clients</div>
          <div className="client-list">
            {clients.map((client) => (
              <div key={client.id} className="client-card">
                <div className="client-info">
                  <h3>
                    {client.firstname} {client.lastname}
                  </h3>
                  <p>{client.email}</p>
                </div>
                <div className="client-status">
                  <span
                    className={`status-badge ${
                      client.isVerified ? "verified" : "unverified"
                    }`}
                  >
                    {client.isVerified ? "Vérifié" : "En attente"}
                  </span>
                  <span className="table-count">{client.tableCount} 🗂️</span>
                </div>
                <button className="edit-btn">✏️</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Client;
