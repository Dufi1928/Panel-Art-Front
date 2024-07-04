import Sidebar from "../components/sideBar/Sidebar.jsx";
import User from "../components/user/User.jsx";
import "./Home.css";

const Home = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-container">
        <header className="header">
          <User />
        </header>
        <main className="main-content">
          <h2>Juillet 2024</h2>
          <div className="stats-grid">
            <div className="stat-card main-stat">
              <i className="icon-chart"></i>
              <h3>Chiffre d'affaire</h3>
              <p className="stat-value">12 789€</p>
            </div>
            <div className="stat-card">
              <i className="icon-sales"></i>
              <h3>Nombre de vente</h3>
              <p className="stat-value">15+</p>
            </div>
            <div className="stat-card">
              <i className="icon-users"></i>
              <h3>Acquéreurs</h3>
              <p className="stat-value">4+</p>
            </div>
            <div className="stat-card">
              <i className="icon-growth"></i>
              <h3>Taux d'évolution</h3>
              <p className="stat-value">+11,4%</p>
            </div>
            <div className="stat-card">
              <i className="icon-certificate"></i>
              <h3>Certificats générés</h3>
              <p className="stat-value">12+</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
