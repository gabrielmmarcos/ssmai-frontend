import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ResponseAPI from "../../components/responseapi";

function Cadastro() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [ramo, setRamo] = useState("");
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [responseTitle, setResponseTitle] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            const body = {
                nome: nome,
                ramo: ramo,
                email: email,
            };

            const response = await api.post("/enterpryse/", body);
            const senhaGerada = response.data.user_admin.password;

            setResponseTitle("Empresa cadastrada com sucesso!");
            setResponseMessage(
                `A senha da sua empresa é: ${senhaGerada}.\n\nGuarde bem esta senha — ela não será mostrada novamente.`
            );
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao cadastrar empresa:", error);
            setResponseTitle("Erro");
            setResponseMessage("Não foi possível cadastrar a empresa. Tente novamente.");
            setShowModal(true);
        }
    };

    return (
        <>
            <div className="flex flex-1 min-h-screen bg-gray-50 overflow-x-hidden">
                <div className="flex flex-col lg:flex-row-reverse w-full h-screen items-center justify-center bg-white">



                    {/* Formulário */}
                    <form
                        onSubmit={handleCadastro}
                        className="flex flex-col w-full  max-w-[700px] p-10 gap-3"
                    >
                        <h1 className="text-2xl lg:text-5xl font-bold text-blue-500 mb-2">
                            Cadastrar Empresa
                        </h1>
                        <p className="text-gray-600 mb-6 text-md">
                            Preencha os dados para criar sua conta empresarial
                        </p>

                        <div className="grid grid-cols-1 gap-y-4 pb-5">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase">Nome da Empresa</h3>
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Digite o nome da empresa"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase">Ramo da Empresa</h3>
                                <input
                                    type="text"
                                    value={ramo}
                                    onChange={(e) => setRamo(e.target.value)}
                                    placeholder="Ex: tecnologia, alimentos, serviços..."
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase">Email</h3>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Digite o email do administrador"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white text-center font-semibold py-2 rounded-md transition hover:bg-blue-600 cursor-pointer"
                            >
                                Criar Empresa
                            </button>

                            <a
                                onClick={() => navigate("/")}
                                className="text-center text-blue-500 hover:underline text-sm cursor-pointer"
                            >
                                Já tem conta? Faça login
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <ResponseAPI
                open={showModal}
                onClose={() => {
                    setShowModal(false);
                    navigate("/");
                }}
                title={responseTitle}
                message={responseMessage}
            />
        </>
    );
}

export default Cadastro;
