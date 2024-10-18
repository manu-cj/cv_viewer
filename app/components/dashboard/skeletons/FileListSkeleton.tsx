import React from 'react';

function FileListSkeleton() {
    return (
    <div className="w-full flex flex-col justify-center items-center p-6 bg-gray-900 rounded-lg min-h-96">
      <div className="w-full h-auto bg-gray-800 transition-all duration-300 ease-in-out rounded-xl p-6 shadow-xl flex flex-col justify-start items-center">
        <h2 className="text-orange-500 text-xl font-bold mb-4 animate-pulse">Tous les documents</h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => ( // Remplacer 8 par le nombre d'éléments que tu veux afficher
            <div key={index} className="bg-gray-900 p-4 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl">
              <div className="animate-pulse bg-gray-700 h-4 w-3/4 mb-2 rounded"></div>
              <div className="animate-pulse bg-gray-700 h-3 w-1/2 mb-2 rounded"></div>
              <div className="animate-pulse bg-gray-700 h-3 w-1/3 mb-2 rounded"></div>
              <div className="animate-pulse bg-gray-700 h-3 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
}

export default FileListSkeleton;
