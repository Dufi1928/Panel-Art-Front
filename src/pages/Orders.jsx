import Sidebar from "../components/sideBar/Sidebar.jsx";
import User from "../components/user/User.jsx";
import "./Home.css";

export default function Orders(){
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-container">
                <header className="header">
                    <User />
                </header>

                <main className="main-content">


                </main>
            </div>
        </div>
    );
};

