import Sidebar from "../components/sideBar/Sidebar.jsx";
import User from "../components/user/User.jsx";
import "./Home.css";

const Client = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-container">
        <header className="header">
          <User />
        </header>
        <main className="main-content"></main>
      </div>
    </div>
  );
};

export default Client;
