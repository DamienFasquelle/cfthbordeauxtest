import React from 'react';

const SiteMap = () => {
  return (
    <div>
      <h1>Plan du site</h1>
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/repas">Repas</a></li>
        <li><a href="/itineraire">Itinéraires</a></li>
        <li><a href="/presentation">Présentation</a></li>
        <li><a href="/quizz">Quizz</a></li>
        <li><a href="/vos-photos">Vos Photos</a></li>
      </ul>
      <div>
        <a href="/login">Se connecter</a>
      </div>
    </div>
  );
};

export default SiteMap;
