import React from "react";
import Navbar from "../../components/navbar";
import { Camera } from "lucide-react";



function AddItem() {


    return (
        <>
            <div className="flex w-full ">

                <Navbar />
                {/* Container principal */}
                <div className="flex flex-1  min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52  ">
                    <div className=" flex flex-col lg:flex-row   w-full h-screen items-center justify-center bg-white">

                        <div className="flex flex-col w-full lg:w-1/2 max-w-md p-10 gap-2">

                            <h1 className="text-3xl lg:text-5xl font-bold text-blue-500 mb-2">Adicionar Item</h1>


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
                                        type="Custo"
                                        placeholder="Custo"
                                        className="w-full px-4  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="Quantidade"
                                        placeholder="Quantidade"
                                        className="w-full px-4  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* <div className="mb-4">
                                    <input
                                        type="Quantidade-Ideal"
                                        placeholder="Quantidade Ideal"
                                        className="w-full px-4  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div> */}
                                <div className="mb-4">
                                    <input
                                        type="Categoria"
                                        placeholder="Categoria"
                                        className="w-full px-4  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                            </div>
                            <div className="flex-col flex gap-2">
                                <a href="/editaritem" className="bg-blue-500 text-white text-center  font-semibold py-2 rounded-md transition">
                                    <button className="" >
                                        Salvar
                                    </button>
                                </a>
                                <a href="/editaritem" className="lg:hidden  bg-white text-blue-500 border flex flex-row justify-center gap-2 border-blue-500 text-center  font-semibold py-2 rounded-md transition">
                                    <button className="" >
                                        Adicionar com a Câmera
                                    </button>

                                    <Camera />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default AddItem;
