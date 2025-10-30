import Navbar from "../../components/navbar";
import ResponseAPI from "../../components/responseapi";
import ConfirmModal from "../../components/confirmModal";
import { useParams } from "react-router-dom";
import { Camera, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import api from "../../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ItensDetalhes() {
    const { id } = useParams(); //id da URL
    const navigate = useNavigate(); // Router

    //states 
    // const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [produto, setProduto] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [tipo, setTipo] = useState("entrada");
    const [quantidadeInput, setQuantidadeInput] = useState("");
    const [precoInput, setPrecoInput] = useState("");
    const [stock, setStock] = useState(null);
    const [responseOpen, setResponseOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [responseTitle, setTitle] = useState("");



    //api get nome/categoria
    useEffect(() => {
        async function carregarProduto() {
            try {
                const response = await api.get(`/products/all_by_user_enterpryse`);
                const produtos = response.data.products;
                const produtoEncontrado = produtos.find((p) => p.id === Number(id));
                if (produtoEncontrado) {
                    setProduto(produtoEncontrado);
                } else {
                    console.warn("Produto não encontrado com o ID:", id);
                }
            } catch (error) {
                console.error("Erro ao carregar produto:", error);
            }
        }

        carregarProduto();
    }, [id]);


    //api get custo/quantidade
    const getStock = useCallback(async () => {
        try {
            const response = await api.get(`/stock/${id}`);
            const { custo_medio, quantidade_disponivel } = response.data;
            setStock({ custo_medio, quantidade_disponivel });
        } catch (error) {
            console.error("Erro ao carregar estoque:", error);
        }
    }, [id]);

    // 
    useEffect(() => {
        getStock();
    }, [getStock]);

    //formata preco
    const formatarPreco = (valor) => {
        if (valor === null || valor === undefined) return "-";
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    //api para deletar prodtuto
    const handleDelete = async () => {
        try {
            await api.delete(`/products/${id}`);
            setResponseMessage("Produto removido com sucesso!");
            setResponseOpen(true);
        } catch (error) {
            console.error("Erro ao remover produto:", error);
            setResponseMessage("Erro ao remover produto.");
            setResponseOpen(true);
        }
    };


    // api get movimentaaoes
    const buscarMovimentacoes = useCallback(async () => {
        const res = await api.get(`/stock/moviments/${id}`);
        setMovimentacoes(res.data.products);
    }, [id]);

    // recarrega movimentacoes
    useEffect(() => {
        buscarMovimentacoes();
    }, [buscarMovimentacoes]);

    const token = localStorage.getItem("token");

    // api post entrada/saida movimentacao
    const handleAdd = async () => {
        if (!quantidadeInput || (tipo === "entrada" && !precoInput)) {
            setResponseMessage("Informe preço e quantidade!");
            setResponseOpen(true);
            return;
        }

        try {
            const endpoint =
                tipo === "entrada"
                    ? `http://localhost:8000/stock/entry/${id}`
                    : `http://localhost:8000/stock/exit/${id}`;

            const body =
                tipo === "entrada"
                    ? {
                        id: id,
                        quantidade: Number(quantidadeInput),
                        preco_und: Number(precoInput),
                    }
                    : {
                        id: id,
                        quantidade: Number(quantidadeInput),
                    };

            await axios.post(endpoint, body, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setModalAberto(false);
            setQuantidadeInput("");
            setPrecoInput("");

            await buscarMovimentacoes();
            await getStock();

            setTitle("Sucesso!");
            setResponseMessage(
                tipo === "entrada"
                    ? "Entrada registrada com sucesso!"
                    : "Saída registrada com sucesso!"
            );
            setResponseOpen(true);
        } catch (error) {
            console.error("Erro ao adicionar movimentação:", error);
            setTitle("Erro!");
            setResponseMessage("Erro ao adicionar movimentação.");
            setResponseOpen(true);
        }
    };







    return (
        <>
            <div className="flex w-full">
                <Navbar />

                <div className="flex flex-1 flex-col items-center justify-start min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52 py-10 px-6 lg:px-12">

                    {/*Seção do Produto*/}
                    <div className="flex flex-col lg:flex-row-reverse w-full lg:max-w-[1000px] justify-center items-center gap-8 pb-10 border-b border-gray-200">
                        {/* Imagem do produto */}
                        <div className="flex bg-blue-200 rounded-lg w-full lg:w-96 h-44 lg:h-80 items-center justify-center p-5">
                            <Camera size={64} className="text-blue-600" />
                        </div>

                        {/* Infos do produto */}
                        <div className="flex flex-col w-full lg:w-1/2 max-w-md p-0 gap-4">
                            <h1 className="text-3xl font-bold text-blue-500 mb-1">
                                {produto ? produto.nome : "Carregando..."}
                            </h1>


                            <div className="grid grid-cols-2 gap-y-4 pb-5">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Custo médio</h3>
                                    <p className="text-lg text-gray-800">
                                        {stock ? formatarPreco(stock.custo_medio) : "Carregando..."}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Quantidade</h3>
                                    <p className="text-lg text-gray-800">
                                        {stock ? stock.quantidade_disponivel : "Carregando..."}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Quantidade Ideal</h3>
                                    <p className="text-lg text-gray-800"> - </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Categoria</h3>
                                    <p className="text-lg text-gray-800">
                                        {produto ? produto.categoria : "Carregando..."}
                                    </p>
                                </div>
                            </div>


                            {/* Botões */}
                            <div className="flex-col flex gap-2">
                                <a
                                    href={`/editaritem/${id}`}
                                    className="bg-blue-500 text-white text-center font-semibold py-2 rounded-md transition cursor-pointer"
                                >
                                    Editar
                                </a>
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                                >
                                    Remover Produto
                                </button>

                            </div>
                        </div>
                    </div>

                    {/*Seção da Tabela Moviementacoes*/}
                    <div className="w-full flex flex-col items-center mt-8">
                        <h2 className="text-3xl font-bold text-blue-600 mb-6">
                            Histórico de Movimentações
                        </h2>

                        {/* Botões */}
                        <div className="flex gap-3 mb-5">
                            <button
                                onClick={() => {
                                    setTipo("entrada");
                                    setModalAberto(true);
                                }}
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md transition cursor-pointer"
                            >
                                <Plus size={16} /> Adicionar Entrada
                            </button>

                            <button
                                onClick={() => {
                                    setTipo("saida");
                                    setModalAberto(true);
                                }}
                                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md transition cursor-pointer"
                            >
                                <Plus size={16} /> Adicionar Saída
                            </button>
                        </div>

                        {/* Tabela */}
                        <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm w-full lg:w-3/4">
                            <table className="w-full text-left ">
                                <thead>
                                    <tr className="bg-blue-500 text-white text-sm uppercase">
                                        <th className="py-3 px-4 border border-blue-400 text-center rounded-tl-lg">
                                            Entrada/Saída
                                        </th>
                                        <th className="py-3 px-4 border border-blue-400 text-center">
                                            Quantidade
                                        </th>
                                        <th className="py-3 px-4 border border-blue-400 text-center">
                                            Preço
                                        </th>
                                        <th className="py-3 px-4 border border-blue-400 text-center">
                                            Data
                                        </th>
                                        <th className="py-3 px-4 border border-blue-400 text-center rounded-tr-lg">
                                            Horário
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {movimentacoes.length > 0 ? (
                                        [...movimentacoes].reverse().map((m, i) => {
                                            // Funções auxiliares para formatar data e hora
                                            const d = new Date(m.date);
                                            //gambiarra para fuso horario
                                            d.setHours(d.getHours() - 3);

                                            const dataFormatada = d.toLocaleDateString("pt-BR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            });
                                            const horaFormatada = d.toLocaleTimeString("pt-BR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",


                                            });

                                            return (
                                                <tr
                                                    key={i}
                                                    className="border border-blue-200 hover:bg-blue-50 transition"
                                                >
                                                    <td
                                                        className={`py-3 px-4 text-center font-semibold " ${m.tipo === "Entrada" ? "text-green-700" : "text-red-700"
                                                            }`}
                                                    >
                                                        {m.tipo}
                                                    </td>

                                                    <td className="py-3 px-4 text-center border border-blue-100">{m.quantidade} und.</td>


                                                    <td className="py-3 px-4 text-center border border-blue-100">
                                                        {m.tipo === "Entrada"
                                                            ? `R$ ${m.preco_und?.toFixed(2).replace(".", ",")}`
                                                            : "–"}
                                                    </td>


                                                    <td className="py-3 px-4 text-center text-sm text-gray-600 border border-blue-100">
                                                        {dataFormatada}
                                                    </td>


                                                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                                                        {horaFormatada}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-gray-500">
                                                Nenhuma movimentação registrada.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL - Movimentacoes */}
            {modalAberto && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative bg-white rounded-xl p-6 w-80 shadow-lg z-10">
                        <h2 className="text-lg font-bold text-blue-600 mb-3">
                            Adicionar {tipo === "entrada" ? "Entrada" : "Saída"}
                        </h2>

                        {tipo === "entrada" && (
                            <input
                                type="number"
                                placeholder="Preço (R$)"
                                value={precoInput}
                                onChange={(e) => setPrecoInput(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        )}

                        <input
                            type="number"
                            placeholder="Quantidade (und.)"
                            value={quantidadeInput}
                            onChange={(e) => setQuantidadeInput(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <div className="flex justify-between">
                            <button
                                onClick={handleAdd}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
                            >
                                Salvar
                            </button>
                            <button
                                onClick={() => setModalAberto(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition cursor-pointer"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL - Confirmar remoção */}
            <ConfirmModal
                open={showConfirm}
                onConfirm={() => {
                    setShowConfirm(false);
                    handleDelete();
                    navigate("/estoque");
                }}
                onCancel={() => setShowConfirm(false)}
            />
            {/* MODAL - Removel com sucesso */}
            {/* <ResponseAPI
                open={responseOpen}
                onClose={() => {
                    setResponseOpen(false);
                    navigate("/");
                }}
                message={responseMessage}
            /> */}


            {/* MODAL - Erro na movimentacao  */}
            <ResponseAPI
                open={responseOpen}
                onClose={() => setResponseOpen(false)}
                title={responseTitle}
                message={responseMessage}
            />

        </>
    );
}

export default ItensDetalhes;
