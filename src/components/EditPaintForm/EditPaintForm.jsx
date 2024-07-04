import React, { useState } from "react";
import "./EditPaintForm.css"; // Assurez-vous d'avoir un fichier CSS pour le style

export default function  EditPaintForm (paint, onSave, onCancel ) {
    const [formData, setFormData] = useState({ ...paint });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="edit-paint-form">
            <h2>Modifier un Tableau</h2>
            <div>
                <label>Titre</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Méthode</label>
                <input
                    type="text"
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Longueur</label>
                <input
                    type="number"
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Largeur</label>
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Date de création</label>
                <input
                    type="text"
                    name="createdAt"
                    value={formData.createdAt}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Quantité</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="button" onClick={onCancel}>
                    Annuler
                </button>
                <button type="submit">Valider</button>
            </div>
        </form>
    );
};

