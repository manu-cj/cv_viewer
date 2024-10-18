"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";


import CvFormSkeleton from "@/app/components/dashboard/skeletons/CvFormSkeleton";
import CounterViewSkeleton from "@/app/components/dashboard/skeletons/counterViewSkeleton";
import FileListSkeleton from "@/app/components/dashboard/skeletons/FileListSkeleton";
import LogSkeleton from "@/app/components/dashboard/skeletons/LogSkeleton";

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/check-auth', { method: 'GET' });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/login');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-col flex-grow flex items-center justify-center p-4">
    
      {isAuthenticated ? children : (
        <div className="w-full flex flex-col items-center bg-gray-900 py-8 p-4 lg:p-8 rounded-lg shadow-lg space-y-10">
        <div className="flex flex-wrap justify-around items-center w-full gap-6 py-8">
          <CounterViewSkeleton/>
          <CounterViewSkeleton/>
          <CounterViewSkeleton/>
          <CounterViewSkeleton/>
        </div>
        <div className='w-full'>
          <CvFormSkeleton />
        </div>
        <div className="w-full">
          <FileListSkeleton/>
        </div>
        <div className="flex flex-wrap justify-between items-start w-full gap-6">
          <LogSkeleton/>
          <LogSkeleton/>
          <LogSkeleton/>
        </div>
  
      </div>
      )}
    
      </main>
      <Footer />
    </div>
   
  );
};

export default Layout;