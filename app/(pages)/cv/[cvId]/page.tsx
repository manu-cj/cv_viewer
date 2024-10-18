"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaPrint, FaDownload } from 'react-icons/fa';

const CvPage = () => {
  const [startTime] = useState<number>(Date.now());
  const { cvId } = useParams(); 




  useEffect(() => {
    const recordVisit = async () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
  
        try {
            await fetch('/api/visits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filename: cvId,
                    duration: duration/1000,
                }),
            });
        } catch (error) {
            console.error('Failed to record visit', error);
        }
    };
  
     window.addEventListener('beforeunload', recordVisit);
  
     return () => {
         window.removeEventListener('beforeunload', recordVisit);
     };

  },[startTime, cvId])




  const postDownload = async (data) => {
    const res = await fetch('/api/download-stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({filename: data})
    });

    if (res.ok) {
      const responseData = await res.json();
      console.log(responseData.message);
    } else {
      const errorData = await res.json();
      console.log(`Erreur : ${errorData.error}`);
    }
  }

  const postPrint = async (data) => {
    const res = await fetch('/api/print', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({filename: data})
    });

    if (res.ok) {
      const responseData = await res.json();
      console.log(responseData.message);
    } else {
      const errorData = await res.json();
      console.log(`Erreur : ${errorData.error}`);
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `/uploads/${cvId}.pdf`;
    link.download = `${cvId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    postDownload(cvId);
  };

  const handlePrint = () => {
    const printWindow = window.open(`/uploads/${cvId}.pdf`);
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
    postPrint(cvId);
  };

  return (
    <div className="fixed inset-0 z-50">
      <iframe
        src={`/uploads/${cvId}.pdf`}
        className="w-full h-full border-none"
        style={{ objectFit: 'contain' }}
        title="PDF Viewer"
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '56px',
          backgroundColor: '#2f2f2f',
          zIndex: 10,
        }}
      ></div>

      <div className="absolute top-2 right-2 z-20 flex space-x-2">
        <button
          onClick={handlePrint}
          className="flex items-center p-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 transition ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <FaPrint className="mr-1" /> Imprimer
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center p-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 transition ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <FaDownload className="mr-1" /> Télécharger
        </button>
      </div>
    </div>
  );
};

export default CvPage;
