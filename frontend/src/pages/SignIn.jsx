import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        company: '',
    });
    const [error, setError] = useState(null);

    const handleBack = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 

        try {
            const response = await fetch('http://127.0.0.1:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Une erreur est survenue');
            }

          
            const data = await response.json();
            console.log('Success:', data);
            navigate('/login'); 
        } catch (err) {
            console.error('Error:', err.message);
            setError(err.message);
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center bg-light">
            <button
                className="btn btn-secondary btn-sm m-3"
                onClick={handleBack}
            >
                Retour
            </button>
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h1 className="text-center mb-0">S'inscrire</h1>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Entrez votre email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Prénom
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Entrez votre prénom"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="company" className="form-label">
                            Entreprise
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Entrez le nom de votre entreprise"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Confirmer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
