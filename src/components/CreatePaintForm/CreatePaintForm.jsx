import React from "react";
import DropIcon from "../../icons/dropIcon.jsx";
import "./CreatePaintForm.css";

const CreateEditPaintForm = ({ paint = {}, onClose, onChange, onSubmit }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...paint, [name]: value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onChange({ ...paint, imagePath: e.target.files[0] });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('dragover');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            onChange({ ...paint, imagePath: files[0] });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
            <h2>Crrer un Tableau</h2>
                <form onSubmit={onSubmit} className="edit-form">
                    <div className="form-row">
                        <label>
                            Titre
                            <input
                                type="text"
                                name="title"
                                value={paint.title || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Longueur
                            <input
                                type="number"
                                name="height"
                                value={paint.height || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Largeur
                            <input
                                type="number"
                                name="width"
                                value={paint.width || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Description
                            <textarea
                                name="description"
                                value={paint.description || ''}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Quantité
                            <select
                                name="quantity"
                                value={paint.quantity || ''}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Sélectionner</option>
                                <option value="disponible">Disponible</option>
                                <option value="vendu">Vendu</option>
                            </select>
                        </label>
                        <label>
                            Prix
                            <input
                                name="price"
                                value={paint.price || ''}
                                onChange={handleInputChange}
                                required
                            ></input>
                        </label>

                    </div>
                    <div className="form-row">
                        <label className="file-input-label">
                            <div className="file-drop-area"
                                 onDragOver={handleDragOver}
                                 onDragLeave={handleDragLeave}
                                 onDrop={handleDrop}>
                                <input
                                    type="file"
                                    name="imagePath"
                                    onChange={handleFileChange}
                                />
                                <DropIcon/>
                                <b>Importer un fichier</b> <span>ou déposer le ici</span>
                            </div>
                        </label>
                        {paint.imagePath && typeof paint.imagePath === 'object' && 'name' in paint.imagePath && (
                            <div className="image-preview-create-container">
                                <img src={URL.createObjectURL(paint.imagePath)} alt="Aperçu"/>
                            </div>
                        )}
                    </div>

                        <div className="form-buttons">
                            <button type="submit">Valider</button>
                            <button type="button" onClick={onClose}>Annuler</button>
                        </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEditPaintForm;
