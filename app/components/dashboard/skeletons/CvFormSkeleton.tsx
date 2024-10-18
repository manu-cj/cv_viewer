import React from 'react';

function CvFormSkeleton() {
    return (
<div className="w-full flex flex-col justify-center items-center p-6 bg-gray-900 rounded-lg">
  <div className="w-full min-h-48 max-h-48 bg-gray-800 transition duration-300 ease-in-out rounded-lg p-4 shadow-xl flex flex-col justify-center items-center">
  <span className="text-neutral-100 text-sm font-semibold mb-2 animate-pulse bg-gray-700 h-6 w-1/6 rounded"></span>
  <form className="w-full h-full flex flex-col items-center">
      <label className="w-full cursor-pointer flex flex-col items-center">
        <span className="text-neutral-100 text-sm font-semibold mb-2 animate-pulse bg-gray-700 h-6 w-1/5 rounded"></span>
        <div className="mt-8 flex justify-center">
          <button 
            type="button" 
            className="animate-pulse bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Choisir un fichier
          </button>
        </div>
      </label>
    </form>

  </div>
</div>     
    );
}

export default CvFormSkeleton;