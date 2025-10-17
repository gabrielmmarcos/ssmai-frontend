import React, { useState } from "react";
import Navbar from "../../components/navbar";
import { Camera, Plus } from "lucide-react";

function ItensDetalhes() {
    const [entradas, setEntradas] = useState([
        { id: 1, quantidade: 50, data: "2025-10-08" },
    ]);
    const [saidas, setSaidas] = useState([
        { id: 1, quantidade: 20, data: "2025-10-08" },
    ]);
    const [modalAberto, setModalAberto] = useState(false);
    const [tipo, setTipo] = useState(""); // "entrada" ou "saida"
    const [quantidadeInput, setQuantidadeInput] = useState("");

    const handleAdd = () => {
        const q = parseInt(quantidadeInput, 10);
        if (!q || q <= 0) return;

        const novoRegistro = {
            id: Date.now(),
            quantidade: q,
            data: new Date().toISOString().split("T")[0],
        };

        if (tipo === "entrada") {
            setEntradas((prev) => [...prev, novoRegistro]);
        } else {
            setSaidas((prev) => [...prev, novoRegistro]);
        }

        setModalAberto(false);
        setQuantidadeInput("");
    };

    const maxLen = Math.max(entradas.length, saidas.length);

    return (
        <>
            <div className="flex w-full">
                <Navbar />

                <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">
                    <div className="flex flex-col w-full h-fit items-center justify-center gap-2 lg:gap-20 bg-white py-10 px-6 lg:px-12">


                        <div className="flex flex-col lg:flex-row-reverse w-full lg:max-w-[1000px] justify-center items-center gap-8 pt-10 lg:pt-0 ">
                            {/* Imagem do produto */}
                            <div className="flex bg-blue-200 rounded-lg w-full lg:w-96 h-44 lg:h-80 items-center justify-center p-5">
                                <Camera size={64} className="text-blue-600" />
                            </div>

                            {/* Infos do produto ) */}
                            <div className="flex flex-col w-full lg:w-1/2 max-w-md p-0 gap-4">
                                <h1 className="text-3xl font-bold text-blue-500 mb-1">
                                    Sabonete Antibacteriano
                                </h1>

                                <div className="grid grid-cols-2 gap-y-4 pb-5">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Custo</h3>
                                        <p className="text-lg text-gray-800">R$ 4,99</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Quantidade</h3>
                                        <p className="text-lg text-gray-800">120 unidades</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Quantidade Ideal</h3>
                                        <p className="text-lg text-gray-800">150 unidades</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase">Categoria</h3>
                                        <p className="text-lg text-gray-800">Higiene</p>
                                    </div>
                                </div>

                                {/* Botões */}
                                <div className="flex-col flex gap-2">
                                    <a
                                        href="/editaritem"
                                        className="bg-blue-500 text-white text-center font-semibold py-2 rounded-md transition"
                                    >
                                        Editar
                                    </a>
                                    <a
                                        href="/#"
                                        className="bg-red-500 text-white text-center font-semibold py-2 rounded-md transition"
                                    >
                                        Remover
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Tabela de ENTRADAS / SAÍDAS */}
                        <div className="w-full mt-8">
                            <div className="flex flex-col lg:flex-row items-center justify-start gap-5 lg:justify-between mb-4">
                                <h2 className="text-2xl font-bold text-blue-600">Histórico de Movimentações</h2>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setTipo("entrada");
                                            setQuantidadeInput("");
                                            setModalAberto(true);
                                        }}
                                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                    >
                                        <Plus size={16} /> Adicionar Entrada
                                    </button>

                                    <button
                                        onClick={() => {
                                            setTipo("saida");
                                            setQuantidadeInput("");
                                            setModalAberto(true);
                                        }}
                                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                    >
                                        <Plus size={16} /> Adicionar Saída
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-blue-500 text-white text-sm uppercase">
                                            <th className="py-3 px-4 text-center rounded-tl-lg">Entradas (und.)</th>
                                            <th className="py-3 px-4 text-center rounded-tr-lg">Saídas (und.)</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Array.from({ length: maxLen }).map((_, i) => {
                                            const e = entradas[i];
                                            const s = saidas[i];
                                            return (
                                                <tr key={i} className="border-t border-gray-100 hover:bg-blue-50 transition">
                                                    <td className="py-3 px-4 text-center align-top">
                                                        {e ? (
                                                            <>
                                                                <p className="font-semibold text-green-700">+ {e.quantidade} und.</p>
                                                                <p className="text-xs text-gray-500">{e.data}</p>
                                                            </>
                                                        ) : (
                                                            <span className="text-gray-400">—</span>
                                                        )}
                                                    </td>

                                                    <td className="py-3 px-4 text-center align-top">
                                                        {s ? (
                                                            <>
                                                                <p className="font-semibold text-red-700">- {s.quantidade} und.</p>
                                                                <p className="text-xs text-gray-500">{s.data}</p>
                                                            </>
                                                        ) : (
                                                            <span className="text-gray-400">—</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {maxLen === 0 && (
                                            <tr>
                                                <td colSpan={2} className="py-6 text-center text-gray-500">Nenhuma movimentação</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div >

            {/* MODAL (com fundo cinza claro) */}
            {
                modalAberto && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-white/70 bg-opacity-60" />

                        <div className="relative bg-white rounded-xl p-6 w-80 shadow-lg z-10">
                            <h2 className="text-lg font-bold text-blue-600 mb-3">
                                Adicionar {tipo === "entrada" ? "Entrada" : "Saída"}
                            </h2>

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
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                                >
                                    Salvar
                                </button>
                                <button
                                    onClick={() => setModalAberto(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                                >
                                    Cancelar
                                </button>

                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default ItensDetalhes;
