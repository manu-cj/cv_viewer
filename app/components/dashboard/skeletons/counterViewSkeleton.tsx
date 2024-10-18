import React from 'react';

function CounterViewSkeleton() {
    return (
        <div className="w-full sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5 min-h-48 bg-gray-800 text-center rounded-lg p-6 shadow-xl">
            <h3 className="text-gray-200 text-lg font-semibold mb-2 animate-pulse">
                <div className="mt-4 animate-pulse bg-gray-700 h-4 w-1/2 mx-auto rounded"></div> 
            </h3>
            <div className="border-4 rounded-full w-28 h-28 flex justify-center items-center mx-auto border-gray-500 animate-pulse">
                <div className="w-20 h-20 bg-gray-700 rounded-full"></div>
            </div>
        </div>
    );
}

export default CounterViewSkeleton;
