import React from "react";
import Navbar from "../../components/navbar";
import ItemCard from "../../components/itemCard";
import Dashboard from "../../components/dashboard";


function Home() {

  return (
    <>
      <div className="flex w-full">
        {/* Navbar lateral fixa */}
        <Navbar />

        {/* Container principal */}
        <div className="flex flex-col flex-1 py-28 px-10 lg:py-10 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">
          {/* Título */}
          <h1 className="text-2xl lg:text-5xl text-center lg:text-left font-bold text-gray-800 mb-8">
            Bem-vindo, <span className="text-blue-600">Canalha</span>
          </h1>

          <Dashboard />
          {/* Itens */}
          <div className="flex justify-between items-center mb-14 mt-32">
            <h2 className="text-lg font-semibold text-gray-800">Itens que mais saem</h2>
            <a href="/ItemsDetalhes">
              <p className="text-blue-500 font-bold hover:underline cursor-pointer">
                Ver Todos
              </p>
            </a>
          </div>

          <div className="grid lg:grid-cols-4 grid-cols-1 w-full gap-4">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
        </div>
      </div>

    </>
  );
}

export default Home;
