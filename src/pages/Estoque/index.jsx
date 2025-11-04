import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import { Plus, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";

import ItemCard from "../../components/itemCard";
import api from "../../api/api";

function Produtos() {

    const navigate = useNavigate();
    //get produtos
    const [produtos, setProdutos] = useState([]);
    useEffect(() => {
        async function carregarProdutosEEstoque() {
            try {
                const response = await api.get("/products/all_by_user_enterpryse?offset=0&limit=100");
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

    //format preco
    const formatarPreco = (valor) => {
        if (valor === null || valor === undefined) return "-";
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    //formta pra int
    const transfomaInt = (valor) => {
        if (valor === null || valor === undefined) return "-";
        return parseInt(valor)
    }

    //get stock ideal
    const [stockIdeal, setStockIdeal] = useState({})
    useEffect(() => {
        async function carregarStockIdeal() {
            try {
                const responses = await Promise.all(
                    produtos.map((p) =>
                        api
                            .get(`/ai_analysis/${p.id}`)
                            .then((res) => ({
                                id: p.id,
                                estoque_ideal: res.data.estoque_ideal,
                            }))
                            .catch(() => ({
                                id: p.id,
                                estoque_ideal: null,

                            }))
                    )
                );

                const dataMap = {};
                responses.forEach((s) => {
                    dataMap[s.id] = s;
                });
                setStockIdeal(dataMap);
            } catch (error) {
                console.error("Erro no get estoque ideal:", error);
            }
        }

        if (produtos.length > 0) {
            carregarStockIdeal();
        }
    }, [produtos]);

    return (
        <div className="flex w-full">
            <Navbar />

            <div className="flex flex-col flex-1 py-28 px-10 lg:py-10 min-h-screen bg-white overflow-x-hidden ml-0 lg:ml-52">
                <div className="flex justify-between items-start">
                    <h1 className="text-2xl lg:text-5xl text-center lg:text-left justify-center items-center flex font-bold text-gray-800 mb-8">
                        Estoque
                    </h1>
                    {/* Botão estatisticas */}
                    <div className=" flex items-center justify-center w-fit  cursor-pointer">
                        <button
                            type="button"
                            onClick={async () => {
                                try {
                                    // faz o PUT
                                    await api.put("/ai_analysis/all");
                                    console.log("Análises IA atualizadas com sucesso!");

                                    // navega pro dashboard do primeiro item
                                    if (produtos.length > 0) {
                                        const primeiroId = produtos[0].id;
                                        navigate(`/dashboard/${primeiroId}`);
                                    }
                                } catch (error) {
                                    console.error("Erro ao atualizar IA:", error);
                                    alert("Erro ao atualizar as análises da IA.");
                                }
                            }}
                            className="bg-white text-purple-600 border flex flex-row justify-center gap-2 border-purple-500 
                   text-center font-semibold py-2 px-6 rounded-md transition hover:bg-purple-50 w-full cursor-pointer"
                        >
                            <Wand2 /> Estastísticas com IA
                        </button>
                    </div>
                </div>

                <div className="hidden lg:flex overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white text-sm uppercase">
                                <th className="py-3 px-4 rounded-tl-xl  ">Nome</th>
                                <th className="py-3 px-4 border border-blue-400">
                                    Custo Médio (R$)
                                </th>
                                <th className="py-3 px-4 border border-blue-400">Quantidade</th>
                                <th className="py-3 px-4 border border-blue-400">
                                    Estoque Ideal
                                </th>
                                <th className="py-3 px-4 rounded-tr-xl">Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.length > 0 ? (
                                produtos.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border border-blue-200 hover:bg-blue-50 transition cursor-pointer"
                                        onClick={() => navigate(`/veritem/${item.id}`)}
                                    >
                                        <td className="py-3 px-4 font-medium border border-blue-100">
                                            {item.nome}
                                        </td>
                                        <td className="py-3 px-4  font-medium border border-blue-100  ">
                                            {stocks[item.id]
                                                ? formatarPreco(stocks[item.id].custo_medio)
                                                : "Carregando..."}
                                        </td>
                                        <td className="py-3 px-4  font-medium border border-blue-100 ">
                                            {stocks[item.id]
                                                ? stocks[item.id].quantidade_disponivel
                                                : "Carregando..."}
                                        </td>

                                        <td className="py-3 px-4  font-medium border border-blue-100">
                                            {stockIdeal[item.id]
                                                ? transfomaInt(stockIdeal[item.id].estoque_ideal)
                                                : "-"}
                                        </td>
                                        <td className="py-3 px-4 font-medium border border-blue-100">
                                            {item.categoria}
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-4 text-gray-500 italic"
                                    >
                                        Nenhum produto encontrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="grid lg:hidden grid-cols-1 w-full gap-4">
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
                        <p className="text-gray-500 w-full flex justify-center">Nenhum produto encontrado.</p>
                    )}
                </div>
                <a href="/additem">
                    <div className="fixed bottom-2 right-2 w-20 h-20 flex items-center justify-center rounded-full bg-blue-500 ">
                        <span className="text-white">
                            <Plus size={38} />
                        </span>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Produtos;