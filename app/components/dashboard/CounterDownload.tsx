import { useState, useEffect } from "react";

function CounterDownload() {
    const [dayDownload, setDayDownload] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDownload = async () => {
            try {
                const response = await fetch("/api/download-stats");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des fichiers");
                  }
                  const results = await response.json();
                  setDayDownload(results.data.length);
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
    }, []);

    console.log(error);
    return (
        <>
        <div className="w-full sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-800 text-center rounded-lg p-6 shadow-xl transition-transform transform hover:scale-105">
            <h2 className="text-orange-500 text-lg sm:text-xl font-bold mb-4">
                CV téléchargé(s)
            </h2>
            <div className={`border-4 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex justify-center items-center mx-auto ${
                dayDownload > 4 ? 'border-green-500' : 'border-orange-300'
            } bg-gray-900 transition-all duration-200`}>
                <p className="text-gray-100 text-xl sm:text-2xl"> {dayDownload} </p>
            </div>
        </div>
        </>
    );
}

export default CounterDownload;