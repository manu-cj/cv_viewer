import { useState, useEffect } from "react";

function CounterView() {
    const [views, setViews] = useState<number>(1);

    useEffect(() => {
        const fetchVisits = async () => {
          try {
            const response = await fetch("/api/visits");
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des fichiers");
            }
            const data = await response.json();
            setViews(data.visits.length)
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

    return (
        <>
        <div className="w-full sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-800 text-center rounded-lg p-6 shadow-xl transition-transform transform hover:scale-105">
            <h2 className="text-orange-500 text-xl font-bold mb-4">Vue(s)</h2>
            <div className={`border-4 rounded-full w-28 h-28 flex justify-center items-center mx-auto ${
                views > 4 ? 'border-green-500' : 'border-orange-300'
            } bg-gray-900 transition-all duration-200`}>
                <p className="text-gray-100 text-2xl">{views}</p>
            </div>
        </div>
        </>
    );
}

export default CounterView;