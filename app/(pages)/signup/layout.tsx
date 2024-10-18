import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Typage des props avec React.FC (Function Component)
const RegisterLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow w-full flex flex-col justify-start items-center p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default RegisterLayout;
