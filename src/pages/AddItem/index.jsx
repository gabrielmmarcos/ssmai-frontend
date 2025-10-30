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
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            alert("Erro ao salvar o produto. Veja o console.");
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
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao enviar o arquivo CSV:", error);
            alert("Erro ao enviar o arquivo CSV. Veja o console.");
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

                        {/* Botão + input de upload direto */}
                        <div className="mt-3">
                            <label
                                htmlFor="csvInput"
                                className="cursor-pointer bg-green-500 text-white font-semibold py-2 px-4 rounded-md transition hover:bg-green-600 flex items-center justify-center gap-2"
                            >
                                Adicionar Estoque Completo
                            </label>

                            <span
                                title="O arquivo deve ser CSV com as colunas: id, categoria, created_at, updated_at, nome, id_empresas"
                                className="cursor-pointer text-white bg-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-green-700"
                            >
                                i
                            </span>
                            <input
                                type="file"
                                id="csvInput"
                                accept=".csv"
                                onChange={handleCsvUpload}
                                className="hidden"
                            />

                            {/* Info sobre o CSV */}
                            {/* <p className="flex items-start text-gray-500 text-sm mt-2 gap-1">
                                <Info size={16} className="text-blue-500 mt-0.5" />
                                O arquivo deve ser <b>CSV</b> e conter as colunas:
                                <br />
                                <code className="text-gray-700">id, categoria, created_at, updated_at, nome, id_empresas</code>
                            </p> */}
                        </div>

                        <ResponseAPI
                            open={showModal}
                            onClose={() => {
                                setShowModal(false);
                                navigate("/estoque");
                            }}
                            title="Sucesso!"
                            message="Operação concluída com sucesso!"
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
