import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLoginSuccess = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: email,
            password: password,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login_check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Erreur de connexion');
            }

            const result = await response.json();
            localStorage.setItem('token', result.token);
            handleLoginSuccess();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center bg-light">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h1 className="text-center mb-4">Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="staticEmail" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Entrez votre email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez votre mot de passe"
                        />
                        <p className=''>Mot de passe oublié ?</p>
                    </div>
                    <div className="mb-3 text-center">
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => navigate('/signin')} // Modifier la route vers l'inscription
                        >
                            S'inscrire
                        </button>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100">
                        Confirmer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
