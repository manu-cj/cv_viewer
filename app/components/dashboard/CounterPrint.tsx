import { useState, useEffect } from "react";

function CounterPrint() {
    const [dayPrint, setDayPrint] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrint= async () => {
            try {
                const response = await fetch("/api/print");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des fichiers");
                  }
                  const results = await response.json();
                  setDayPrint(results.data.length);
                  console.log(results);
                  
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
        
        fetchPrint();
    }, []);

    console.log(error);
    return (
        <>
        <div className="w-full sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-800 text-center rounded-lg p-6 shadow-xl transition-transform transform hover:scale-105">
            <h2 className="text-orange-500 text-xl font-bold mb-4">
                CV imprimé(s)
            </h2>
            <div className={`border-4 rounded-full w-28 h-28 flex justify-center items-center mx-auto ${
                dayPrint > 4 ? 'border-green-500' : 'border-orange-300'
            } bg-gray-900 transition-all duration-200`}>
                <p className="text-gray-100 text-2xl"> {dayPrint} </p>
            </div>
        </div>
        </>
    );
}

export default CounterPrint;