"use client";
import React, { useEffect, useState } from "react";
import FileListSkeleton from "@/app/components/dashboard/skeletons/FileListSkeleton";

interface FileItem {
  _id: string;
  title: string;
  filename: string;
  ext: string;
  pathname: string;
  createdAt: string;
}

const FileList = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/files");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des fichiers");
        }
        const data = await response.json();
        setFiles(data.files);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Erreur lors de la récupération des fichiers:", error);
          setError(error.message);
        } else {
          console.error("Erreur lors de la récupération des fichiers:", error);
          setError("Une erreur inconnue est survenue.");
        }
      } finally {
        setTimeout(() => {
            setLoading(false);
        }, 200)
        
      }
    };

    fetchFiles();
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("fr-FR", options).format(
      new Date(dateString)
    );
  };

  if (loading) {
    return <FileListSkeleton />;
  }

  return (
<div className="w-full flex flex-col justify-center items-center p-6 bg-gray-900 rounded-lg min-h-96">
  <div className="w-full h-auto bg-gray-800 transition-all duration-300 ease-in-out rounded-xl p-6 shadow-xl flex flex-col justify-start items-center">
    <h2 className="text-orange-500 text-xl font-bold mb-4">Tous les documents</h2>
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {files.length > 0 ? (
        files.map((file) => (
          <div key={file._id} className="bg-gray-900 p-4 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl">
            <h3 className="text-white font-semibold">{file.title}</h3>
            <p className="text-red-400 font-semibold uppercase">{file.ext.replace(".", "")}</p>
            <p className="text-gray-400">{formatDate(file.createdAt)}</p>
            <a
              className="text-blue-500 hover:text-blue-400 underline font-medium transition-all duration-200 ease-in-out"
              href={`/cv/${file.filename}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le document
            </a>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">Aucun fichier trouvé.</div>
      )}
    </div>
  </div>
  {error && <p className="mt-4 text-red-400">{error}</p>}
</div>




  );
};

export default FileList;
