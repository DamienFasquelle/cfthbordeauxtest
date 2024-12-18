import React from 'react';
import abbott from '../assets/image/logo/abbott.png';
import beckman from '../assets/image/logo/beckman.png';
import biocynex from '../assets/image/logo/biocynex.png';
import cfth from '../assets/image/logo/cfth.jpg';
import chu from '../assets/image/logo/chu.png';
import sysmex from '../assets/image/logo/sysmex.png';
import tago from '../assets/image/logo/tago.png';
import werfen from '../assets/image/logo/werfen.jpg';
import cacolac from '../assets/image/logo/cacolac.png';


const Footer = () => {
  const logos = [abbott, beckman, biocynex, cfth, chu, sysmex, tago, werfen, cacolac];

  return (
    <footer className="text-dark py-4">
      <hr />
      <div className="container">
        {/* Section Contact */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email : contact@monprojet.com</li>
              <li>Téléphone : +33 1 23 45 67 89</li>
              <li>Adresse : 123 Rue Exemple, 75001 Paris, France</li>
            </ul>
          </div>

          {/* Section Grille des partenaires */}
          <div className="col-md-6">
            <h5>Nos Partenaires</h5>
            <div className="row">
              {logos.map((logo, index) => (
                <div className="col-4 mb-3" key={index}>
                  <img src={logo} className="img-fluid" alt="Partenaire" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; 2024 Mon Projet React</p>
      </div>
    </footer>
  );
};

export default Footer;
