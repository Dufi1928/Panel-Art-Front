import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/sideBar/Sidebar.jsx";
import User from "../components/user/User.jsx";
import "./Home.css";
import "./AddUser.css";

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    adresse: "",
    complement: "",
    town: "",
    postalCode: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear the error for this field when the user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "complement") {
        newErrors[key] = "Ce champ est requis";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const token = localStorage.getItem("jwt");
        console.log("Sending request to API");
        const apiBaseUrl = import.meta.env.VITE_API_URL;
        console.log("API URL:", `${apiBaseUrl}/api/auth/register`);

        const response = await axios.post(
          `${apiBaseUrl}/api/auth/register`,
          formData,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log("API response:", response);

        // Vérifiez le statut de la réponse au lieu de chercher une propriété 'success'
        if (response.status === 201) {
          setSubmitStatus({
            type: "success",
            message: `Super ! L'utilisateur a bien été créé`,
          });
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            adresse: "",
            complement: "",
            town: "",
            postalCode: "",
            role: "",
          });
        } else {
          throw new Error("La réponse du serveur n'indique pas un succès");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitStatus({
          type: "error",
          message:
            error.response?.data?.message ||
            "Oups ! Une erreur s'est produite lors de la création de l'utilisateur",
        });
      }
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-container">
        <header className="header">
          <User />
        </header>
        <main className="main-content">
          <div className="add-user-container">
            <h2>Ajouter un client</h2>
            {submitStatus && (
              <div
                className={`alert ${
                  submitStatus.type === "success"
                    ? "alert-success"
                    : "alert-error"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstname">Prénom</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Exemple : Placeholder"
                    onChange={handleChange}
                    value={formData.firstname}
                  />
                  {errors.firstname && (
                    <span className="error-text">{errors.firstname}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Nom</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Exemple : Martin"
                    onChange={handleChange}
                    value={formData.lastname}
                  />
                  {errors.lastname && (
                    <span className="error-text">{errors.lastname}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Exemple : pierre.martin@exemple.fr"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Exemple : 06 66 66 66 66"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                  {errors.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Exemple : azerty"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  {errors.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="adresse">Adresse</label>
                  <input
                    type="text"
                    id="adresse"
                    name="adresse"
                    placeholder="Exemple : 33 rue de Lille"
                    onChange={handleChange}
                    value={formData.adresse}
                  />
                  {errors.adresse && (
                    <span className="error-text">{errors.adresse}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="complement">Complément</label>
                  <input
                    type="text"
                    id="complement"
                    name="complement"
                    placeholder="Exemple : Appt 19 Résidence Boris Vian"
                    onChange={handleChange}
                    value={formData.complement}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="town">Ville</label>
                  <input
                    type="text"
                    id="town"
                    name="town"
                    placeholder="Exemple : LILLE"
                    onChange={handleChange}
                    value={formData.town}
                  />
                  {errors.town && (
                    <span className="error-text">{errors.town}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Code postal</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Exemple : 59000"
                    onChange={handleChange}
                    value={formData.postalCode}
                  />
                  {errors.postalCode && (
                    <span className="error-text">{errors.postalCode}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="role">Rôle</label>
                <select
                  id="role"
                  name="role"
                  onChange={handleChange}
                  value={formData.role}
                >
                  <option value="">Sélectionnez un rôle</option>
                  <option value="admin">Admin</option>
                  <option value="client">Client</option>
                </select>
                {errors.role && (
                  <span className="error-text">{errors.role}</span>
                )}
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Valider
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddUser;
