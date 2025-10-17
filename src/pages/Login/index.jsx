function Login() {
  return (
    <div className="flex flex-1 min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row-reverse w-full h-screen items-center justify-center bg-white">

        {/* Imagem / bloco azul */}
        <div className="flex bg-blue-500 rounded-lg w-96 min-h-[40%] lg:min-h-[80%] items-center justify-center p-5">
          <h2 className="text-white text-5xl text-center font-bold">SSMAI</h2>
        </div>

        {/* Formulário de Login */}
        <div className="flex flex-col w-full lg:w-1/2 max-w-md p-10 gap-3">
          <h1 className="text-3xl lg:text-5xl font-bold text-blue-500 mb-2">Bem-vindo!</h1>
          <p className="text-gray-600 mb-6 text-lg">Faça login para continuar</p>

          <div className="grid grid-cols-1 gap-y-4 pb-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Email</h3>
              <input
                type="email"
                placeholder="Digite seu email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Senha</h3>
              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="/home"
              className="bg-blue-500 text-white text-center font-semibold py-2 rounded-md transition hover:bg-blue-600"
            >
              Entrar
            </a>
            <a
              href="#"
              className="text-center text-blue-500 hover:underline text-sm"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      </div>
    </div>



  );
}

export default Login;
