import React, { useState } from 'react';


const AjouterPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Gestion du fichier
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setSuccess('');
    setError('');
  };

  // Gestion de l'ajout d'une photo
  const handleAddPhoto = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Vous devez être connecté pour ajouter une photo.');
      return;
    }

    if (!selectedFile) {
      setError('Veuillez sélectionner une image.');
      return;
    }

    const formData = new FormData();
    formData.append('path', selectedFile);

      try {
        setUploading(true);
      setError('');
        const response = await fetch('http://127.0.0.1:8000/images', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              
            },
            body: formData,
        });

      if (response.ok) {
      setSuccess('Votre photo a été ajoutée avec succès.');
      setSelectedFile(null);
    } else {
      const result = await response.json();
      setError(result.error || 'Échec de l’envoi de l’image. Veuillez réessayer.');
    }
  } catch (err) {
    console.error('Erreur lors de l’upload de l’image :', err);
    setError('Échec de l’envoi de l’image. Veuillez réessayer.');
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Ajouter une Photo</h1>
     
      {success && <div className="alert alert-success">{success}</div>}
    
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-4">
        <input
          type="file"
          className="form-control mb-2"
          onChange={handleFileChange}
        />
        <button
          onClick={handleAddPhoto}
          className="btn text-white"
          style={{ backgroundColor: '#592F2F' }}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Ajouter une photo'}
        </button>
      </div>
    </div>
  );
};

export default AjouterPhoto;
