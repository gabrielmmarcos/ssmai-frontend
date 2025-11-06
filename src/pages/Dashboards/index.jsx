import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import ItemCard from "../../components/itemCard";
import Dashboard from "../../components/dashboard";
import api from "../../api/api";

function DashboardTela() {
    //get produtos
    const [produtos, setProdutos] = useState([]);
    useEffect(() => {
        async function carregarProdutosEEstoque() {
            try {
                const response = await api.get("/products/all_by_user_enterpryse?offset=0&limit=8");
                const produtosData = response.data.products;
                setProdutos(produtosData);

                // carrega estoques logo após pegar produtos
                const responses = await Promise.all(
                    produtosData.map((p) =>
                        api
                            .get(`/stock/${p.id}`)
                            .then((res) => ({
                                id: p.id,
                                custo_medio: res.data.custo_medio,
                                quantidade_disponivel: res.data.quantidade_disponivel,
                            }))
                            .catch(() => ({
                                id: p.id,
                                custo_medio: null,
                                quantidade_disponivel: null,
                            }))
                    )
                );

                const dataMap = {};
                responses.forEach((s) => {
                    dataMap[s.id] = s;
                });
                setStocks(dataMap);
            } catch (error) {
                console.error("Erro ao buscar produtos/estoque:", error);
            }
        }

        carregarProdutosEEstoque();
    }, []);

    //get stok
    const [stocks, setStocks] = useState({});

    useEffect(() => {
        async function carregarStocks() {
            try {
                const responses = await Promise.all(
                    produtos.map((p) =>
                        api
                            .get(`/stock/${p.id}`)
                            .then((res) => ({
                                id: p.id,
                                custo_medio: res.data.custo_medio,
                                quantidade_disponivel: res.data.quantidade_disponivel,
                            }))
                            .catch(() => ({
                                id: p.id,
                                custo_medio: null,
                                quantidade_disponivel: null,
                            }))
                    )
                );

                const dataMap = {};
                responses.forEach((s) => {
                    dataMap[s.id] = s;
                });
                setStocks(dataMap);
            } catch (error) {
                console.error("Erro ao carregar estoques:", error);
            }
        }

        if (produtos.length > 0) {
            carregarStocks();
        }
    }, [produtos]);

    const formatarPreco = (valor) => {
        if (valor === null || valor === undefined) return "-";
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };


    return (
        <div className="flex w-full">
            <Navbar />
            <div className="flex flex-col flex-1 py-28 px-10 lg:py-10 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">
                <h1 className="text-2xl lg:text-5xl text-center lg:text-left font-bold text-gray-800 mb-8">
                    Bem-vindo, <span className="text-blue-600">Dashboard</span>
                </h1>

                <Dashboard />

                <div className="flex justify-between items-center mb-14 mt-32">
                    <h2 className="text-lg font-semibold text-gray-800">Itens com Análise</h2>
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
                                preco={stocks[p.id]
                                    ? formatarPreco(stocks[p.id].custo_medio)
                                    : ""}
                                quantidade={stocks[p.id]
                                    ? stocks[p.id].quantidade_disponivel
                                    : ""}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">Nenhum produto encontrado.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardTela;
