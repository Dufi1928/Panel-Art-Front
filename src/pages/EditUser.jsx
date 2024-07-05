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
  const [stats, setStats] = useState({
    totalSpent: 0,
    orderCount: 0,
    paintingCount: 0,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
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

        const ordersResponse = await axios.get(`${apiBaseUrl}/api/orders`, {
          headers: { Authorization: `${token}` },
        });

        const clientOrders = ordersResponse.data.filter(
          (order) => order.client_id == id
        );
        setOrders(clientOrders);

        const totalSpent = clientOrders.reduce(
          (sum, order) => sum + parseFloat(order.total_price),
          0
        );
        const orderCount = clientOrders.length;
        const paintingCount = clientOrders.reduce(
          (sum, order) => sum + order.items.length,
          0
        );
        setStats({ totalSpent, orderCount, paintingCount });
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchClientDetails();
  }, [id]);

  const openEditModal = () => {
    setEditData({
      email: client.email,
      phone: client.phone,
      adresse: client.adresse,
      complement: client.complement,
      postalCode: client.postalCode,
      town: client.town,
    });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const apiBaseUrl = import.meta.env.VITE_API_URL;
      await axios.put(`${apiBaseUrl}/api/clients/update/${id}`, editData, {
        headers: { Authorization: `${token}` },
      });
      setClient(editData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client:", error);
    }
  };

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
            <div className="client-header">
              <h2>
                {client.firstname} {client.lastname}
              </h2>
              <button onClick={openEditModal} className="edit-button">
                Modifier
              </button>
            </div>
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
      {isEditModalOpen && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Modifier les informations du client</h2>
            <form onSubmit={handleEditSubmit}>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Téléphone:
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Adresse:
                <input
                  type="text"
                  name="adresse"
                  value={editData.adresse}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Complément:
                <input
                  type="text"
                  name="complement"
                  value={editData.complement}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Code Postal:
                <input
                  type="text"
                  name="postalCode"
                  value={editData.postalCode}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Ville:
                <input
                  type="text"
                  name="town"
                  value={editData.town}
                  onChange={handleInputChange}
                />
              </label>
              <div className="form-actions">
                <button type="submit">Sauvegarder</button>
                <button type="button" onClick={() => setIsEditModalOpen(false)}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;