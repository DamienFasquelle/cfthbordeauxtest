import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
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
                <form>
                    <div className="mb-3">
                        <label htmlFor="staticEmail" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="staticEmail"
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
                            placeholder="Entrez votre mot de passe"
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
