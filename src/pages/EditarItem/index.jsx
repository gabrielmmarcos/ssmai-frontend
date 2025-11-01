import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import ResponseAPI from "../../components/responseapi";
import { Camera } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

function EditarItem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMassage, setResponseMassage] = useState("");

    const [produto, setProduto] = useState({ nome: "", categoria: "" });

    useEffect(() => {
        async function carregarProduto() {
            try {
                // Busca todos os produtos da empresa do usuário
                const response = await api.get(`/products/all_by_user_enterpryse?offset=0&limit=100`);
                const produtos = response.data.products;

                // Procura o produto com o id específico
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

    //put produtos
    const handleSalvar = async () => {
        try {
            await api.put(`/products/${id}`, produto);
            setResponseTitle("Sucesso!")
            setResponseMassage("Produto Editado com Sucesso!")
            setShowModal(true);

        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            setResponseTitle("Erro!")
            setResponseMassage("Erro ao Editar o Produto!")
            setShowModal(true);
        }
    };

    //get placeholder


    return (
        <>
            <div className="flex w-full ">
                <Navbar />

                <div className="flex flex-1 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">
                    <div className="flex flex-col lg:flex-row w-full h-screen items-center justify-center bg-white">

                        <div className="flex flex-col w-full lg:w-1/2 max-w-md p-10 gap-2">
                            <h1 className="text-5xl font-bold text-blue-500 mb-2">
                                Editar
                            </h1>

                            <div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={produto.nome}
                                        onChange={(e) =>
                                            setProduto({
                                                ...produto,
                                                nome: e.target.value,
                                            })
                                        }
                                        placeholder="Nome"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={produto.categoria}
                                        onChange={(e) =>
                                            setProduto({
                                                ...produto,
                                                categoria: e.target.value,
                                            })
                                        }
                                        placeholder="Categoria"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex-col flex gap-2">
                                <button
                                    onClick={handleSalvar}
                                    className="bg-blue-500 text-white text-center font-semibold py-2 rounded-md transition cursor-pointer"
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ResponseAPI
                open={showModal}
                onClose={() => {
                    setShowModal(false);

                    navigate(`/veritem/${id}`);
                }}
                title={responseTitle}
                message={responseMassage}
            />
        </>
    );
}

export default EditarItem;
