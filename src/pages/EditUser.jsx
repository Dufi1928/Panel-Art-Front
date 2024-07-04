import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/sideBar/Sidebar.jsx";
import User from "../components/user/User.jsx";
import axios from "axios";
import "./Home.css";
import "./EditUser.css";

const EditUser = () => {
  const [client, setClient] = useState(null);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalSpent: 0, orderCount: 0 });
  const { id } = useParams();

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const apiBaseUrl = import.meta.env.VITE_API_URL;
        const clientResponse = await axios.get(
          `${apiBaseUrl}/api/clients/${id}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setClient(clientResponse.data);

        const ordersResponse = await axios.get(
          `${apiBaseUrl}/api/orders?client_id=${id}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setOrders(ordersResponse.data);

        // Calculer les statistiques
        const totalSpent = ordersResponse.data.reduce(
          (sum, order) => sum + parseFloat(order.total_price),
          0
        );
        const orderCount = ordersResponse.data.length;
        setStats({ totalSpent, orderCount });
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchClientDetails();
  }, [id]);

  if (!client) return <div>Chargement...</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-container">
        <header className="header">
          <User />
        </header>
        <main className="main-content">
          <div className="user-details">
            <h2>
              {client.firstname} {client.lastname}
            </h2>
            <div className="client-details-info">
              <p>
                <strong>Adresse email :</strong> <span>{client.email}</span>
              </p>
              <p>
                <strong>Téléphone :</strong> <span>{client.phone}</span>
              </p>
              <div className="address-block">
                <strong>Adresse postale :</strong>
                <address>
                  {client.adresse}
                  {client.complement && <span>{client.complement}</span>}
                  <span>
                    {client.postalCode} {client.town}
                  </span>
                </address>
              </div>
            </div>
            <div className="user-stats">
              <div className="stat-box">
                <h3>Tableaux</h3>
                <p className="stat-number">{stats.orderCount}</p>
              </div>
              <div className="stat-box">
                <h3>Certificats</h3>
                <p className="stat-number">{stats.orderCount}</p>
              </div>
              <div className="stat-box">
                <h3>Argents dépensés</h3>
                <p className="stat-number">{stats.totalSpent.toFixed(2)}€</p>
              </div>
            </div>
          </div>
          <div className="orders-list">
            <h3>Commandes</h3>
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <p>Commande #{order.id}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Montant: {parseFloat(order.total_price).toFixed(2)}€</p>
                <p>Statut: {order.status}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditUser;
