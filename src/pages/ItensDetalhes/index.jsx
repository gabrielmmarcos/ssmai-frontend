import React from "react";
import Navbar from "../../components/navbar";
import { Camera } from "lucide-react";


function ItensDetalhes() {


    return (
        <>
            <div className="flex w-full ">

                <Navbar />
                {/* Container principal */}
                <div className="flex flex-1  min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52  ">
                    <div className=" flex flex-col lg:flex-row   w-full h-screen items-center justify-center bg-white">
                        <div className="flex bg-blue-200  rounded-lg w-96 min-h-[40%] lg:min-h-[80%] items-center justify-center p-5">
                            <Camera />
                        </div>
                        <div className="flex flex-col w-full lg:w-1/2 max-w-md p-10 gap-2">
                            <h1 className="text-5xl font-bold text-blue-500 mb-2">Item 1</h1>
                            <p className="text-gray-600 mb-6 text-xl">Detalhes do Item 1: </p>

                            <div>
                                <div className="mb-4">
                                    <input
                                        type="Nome"
                                        placeholder="Nome"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="Quantidade"
                                        placeholder="Quantidade"
                                        className="w-full px-4  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="Categoria"
                                        placeholder="Categoria"
                                        className="w-full px-4  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="Marca"
                                        placeholder="Marca"
                                        className="w-full px-4  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex-col flex gap-2">
                                <a href="/itensdetalhes" className="bg-blue-500 text-white text-center  font-semibold py-2 rounded-md transition">
                                    <button className="" >
                                        Editar
                                    </button>
                                </a>
                                <a href="/itensdetalhes" className="bg-red-500 text-white text-center  font-semibold py-2 rounded-md transition">
                                    <button className="" >
                                        Remover
                                    </button>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ItensDetalhes;
