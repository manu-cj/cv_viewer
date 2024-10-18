import React from "react";
import { useState, useEffect } from "react";

interface visitItem {
  _id: string;
  filename: string;
  duration: number;
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

function ViewsLog() {
  const [visits, setVisits] = useState<visitItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch("/api/visits");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des fichiers");
        }
        const results = await response.json();
   
        setVisits(results.visits);
        setFiles(results.file);

        filterByFilename(results.data[0].filename, results.file);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Erreur lors de la récupération des fichiers:", error);
        } else {
          console.error("Erreur lors de la récupération des fichiers:", error);
        }
      }
    };

    fetchVisits();
  }, []);

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

  return (
<div className="w-full flex flex-col justify-start items-center p-6 rounded-lg min-h-96">
  <div className="w-full h-auto bg-gray-800 transition-all duration-300 ease-in-out rounded-xl p-8 shadow-lg flex flex-col justify-start items-center">
    <h2 className="text-orange-500 text-xl font-bold mb-4 text-center">
      Toutes les vues
    </h2>
    <div className="overflow-y-auto max-h-72 w-full rounded-lg">
      <table className="min-w-full bg-gray-800 text-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-700 text-gray-100">
            <th className="px-4 py-3 text-center font-medium">Nom</th>
            <th className="px-4 py-3 text-center font-medium">Temps resté</th>
            <th className="px-4 py-3 text-center font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {visits.length > 0 ? (
            visits.map((visit) => (
              <tr
                key={visit._id}
                className="transition-all hover:bg-gray-700"
              >
                <td className="px-4 py-4 text-center border-b border-gray-700">
                  {filterByFilename(visit.filename, files)}
                </td>
                <td className="px-4 py-4 text-center border-b border-gray-700">
                  {visit.duration < 60 
                    ? `${Math.round(visit.duration)}s` 
                    : `${Math.floor(visit.duration / 60)}m ${Math.round(visit.duration % 60)}s` 
                  }
                </td>
                <td className="px-4 py-4 text-center border-b border-gray-700">
                  {formatDate(visit.createdAt)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-6 text-gray-500">
                Aucune visite trouvée.
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

export default ViewsLog;
