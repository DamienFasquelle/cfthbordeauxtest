import React, { useState } from 'react';

const VosPhotos = () => {
  const [photos, setPhotos] = useState([
    { id: 1, url: 'https://via.placeholder.com/150', uploader: 'Sarah' },
    { id: 2, url: 'https://via.placeholder.com/150', uploader: 'Damien' },
  ]);

  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [uploaderName, setUploaderName] = useState('');

  const handleAddPhoto = () => {
    if (newPhotoUrl && uploaderName) {
      setPhotos([
        ...photos,
        { id: photos.length + 1, url: newPhotoUrl, uploader: uploaderName },
      ]);
      setNewPhotoUrl('');
      setUploaderName('');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Vos Photos</h1>

      {/* Ajouter une nouvelle photo */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="URL de l'image"
          className="form-control mb-2"
          value={newPhotoUrl}
          onChange={(e) => setNewPhotoUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom de l'uploader"
          className="form-control mb-2"
          value={uploaderName}
          onChange={(e) => setUploaderName(e.target.value)}
        />
        <button onClick={handleAddPhoto} className="btn text-white" style={{ backgroundColor: '#592F2F' }}>
          Ajouter une photo
        </button>
      </div>

      {/* Galerie de photos */}
      {/* <div className="row">
        {photos.map((photo) => (
          <div className="col-md-4 mb-4" key={photo.id}>
            <div className="card">
              <img src={photo.url} className="card-img-top" alt="Uploaded" />
              <div className="card-body">
                <p className="card-text text-center">Ajouté par: {photo.uploader}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default VosPhotos;
