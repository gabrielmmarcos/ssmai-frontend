function Login() {
  return (
    <div className="flex w-screen h-screen items-center justify-center bg-white">

      <div className="flex flex-col w-1/2 max-w-md p-10">
        <h1 className="text-5xl font-bold text-blue-500 mb-2">Bem vindo!</h1>
        <p className="text-gray-600 mb-6 text-xl">Faça login para continuar</p>


        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>



        <a href="/home" className="bg-blue-500 text-white text-center  font-semibold py-2 rounded-md transition">
          <button className="" >
            Entrar
          </button>
        </a>

      </div>


      <div className="bg-blue-500  rounded-lg shadow-lg  min-h-[80%] flex flex-col items-center justify-center p-5">
        <h2 className="text-white text-5xl text-center font-bold">SSMAI</h2>
        <p className="text-white text-2xl text-center font-semibold">Seu sistema de Estoque com IA!</p>
      </div>
    </div>

  );
}

export default Login;
