import React, { useState } from 'react';
import '../styles/pages/login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault(); // Pour empêcher le formulaire de recharger la page
        try {
            const apiBaseUrl = import.meta.env.VITE_API_URL; // Utilisation de la variable d'environnement
            const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data)
            // Vérifier si data est défini et contient jwt
            if (data && data.token) {
                dispatch(login(data.token)); // Dispatch l'action pour se connecter avec le JWT reçu
                console.log('Login successful! JWT stored.');
                navigate('/');
            } else {
                throw new Error('JWT not found in response data');
            }
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (
        <div className="background-image">
            <div className="login-container">
                <h2>PANEL ART</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
