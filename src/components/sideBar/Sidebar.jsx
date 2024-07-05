import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Sidebar.css";
import Categorie from "../../icons/category-2.jsx"
import Gallery from "../../icons/gallery.jsx"
import People from "../../icons/people.jsx";
import OrdersIcon from "../../icons/OrdersIcon.jsx";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {/* Espace vide pour aligner avec le header principal */}
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="menu-item">

            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Categorie/> Tableau de bord
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clients"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <People/> Clients
            </NavLink>
          </li>
          <li>
            <NavLink
                to="/tableaux"
                className={({isActive}) => (isActive ? "active" : "")}
            >
              <Gallery/> Tableaux
            </NavLink>
          </li>
            <li>
              <NavLink
                  to="/orders"
                  className={({isActive}) => (isActive ? "active" : "")}
              >
                <OrdersIcon/> Commandes
              </NavLink>
            </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
