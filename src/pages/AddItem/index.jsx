import React, { useState } from "react";
import Navbar from "../../components/navbar";
import ResponseAPI from "../../components/responseapi";
import { Camera } from "lucide-react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

function AddItem() {
    const navigate = useNavigate();

    //states
    const [formData, setFormData] = useState({
        nome: "",
        categoria: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [showImageChoiceModal, setShowImageChoiceModal] = useState(false);
    //post produto
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
            setResponseTitle("Sucesso!");
            setResponseMessage("Produto criado com sucesso!");
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            setResponseTitle("Erro");
            setResponseMessage("Erro na criação do produto.");
            setShowModal(true);
        }
    };
    //post csv estoque completo
    const handleCsvUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append("csv_file", file);

        try {
            const response = await api.post("/products/insert_batch", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response)
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
    // post upload img
    const handleImageUpload = async (file) => {
        if (!file) return;

        const data = new FormData();
        data.append("file", file);

        try {
            // envia a img para o retornar o id
            const extractResponse = await api.post("/products/extract_text_from_document/fake", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const idExtract = extractResponse.data.id;

            // post no id da img
            const aiResponse = await api.post(`/products/generate_product_by_ai_with_extract_id/${idExtract}`);

            // retornar nome categoria
            setFormData({
                nome: aiResponse.data.nome || "",
                categoria: aiResponse.data.categoria || "",
            });

            setResponseTitle("Sucesso!");
            setResponseMessage("Informações preenchidas automaticamente!");
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao processar imagem:", error);
            setResponseTitle("Erro");
            setResponseMessage("Falha ao processar imagem. Tente novamente.");
            setShowModal(true);
        }
    };

    // ativa camera
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) handleImageUpload(file);
        setShowImageChoiceModal(false);
    };

    return (
        <div className="flex w-full">
            <Navbar />

            <div className="flex flex-1 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">
                <div className="flex flex-col lg:flex-row w-full h-screen items-center justify-center bg-white">
                    {/* forms nome/categoria */}
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
                        <div className="hidden mt-3 md:flex items-center justify-center w-full">
                            <label htmlFor="csvInput"
                                className="relative cursor-pointer w-full bg-green-500
                              text-white font-semibold py-2 px-4 rounded-md transition flex items-center 
                              justify-center" >
                                <div className="absolute left-3 flex items-center">
                                    <span className="cursor-pointer text-white bg-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-green-700 peer">
                                        i </span>
                                    <div className="absolute right-6 top-1/2 translate-y-1/2 w-60 bg-white text-gray-700 text-center text-sm rounded-md shadow-lg opacity-0 peer-hover:opacity-100 transition-opacity duration-200 p-2 z-10">
                                        O arquivo deve ser CSV com as colunas:
                                        <br />
                                        <strong>id, categoria, created_at, updated_at, nome, id_empresas</strong>
                                    </div> </div>  Adicionar Estoque Completo
                            </label>
                            <input type="file" id="csvInput" accept=".csv" onChange={handleCsvUpload} className="hidden" />
                        </div>

                        {/* Modal de sucesso/erro */}
                        <ResponseAPI
                            open={showModal}
                            onClose={() => {
                                setShowModal(false);
                                navigate("/estoque");
                            }}
                            title={responseTitle}
                            message={responseMessage}
                        />

                        {/* Botão add via foto */}
                        <div className="mt-3 flex items-center justify-center w-full cursor-pointer">
                            <button
                                type="button"
                                onClick={() => setShowImageChoiceModal(true)}
                                className="bg-white text-blue-500 border flex flex-row justify-center gap-2 border-blue-500 text-center font-semibold py-2 rounded-md transition hover:bg-blue-50 w-full cursor-pointer"
                            >
                                <Camera />  Adicionar com a Câmera
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/*Modal camera ou arquivo */}
            {showImageChoiceModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Como deseja adicionar?</h2>
                        <div className="flex flex-col gap-3">
                            <label
                                htmlFor="cameraInput"
                                className=" cursor-pointer bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                            >
                                Tirar Foto com a Câmera
                            </label>
                            <input
                                type="file"
                                id="cameraInput"
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition"
                            >
                                Escolher da Galeria
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            <button
                                onClick={() => setShowImageChoiceModal(false)}
                                className="mt-2 text-red-500 hover:underline cursor-pointer"
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddItem;
