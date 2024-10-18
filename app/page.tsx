"use client";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-col flex-grow justify-center items-center bg-gray-900 px-4 lg:px-8 py-20">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">Bienvenue sur CV Viewer</h1>
            <p className="mt-2 text-lg text-gray-300">Visualisez et téléchargez des CV facilement.</p>
          </header>

          <main className="flex flex-col items-center w-full">
            {/* Section d'informations sur l'application */}
            <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 w-full max-w-lg lg:max-w-2xl">
              <h2 className="text-2xl font-semibold text-white">À propos de notre application</h2>
              <p className="mt-2 text-gray-300">
                CV Viewer vous permet de télécharger et de visualiser des CV en quelques clics.
                Obtenez des statistiques sur les vues et le temps passé sur chaque CV.
              </p>
            </section>

            {/* Section des fonctionnalités */}
            <section className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg lg:max-w-2xl">
              <h2 className="text-2xl font-semibold text-white">Fonctionnalités</h2>
              <ul className="list-disc list-inside mt-2 text-gray-300">
                <li>Visualisation des CV en ligne</li>
                <li>Statistiques de visualisation</li>
                <li>Interface conviviale et intuitive</li>
              </ul>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
