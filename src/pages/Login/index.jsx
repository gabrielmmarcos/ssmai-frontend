import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ResponseAPI from "../../components/responseapi";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [responseTitle, setResponseTitle] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Faz login no backend FastAPI
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/jwt/login", formData);

      // Salva o token no navegador
      localStorage.setItem("token", response.data.access_token);
      console.log(localStorage.getItem("token"));
      console.log("token: ", response.data.access_token)
      navigate("/home");


    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setResponseTitle("Erro");
      setResponseMessage("Email ou senha inválidos.");
      setShowModal(true);
    }
  };

  // 👇 O return deve ficar AQUI, fora do handleLogin
  return (
    <>
      <div className="flex flex-1 min-h-screen bg-gray-50 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row-reverse w-full h-screen items-center justify-center bg-white">

          {/* Bloco azul */}
          <div className="flex bg-blue-500 rounded-lg w-96 min-h-[40%] lg:min-h-[80%] items-center justify-center p-5">
            <h2 className="text-white text-5xl text-center font-bold">SSMAI</h2>
          </div>

          {/* Formulário */}
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-full lg:w-1/2 max-w-md p-10 gap-3"
          >
            <h1 className="text-3xl lg:text-5xl font-bold text-blue-500 mb-2">
              Bem-vindo!
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Faça login para continuar
            </p>

            <div className="grid grid-cols-1 gap-y-4 pb-5">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Email
                </h3>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Senha
                </h3>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
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
                Entrar
              </button>

              <a
                href="#"
                className="text-center text-blue-500 hover:underline text-sm"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </form>
        </div>
      </div>

      <ResponseAPI
        open={showModal}
        onClose={() => setShowModal(false)}
        title={responseTitle}
        message={responseMessage}
      />
    </>
  );
}

export default Login;
