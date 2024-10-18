import React from 'react';

function LogSkeleton() {
    return (
        <div className="w-full flex flex-col justify-start items-center p-6 rounded-lg min-h-96">
            <div className="w-full h-96 bg-gray-800 transition-all duration-300 ease-in-out rounded-xl p-8 shadow-lg flex flex-col justify-start items-center">
                
                <div className="w-1/4 h-6 bg-gray-700 rounded-md mb-6 animate-pulse"></div> 
                
                <table className="min-w-full bg-gray-800 text-gray-300 rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-700">
                    <th className="px-6 py-3">
                        <div className="w-full h-6 bg-gray-600 rounded-md animate-pulse"></div>
                    </th>
                    <th className="px-6 py-3">
                        <div className="w-full h-6 bg-gray-600 rounded-md animate-pulse"></div>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="px-6 py-4 border-b border-gray-700">
                        <div className="w-3/4 h-4 bg-gray-600 rounded-md mx-auto animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-700">
                        <div className="w-1/2 h-4 bg-gray-600 rounded-md mx-auto animate-pulse"></div>
                    </td>
                    </tr>
                    <tr>
                    <td className="px-6 py-4 border-b border-gray-700">
                        <div className="w-3/4 h-4 bg-gray-600 rounded-md mx-auto animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-700">
                        <div className="w-1/2 h-4 bg-gray-600 rounded-md mx-auto animate-pulse"></div>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

    );
}

export default LogSkeleton;