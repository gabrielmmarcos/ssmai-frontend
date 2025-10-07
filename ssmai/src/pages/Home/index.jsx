import Navbar from "../../componets/navbar";





function Home() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center  min-h-screen ml-[230px]">
        {/* Container principal */}
        <div className="flex flex-col md:flex-row items-center gap-40">
          {/* Texto */}
          <div className="text-left w-1/2" >
            <p className="text-red-600 text-xl font-semibold">Bem Vindo,</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Deuzimar <br />
              <span className="block text-right"> Santana</span>
            </h1>
            <p className="text-gray-700 mt-4 text-lg">
              Seu Cargo Atual é de <span className="font-semibold">Bibliotecário</span>
            </p>

            <button className="mt-6 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
              Funções Bibliotecário
            </button>
          </div>

          {/* Imagem */}
          <div className="w-1/2">


          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
