import React, { useState } from "react";
import Navbar from "../../components/navbar";
import ResponseAPI from "../../components/responseapi";
import { Wand2 } from "lucide-react";
import api from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";

function AddItemIA() {
    const navigate = useNavigate();
    const location = useLocation();

    // Dados recebidos da IA
    const aiData = location.state?.aiData || {
        nome: "",
        categoria: "",
        custo_und: 0,
        quantidade: 0,
    };

    // States principais
    const [formData, setFormData] = useState(aiData);
    const [showModal, setShowModal] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [canEdit, setCanEdit] = useState(false);
    const [addEntry, setAddEntry] = useState(false);
    const [createdProductId, setCreatedProductId] = useState(null);

    // Atualiza inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Cria produto (e se checkbox marcada, adiciona entrada)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Cria o produto
            const response = await api.post("/products/", formData);
            const produtoCriado = response.data;
            const produtoId = produtoCriado.id;
            setCreatedProductId(produtoId);

            console.log("Produto criado:", produtoCriado, createdProductId);

            // Se marcar "Add entrada", chama o endpoint /stock/entry/:id
            if (addEntry) {
                try {
                    const body = {
                        id: produtoId,
                        quantidade: Number(formData.quantidade),
                        preco_und: Number(formData.custo_und),
                    };

                    await api.post(`/stock/entry/${produtoId}`, body);
                    console.log("Entrada registrada:", body);
                } catch (err) {
                    console.error("Erro ao adicionar entrada:", err);
                    setResponseTitle("Erro!");
                    setResponseMessage("Produto criado, mas falha ao adicionar entrada.");
                    setShowModal(true);
                    return;
                }
            }

            setResponseTitle("Sucesso!");
            setResponseMessage(
                addEntry
                    ? "Produto criado e entrada adicionada com sucesso!"
                    : "Produto criado com sucesso!"
            );
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            setResponseTitle("Erro!");
            setResponseMessage("Erro ao criar produto. Tente novamente.");
            setShowModal(true);
        }
    };

    return (
        <div className="flex w-full">
            <Navbar />

            <div className="flex flex-1 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">
                <div className="flex flex-col w-full h-screen items-center justify-center bg-white">
                    <h1 className="text-3xl lg:text-5xl font-bold text-blue-500 mb-4">
                        Revisar Informações
                    </h1>

                    {/* Checkboxes */}
                    <div className="flex flex-row gap-4 mb-4 items-center w-full justify-center">
                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                            <input
                                type="checkbox"
                                checked={canEdit}
                                onChange={(e) => setCanEdit(e.target.checked)}
                            />
                            Editar Campos
                        </label>

                        <label className="flex items-center gap-2 text-gray-700 font-medium">
                            <input
                                type="checkbox"
                                checked={addEntry}
                                onChange={(e) => setAddEntry(e.target.checked)}
                            />
                            Adicionar Entrada
                        </label>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full lg:w-1/2 max-w-md p-10 gap-3"
                    >
                        <h3 className="text-sm" >Nome:</h3>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Ex: Bolo"
                            value={formData.nome}
                            onChange={handleChange}
                            disabled={!canEdit}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring-2 focus:ring-blue-500 ${!canEdit ? "bg-gray-100 cursor-not-allowed" : ""
                                }`}
                            required
                        />
                        <h3 className="text-sm" >Categoria:</h3>
                        <input
                            type="text"
                            name="categoria"
                            placeholder="Ex: Alimentação"
                            value={formData.categoria}
                            onChange={handleChange}
                            disabled={!canEdit}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring-2 focus:ring-blue-500 ${!canEdit ? "bg-gray-100 cursor-not-allowed" : ""
                                }`}
                            required
                        />
                        <h3 className="text-sm" >Custo Unitário:</h3>
                        <input
                            type="number"
                            name="custo_und"
                            placeholder="Ex: R$ 100"
                            value={formData.custo_und}
                            onChange={handleChange}
                            disabled={!canEdit}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring-2 focus:ring-blue-500 ${!canEdit ? "bg-gray-100 cursor-not-allowed" : ""
                                }`}

                        />
                        <h3 className="text-sm" >Quantidade:</h3>
                        <input
                            type="number"
                            name="quantidade"
                            placeholder="Ex: 1, 2, 3..."
                            value={formData.quantidade}
                            onChange={handleChange}
                            disabled={!canEdit}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                                focus:ring-2 focus:ring-blue-500 ${!canEdit ? "bg-gray-100 cursor-not-allowed" : ""
                                }`}

                        />

                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold py-2 rounded-md transition hover:bg-blue-700 cursor-pointer"
                        >
                            <div className="flex items-center justify-center gap-2">
                                Salvar Produto
                            </div>
                        </button>

                        <ResponseAPI
                            open={showModal}
                            onClose={() => {
                                setShowModal(false);
                                navigate("/estoque");
                            }}
                            title={responseTitle}
                            message={responseMessage}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddItemIA;
