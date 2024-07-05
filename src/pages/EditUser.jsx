import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/sideBar/Sidebar.jsx";
import User from "../components/user/User.jsx";
import axios from "axios";
import GenerateCertificateIcon from "../icons/generateCertificate.jsx";
import SendCertificateIcon from "../icons/sendCertificate.jsx";
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

        // Récupérer les détails du client
        const clientResponse = await axios.get(
          `${apiBaseUrl}/api/clients/${id}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setClient(clientResponse.data);

        // Récupérer toutes les commandes
        const ordersResponse = await axios.get(`${apiBaseUrl}/api/orders`, {
          headers: { Authorization: `${token}` },
        });

        const clientOrders = ordersResponse.data.filter((order) => {
          return order.client_id == id;
        });

        setOrders(clientOrders);

        // Calculer les statistiques
        const totalSpent = clientOrders.reduce(
          (sum, order) => sum + parseFloat(order.total_price),
          0
        );
        const orderCount = clientOrders.length;
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
        <main className="main-content two-column-layout">
          <div className="client-info-column">
            <h2>
              {client.firstname} {client.lastname}
            </h2>
            <div className="client-details">
              <p>
                <strong>Email :</strong> {client.email}
              </p>
              <p>
                <strong>Téléphone :</strong> {client.phone}
              </p>
              <p className="address">
                <strong>Adresse :</strong>
                <span className="address-content">
                  {client.adresse}
                  {client.complement && <br />}
                  {client.complement}
                  <br />
                  {client.postalCode} {client.town}
                </span>
              </p>
            </div>
            <div className="client-stats">
              <div className="stat-box">
                <h3>Tableaux achetés</h3>
                <p>{stats.paintingCount}</p>
              </div>
              <div className="stat-box">
                <h3>Commandes</h3>
                <p>{stats.orderCount}</p>
              </div>
              <div className="stat-box">
                <h3>Montant total dépensé</h3>
                <p>{stats.totalSpent.toFixed(2)}€</p>
              </div>
            </div>
          </div>
          <div className="paintings-column">
            <h3>Tableaux achetés</h3>
            {orders.flatMap((order) =>
              order.items.map((painting, index) => (
                <div
                  key={`${painting.painting_id}-${order.id}-${index}`}
                  className="painting-item"
                >
                  <div className="painting-details">
                    <h4>{painting.painting_title}</h4>
                    <p>
                      <strong>ID :</strong> {painting.painting_id}
                    </p>
                    <p>
                      <strong>Prix :</strong>{" "}
                      {parseFloat(painting.painting_price).toFixed(2)}€
                    </p>
                    <p>
                      <strong>Quantité :</strong> {painting.quantity}
                    </p>
                  </div>
                  {order.status === "completed" ? (
                    <button className="certificate-button generate">
                      <GenerateCertificateIcon /> Générer le certificat
                    </button>
                  ) : order.status === "pending" ? (
                    <button className="certificate-button send">
                      <SendCertificateIcon /> Envoyer le certificat
                    </button>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditUser;
