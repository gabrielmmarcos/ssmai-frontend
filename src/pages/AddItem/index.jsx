import React, { useState } from "react";
import Navbar from "../../components/navbar";
import ResponseAPI from "../../components/responseapi";
import CameraDesktop from "../../components/opencamera";
import { Camera, Wand2 } from "lucide-react";
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
    const [fromCamera, setFromCamera] = useState(false)
    const [loading, setLoading] = useState(false);
    // const [streaming, setStreaming] = useState(false) - descontinuado
    // const videoRef = useRef(null);

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
            setFromCamera(false);
            setShowModal(true);

        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            setResponseTitle("Erro");
            setResponseMessage("Erro na criação do produto. Tente Novamente");
            setFromCamera(false);
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
    const handleImageUpload = async (fileimg) => {
        if (!fileimg) return;

        const data = new FormData();
        data.append("document", fileimg);

        try {
            setLoading(true);
            setShowModal(true);
            setResponseTitle("Processando...");
            setResponseMessage("Estamos lendo as informações da imagem, aguarde.");

            // Envia a imagem para o endpoint de extração
            const extractResponse = await api.post(
                "/products/extract_text_from_document/",
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const idExtract = extractResponse.data.id;
            console.log("ID da extração:", idExtract);

            // Gera o produto com IA
            const aiResponse = await api.post(
                `/products/generate_product_by_ai_with_extract_id/${idExtract}`
            );

            console.log("Dados retornados pela IA:", aiResponse.data);

            // Redireciona automaticamente para a tela /additemia com os dados retornados
            navigate("/additemia", { state: { aiData: aiResponse.data } });

            setLoading(false);
            setShowModal(false);
        } catch (error) {
            console.error("Erro ao processar imagem:", error);
            setLoading(false);
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
                <div className="flex flex-col  w-full h-screen items-center justify-center bg-white">
                    {/* forms nome/categoria */}
                    <h1 className="text-3xl lg:text-5xl font-bold text-blue-500 mb-2">
                        Adicionar Produto
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full lg:w-1/2 max-w-md p-10 gap-2"
                    >
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
                        <div className="mt-3 flex items-center justify-center w-full">
                            <label htmlFor="csvInput"
                                className="relative cursor-pointer text-sm md:text-[16px] w-full bg-green-500 hover:bg-green-600
                              text-white font-semibold py-2 px-4 rounded-md transition flex items-center 
                              justify-center" >
                                <div className="absolute left-3 flex items-center">
                                    <span className="cursor-pointer text-white bg-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-green-700 peer">
                                        i </span>
                                    <div className="absolute right-6 top-1/2 translate-y-1/2 w-80 bg-white border border-gray-300 text-blue-500 text-center text-sm rounded-md shadow-lg opacity-0 peer-hover:opacity-100 transition-opacity duration-200 p-2 z-10">
                                        O arquivo deve ser CSV com as colunas:
                                        <br />
                                        id, categoria, created_at, updated_at, nome, id_empresas
                                    </div> </div>  Adicionar Estoque Completo
                            </label>
                            <input type="file" id="csvInput" accept=".csv" onChange={handleCsvUpload} className="hidden" />
                        </div>

                        {/* Modal de sucesso/erro */}
                        <ResponseAPI
                            open={showModal}
                            loading={loading}
                            onClose={() => {
                                setShowModal(false);
                                if (fromCamera) {
                                    navigate("/additem");
                                    console.log("ta qui")
                                } else {
                                    navigate("/estoque");
                                }
                            }}
                            title={responseTitle}
                            message={responseMessage}
                        />


                        {/* Botão add via foto */}
                        <div className="mt-3 flex items-center justify-center w-full cursor-pointer">
                            <button
                                type="button"
                                onClick={() => setShowImageChoiceModal(true)}
                                className="bg-purple-500 text-white border flex flex-row justify-center gap-2 border-white
                   text-center font-semibold py-2 rounded-md transition hover:bg-purple-600 w-full cursor-pointer"
                            >
                                <Wand2 /> Adicionar com IA (Foto)
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

                            {/* Desktop: botão abrir câmera */}
                            {/* {window.innerWidth >= 1024 && !streaming ? (
                                <button
                                    onClick={async () => {
                                        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                                            alert("Seu navegador não suporta câmera ou só funciona via HTTPS");
                                            return;
                                        }
                                        try {
                                            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                                            videoRef.current.srcObject = stream;
                                            setStreaming(true); // mostra o vídeo
                                        } catch (err) {
                                            console.error(err);
                                            alert("Erro ao acessar a câmera");
                                        }
                                    }}
                                    className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                                >
                                    Abrir Câmera
                                </button>
                            ) : null} */}

                            {/* Vídeo desktop */}
                            {/* {streaming && (
                                <>
                                    <video ref={videoRef} autoPlay className="w-64 h-48 border rounded mb-2" />
                                    <button
                                        onClick={() => {
                                            const canvas = document.createElement("canvas");
                                            canvas.width = videoRef.current.videoWidth;
                                            canvas.height = videoRef.current.videoHeight;
                                            canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
                                            canvas.toBlob((blob) => {
                                                handleImageUpload(blob); // envia a foto
                                            }, "image/jpeg");

                                            // para a câmera
                                            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                                            setStreaming(false);
                                            setShowImageChoiceModal(false);
                                        }}
                                        className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                                    >
                                        Tirar Foto
                                    </button>
                                </>
                            )} */}


                            <>
                                <label
                                    htmlFor="cameraInput"
                                    className="lg:hidden flexcursor-pointer bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                                >
                                    Tirar Foto
                                </label>
                                <input
                                    type="file"
                                    id="cameraInput"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </>

                            {/* Galeria */}
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
