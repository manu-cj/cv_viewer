// components/FileUpload.tsx
import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.files && target.files[0]) {
      const selectedFile = target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setMessage('Veuillez sélectionner un fichier PDF.');
        setFile(null);
      } else {
        setFile(selectedFile);
        setMessage(undefined);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name);

    setLoading(true);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setMessage(data.message);
      setFile(null);

      setTimeout(() => {
        setMessage(undefined);
      }, 2000);

      console.log(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setMessage(errorMessage);
      console.error('Erreur lors de l\'upload:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center p-6 bg-gray-900 rounded-lg ">
      <div className='w-full min-h-48 max-h-48 bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out rounded-lg p-2 shadow-xl flex flex-col justify-center items-center'>
      <h2 className='text-orange-500 text-xl font-bold mb-4'>Ajouter un CV</h2>
      <form onSubmit={handleSubmit} className='w-full h-full flex flex-col items-center' encType="multipart/form-data">
        <label className='w-full cursor-pointer flex flex-col items-center'>
          <input 
            type='file' 
            name='file' 
            accept="application/pdf" 
            onChange={handleChange} 
            className='hidden'
            id="file-upload"
          />
           <span className='text-neutral-100 text-sm font-semibold mb-2 transition duration-300 ease-in-out'>
            Choisissez un fichier PDF
          </span>
          {!file && (
            <button 
              type="button" 
              onClick={() => document.getElementById('file-upload')?.click()} 
              className='mt-8 bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out'
            >
              Choisir un fichier
            </button>
          )}
        </label>
        {file && (
          <div className='mt-2 text-neutral-300 text-sm flex flex-col items-center justify-center text-center'>
            Titre du fichier: <span className='font-semibold text-green-400'>{file.name}</span>
            <button 
              type="submit" 
              className='mt-2 bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out'
              disabled={loading} 
            >
              {loading ? 'Uploading...' : 'Uploader'}
            </button>
          </div>
        )}
      </form>

      <div className='mt-4'>
        <p className={`text-sm ${message ? (message.includes('Erreur') ? 'text-red-300' : 'text-green-300') : 'text-transparent'} font-medium transition duration-300 ease-in-out text-center`}>
          {message}
        </p>
      </div>
    </div>
    </div>
    
  );
};

export default FileUpload;
