import Sidebar from "../components/sideBar/Sidebar.jsx";
import EditIcon from "../icons/EditIcon.jsx"
import User from "../components/user/User.jsx";
import React, {useEffect, useState} from "react";
import "./Home.css";
import axios from "axios";
import "./Paints.css"
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
const Paints = () => {

    const [paints, setPaints] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPaints = async () => {
            try {
                const token = localStorage.getItem("jwt");
                if (!token) {
                    throw new Error("Pas de token d'authentification");
                }
                const apiBaseUrl = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${apiBaseUrl}/api/paintings/`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setPaints(response.data);
                console.log(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des paints:", err);
                setError(err.message || "Erreur lors de la récupération des paints");
            }
        };

        fetchPaints();
    }, []);

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-container">
                <header className="header">
                    <User />
                </header>

                <main className="main-content">
                    <div className="paints-ontainer">
                        {paints.map((paint) => (
                            <div key={paint.id} className="paint-Line">
                                <div className="left-line-side">
                                    <div className="paint-image">
                                        <img src={paint.imagePath} alt=""/>
                                    </div>
                                    <div className="paint-info">
                                        <div className="paint-info-content">
                                            <h3>{paint.title}</h3>
                                            <span className="pain-id gray">
                                            N°{paint.id}
                                        </span>
                                            <span className="pain-id gray">
                                            {paint.width} x {paint.height} cm
                                        </span>
                                            <div className="breackline">
                                            </div>
                                            <h3>
                                                {format(new Date(paint.createdAt), 'MMMM yyyy', {locale: fr})}
                                            </h3>
                                            <span className="pain-id main-color">
                                            {paint.description}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-sideofline">
                                    <EditIcon/>
                                    <h2 className="price">{paint.price} <span className="currency">€</span></h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );

};

export default Paints;
