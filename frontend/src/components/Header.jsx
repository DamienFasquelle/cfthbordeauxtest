import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image/logo/logo_cfth.png';

const Header = () => {
  return (
    <header className="mb-4">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid d-flex justify-content-center align-items-center">
          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '224px' }} />
          </Link>

          {/* Menu Burger */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Menu Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex flex-lg-row flex-column align-items-center gap-3">
            <li className="nav-item">
              <Link to="/repas" className="nav-link text-dark">Repas</Link>
            </li>
            <li className="nav-item">
              <Link to="/itineraire" className="nav-link text-dark">Itinéraires</Link>
            </li>
            <li className="nav-item">
              <Link to="/presentation" className="nav-link text-dark">Présentation</Link>
            </li>
            <li className="nav-item">
              <Link to="/quizz" className="nav-link text-dark">Quizz</Link>
            </li>
            <li className="nav-item">
              <Link to="/vos-photos" className="nav-link text-dark">Vos Photos</Link>
            </li>
          </ul>
          <div>
            <Link to="/login" className="nav-link text-dark">Se connecter</Link>

          </div>
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
