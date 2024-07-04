import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
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
        <button className="logout-btn">Déconnexion</button>
      </div>
    </aside>
  );
};

export default Sidebar;
