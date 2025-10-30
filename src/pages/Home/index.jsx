import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import ItemCard from "../../components/itemCard";
import Dashboard from "../../components/dashboard";
import api from "../../api/api";



function Home() {
  // api para da get nos produtos
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await api.get("/products/all");

        setProdutos(response.data.products || []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }

    carregarProdutos();
  }, []);

  //api para pegar nome do usuário
  const [userName, setUserName] = useState("João 0");
  useEffect(() => {
    async function carregarNomeUsuario() {
      try {
        const response = await api.get("/users/me");
        setUserName(response.data.name || "Usuário");
      } catch (error) {
        console.error("Erro ao carregar nome do usuário:", error);
      }
    }

    carregarNomeUsuario();
  }, []);

  return (
    <>
      <div className="flex w-full">
        {/* Navbar lateral fixa */}
        <Navbar />

        {/* Container principal */}
        <div className="flex flex-col flex-1 py-28 px-10 lg:py-10 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">
          {/* Título */}
          <h1 className="text-2xl lg:text-5xl text-center lg:text-left font-bold text-gray-800 mb-8">
            Bem-vindo, <span className="text-blue-600">{userName}</span>
          </h1>

          <Dashboard />
          {/* Itens */}
          <div className="flex justify-between items-center mb-14 mt-32">
            <h2 className="text-lg font-semibold text-gray-800">Itens no Estoque</h2>
            <a href="/estoque">
              <p className="text-blue-500 font-bold hover:underline cursor-pointer">
                Ver Todos
              </p>
            </a>
          </div>

          <div className="grid lg:grid-cols-4 grid-cols-1 w-full gap-4">
            {produtos.length > 0 ? (
              produtos.map((p) => (
                <ItemCard
                  key={p.id}
                  id={p.id}
                  nome={p.nome}
                  categoria={p.categoria}
                />
              ))
            ) : (
              <p className="text-gray-500">Nenhum produto encontrado.</p>
            )}
          </div>
        </div>
      </div>

    </>
  );
}

export default Home;
