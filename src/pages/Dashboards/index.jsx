import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import ItemCard from "../../components/itemCard";
import api from "../../api/api";

function DashboardTela() {
    //get produtos
    const [produtos, setProdutos] = useState([]);
    useEffect(() => {
        async function carregarProdutosEEstoque() {
            try {
                const response = await api.get("/products/with_analysis?offset=0&limit=100");
                const produtosData = response.data.products;
                setProdutos(produtosData);
            } catch (error) {
                console.error("Erro ao buscar produtos/estoque:", error);
            }
        }

        carregarProdutosEEstoque();
    }, []);





    return (
        <div className="flex w-full">
            <Navbar />
            <div className="flex flex-col flex-1 py-28 px-10 lg:py-10 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">
                <h1 className="text-2xl lg:text-5xl text-center lg:text-left font-bold text-gray-800 mb-8">
                    Dashboard
                </h1>

                <div className="grid lg:grid-cols-4 grid-cols-1 w-full gap-4">
                    {produtos.length > 0 ? (

                        [...produtos]
                            .sort((a, b) => a.id - b.id)
                            .map((p) => (
                                <ItemCard
                                    key={p.id}
                                    id={p.id}
                                    nome={p.nome}
                                    categoria={p.categoria}

                                />
                            ))
                    ) : (
                        <p className="text-gray-500 text-xl">Nenhum produto disponível para análises com IA.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardTela;
