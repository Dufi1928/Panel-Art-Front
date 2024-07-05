import React, {useEffect, useState} from "react";
import Sidebar from "../components/sideBar/Sidebar.jsx";
import EditIcon from "../icons/EditIcon.jsx"
import Gallery from "../icons/gallery.jsx"
import User from "../components/user/User.jsx";
import EditModal from "../components/EditPaintForm/EditPaintForm.jsx"
import CreateEditPaintForm from "../components/CreatePaintForm/CreatePaintForm.jsx"
import "./Home.css";
import axios from "axios";
import "./Paints.css"
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import RemoveIcon from "../icons/RemoveIcon.jsx";
const Paints = () => {

    const [paints, setPaints] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [currentPaint, setCurrentPaint] = useState(null);
    const [paint, setPaint] = useState({});

    const handleEditClick = (paint) => {
        setCurrentPaint(paint);
        setIsModalOpen(true);
    };
    const handleRemouvePaint = async (id) => {
        try {
            const token = localStorage.getItem("jwt");
            if (!token) {
                throw new Error("Pas de token d'authentification");
            }
            const apiBaseUrl = import.meta.env.VITE_API_URL;
            if (!apiBaseUrl) {
                throw new Error("L'URL de l'API n'est pas définie");
            }
            const url = `${apiBaseUrl}/api/paintings/delete/${id}`;
            await axios.delete(url, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Actualiser la liste des peintures après la suppression
            setPaints((prevPaints) => prevPaints.filter((paint) => paint.id !== id));
        } catch (err) {
            console.error("Erreur lors de la suppression de la peinture:", err);
            setError(err.message || "Erreur lors de la suppression de la peinture");
        }
    };

    const handleCreatePaintChange = (updatedPaint) => setPaint(updatedPaint);
    const handleCreateOpenModal = () => setIsModalCreateOpen(true);
    const handleCreateCloseModal = () => setIsModalCreateOpen(false);


    const handleModalClose = () => {
        setIsModalOpen(false);
        setCurrentPaint(null);
    };

    const handlePaintChange = (updatedPaint) => {
        setCurrentPaint(updatedPaint);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("jwt");
            if (!token) {
                throw new Error("Pas de token d'authentification");
            }
            const apiBaseUrl = import.meta.env.VITE_API_URL;
            if (!apiBaseUrl) {
                throw new Error("L'URL de l'API n'est pas définie");
            }
            const formData = new FormData();

            Object.keys(currentPaint).forEach(key => {
                if (key === 'imagePath') {
                    if (currentPaint[key] instanceof File) {
                        formData.append('image', currentPaint[key]);
                    }
                } else {
                    formData.append(key, currentPaint[key]);
                }
            });

            console.log("FormData entries:", [...formData.entries()]);
            const url = `${apiBaseUrl}/api/paintings/update/${currentPaint.id}`;
            console.log("URL de la requête:", url);
            console.log(formData)

            await axios.put(url, formData, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Rafraîchir la liste des peintures après la mise à jour
            const response = await axios.get(`${apiBaseUrl}/api/paintings/`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setPaints(response.data);
            handleModalClose();
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la peinture:", err);
            setError(err.message || "Erreur lors de la mise à jour de la peinture");
        }
    };
    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("jwt");
            if (!token) {
                throw new Error("Pas de token d'authentification");
            }
            const apiBaseUrl = import.meta.env.VITE_API_URL;
            if (!apiBaseUrl) {
                throw new Error("L'URL de l'API n'est pas définie");
            }
            const formData = new FormData();

            Object.keys(paint).forEach(key => {
                if (key === 'imagePath') {
                    if (paint[key] instanceof File) {
                        formData.append('image', paint[key]);
                    }
                } else if (key === 'createdAt'){
                    formData.append(key, paint[key]);
                }
                else {
                    formData.append(key, paint[key]);
                }
            });

            console.log("FormData entries:", [...formData.entries()]);
            const url = `${apiBaseUrl}/api/paintings/create`;
            console.log("URL de la requête:", url);
            console.log(formData);

            await axios.post(url, formData, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Rafraîchir la liste des peintures après la création
            const response = await axios.get(`${apiBaseUrl}/api/paintings/`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setPaints(response.data);
            handleCreateCloseModal();
        } catch (err) {
            console.error("Erreur lors de la création de la peinture:", err);
            setError(err.message || "Erreur lors de la création de la peinture");
        }
    };

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
                    <div className="create-button">
                        <button onClick={handleCreateOpenModal}>
                            create
                        </button>
                    </div>
                    <div className="paints-ontainer">
                        {paints.map((paint) => (
                            <div key={paint.id} className="paint-Line">
                                <div className="left-line-side">
                                    <div className="paint-image">
                                        <img src={`http://panelart.fun:3759/${paint.imagePath}`} alt=""/>
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
                                <div className="quantity-indicator">
                                    <div className="indicator_inner">
                                        <Gallery/> <span>{paint.quantity}</span>
                                    </div>

                                </div>
                                <div className="right-sideofline">
                                    <div className="icons-wraper">
                                        <div onClick={() => handleEditClick(paint)}>
                                            <EditIcon/>
                                        </div>
                                        <div onClick={() => handleRemouvePaint(paint.id)}>
                                            <RemoveIcon/>
                                        </div>
                                    </div>
                                    <h2 className="price">{paint.price} <span className="currency">€</span></h2>
                                </div>
                            </div>
                        ))}
                    </div>

                </main>
            </div>
            {isModalOpen && (
                <EditModal
                    paint={currentPaint}
                    onClose={handleModalClose}
                    onChange={handlePaintChange}
                    onSubmit={handleSubmit}
                />
            )}
            {isModalCreateOpen && (
                <CreateEditPaintForm
                    paint={paint}
                    onClose={handleCreateCloseModal}
                    onChange={handleCreatePaintChange}
                    onSubmit={handleCreateSubmit}
                />
            )}

        </div>
    );

};

export default Paints;
