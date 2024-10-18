"use client";
import React, { useEffect, useState } from "react";

interface DownloadItem {
    _id: string;
    filename: string;
    userId: string;
    createdAt: string;
} 

interface FileItem {
    _id: string;
    title: string;
    filename: string;
    ext: string;
    pathname: string;
    createdAt: string;
  }

function PrintLog() {
    const [downloads, setDownloads] = useState<DownloadItem[]>([]);
    const [files, setFiles] = useState<FileItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDownload = async () => {
            try {
                const response = await fetch("/api/print");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des fichiers");
                }
                const results = await response.json();
                setDownloads(results.data)
                setFiles(results.file);
                console.log(results);
                filterByFilename(results.data[0].filename, results.file);
  
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Erreur lors de la récupération des fichiers:", error);
                    setError(error.message);
                    
                    
                  } else {
                    console.error("Erreur lors de la récupération des fichiers:", error);
                    setError("Une erreur inconnue est survenue.");
                  }
            }
        }
        fetchDownload();
    }, [])

    const filterByFilename = (filenameToFilter: string, data) => {
        const result = data.find((item) => item.filename === filenameToFilter);
    
        if (result) {
          return result.title;
        } else {
          console.log("Fichier non trouvé.");
        }
      };

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric", 
          minute: "numeric",
          second: "numeric",
        };
        return new Intl.DateTimeFormat("fr-FR", options).format(
          new Date(dateString)
        );
      };

      console.log(error);
      
    return (
        <div className="w-full flex flex-col justify-start items-center p-6 rounded-lg min-h-96">
            <div className="w-full h-96 bg-gray-800 transition-all duration-300 ease-in-out rounded-xl p-8 shadow-lg flex flex-col justify-start items-center">
                <h2 className="text-orange-500 text-xl font-bold mb-4">Toutes les impressions</h2>
                <div className="overflow-y-auto max-h-72 w-full rounded-lg">
                  <table className="min-w-full bg-gray-800 text-gray-300 rounded-lg overflow-hidden">
                  <thead>
                      <tr className="bg-gray-700 text-gray-100">
                      <th className="px-6 py-3 text-center font-medium">Nom</th>
                      <th className="px-6 py-3 text-center font-medium">Date</th>
                      </tr>
                  </thead>
                  <tbody>
                      {downloads.length > 0 ? (
                          downloads.map((download) => (
                          <tr key={download._id} className="transition-all hover:bg-gray-700 transition">
                              <td className="px-6 py-4 text-center border-b border-gray-700"> {filterByFilename(download.filename, files)} </td>
                              <td className="px-6 py-4 text-center border-b border-gray-700">{formatDate(download.createdAt)}</td>
                          </tr>
                          ))
                      ) : (
                          <tr>
                          <td colSpan={4} className="text-center py-6 text-gray-500">
                            Aucun résultats trouvé.
                          </td>
                        </tr> 
                      )}
                      
                  </tbody>
                  </table>
                </div>
            </div>
        </div>

    );
}

export default PrintLog;