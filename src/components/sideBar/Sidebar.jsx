import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Sidebar.css";

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
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="icon-dashboard"></i> Tableau de bord
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clients"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="icon-clients"></i> Clients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tableaux"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="icon-tables"></i> Tableaux
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
