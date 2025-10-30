import React, { useState } from "react";
import Navbar from "../../components/navbar";
import ResponseAPI from "../../components/responseapi";
import { Camera, Info } from "lucide-react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

function AddItem() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: "",
        categoria: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    // const [csvFile, setCsvFile] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const produto = {
                nome: formData.nome,
                categoria: formData.categoria,
            };

            const response = await api.post("/products/", produto);
            console.log("Produto criado:", response.data);
            setResponseTitle("Sucesso!")
            setResponseMessage("Produto criado com sucesso ")
            setShowModal(true);

        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            setResponseTitle("Erro")
            setResponseMessage("Erro na criação do Produto")
            setShowModal(true);
        }
    };

    // Upload de CSV
    const handleCsvUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // setCsvFile(file);

        const data = new FormData();
        data.append("csv_file", file);

        try {
            const response = await api.post("/products/insert_batch", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Upload concluído:", response.data);
            setResponseTitle("Sucesso");
            setResponseMessage("CSV enviado com sucesso!");
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao enviar o arquivo CSV:", error);
            setResponseTitle("Erro");
            setResponseMessage("Arquivo CSV inválido.");
            setShowModal(true);
        }
    };

    return (
        <div className="flex w-full">
            <Navbar />

            <div className="flex flex-1 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">
                <div className="flex flex-col lg:flex-row w-full h-screen items-center justify-center bg-white">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full lg:w-1/2 max-w-md p-10 gap-2"
                    >
                        <h1 className="text-3xl lg:text-5xl font-bold text-blue-500 mb-2">
                            Adicionar Item
                        </h1>

                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            required
                        />

                        <input
                            type="text"
                            name="categoria"
                            placeholder="Categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-blue-500 text-white text-center font-semibold py-2 rounded-md transition hover:bg-blue-600 cursor-pointer"
                        >
                            Salvar
                        </button>

                        {/* Botão carregar estoque */}
                        <div className="mt-3 flex items-center justify-center w-full cursor-pointer">
                            <label
                                htmlFor="csvInput"
                                className=" cursor-pointer w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md transition  flex items-center justify-center"
                            >
                                Adicionar Estoque Completo
                            </label>

                            {/* Ícone "i" com tooltip */}
                            <div className="relative ml-2">
                                <span className=" cursor-pointer text-white bg-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-green-700 peer">
                                    i
                                </span>

                                {/* Tooltip → aparece apenas no hover do "i" */}
                                <div className="absolute right-1/2 translate-x-1/2 mt-2 w-60 bg-white text-gray-700 text-center text-sm rounded-md shadow-lg opacity-0 peer-hover:opacity-100 transition-opacity duration-200 p-2 z-10">
                                    O arquivo deve ser CSV com as colunas:<br />
                                    <strong>id, categoria, created_at, updated_at, nome, id_empresas</strong>
                                </div>
                            </div>


                            <input
                                type="file"
                                id="csvInput"
                                accept=".csv"
                                onChange={handleCsvUpload}
                                className="hidden"
                            />
                        </div>


                        <ResponseAPI
                            open={showModal}
                            onClose={() => {
                                setShowModal(false);
                                navigate("/estoque");
                            }}
                            title={responseTitle}
                            message={responseMessage}
                        />

                        <button
                            type="button"
                            className="lg:hidden bg-white text-blue-500 border flex flex-row justify-center gap-2 border-blue-500 text-center font-semibold py-2 rounded-md transition hover:bg-blue-50"
                        >
                            Adicionar com a Câmera <Camera />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddItem;
