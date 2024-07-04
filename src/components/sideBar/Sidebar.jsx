import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
          <li className="active">
            <i className="icon-dashboard"></i> Tableau de bord
          </li>
          <li>
            <i className="icon-clients"></i> Clients
          </li>
          <li>
            <i className="icon-tables"></i> Tableaux
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
