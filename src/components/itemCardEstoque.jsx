import React from "react";
import { Camera } from "lucide-react";

const ItemCardEstoque = ({ id, nome, categoria, img }) => {
    return (
        <div className=" rounded-xl flex flex-col items-center w-full h-80 shadow-sm">

            {/* Área da imagem */}
            <div
                className={`h-1/2 w-full rounded-xl flex justify-center items-center p-3 transition ${img
                    ? "border border-gray-300 bg-transparent"
                    : "bg-blue-200"
                    }`}
            >
                {img ? (
                    <img
                        src={img}
                        className="object-contain w-full h-full rounded-lg"
                    />
                ) : (
                    <Camera size={64} className="text-blue-600" />
                )}
            </div>


            <div className="bg-blue-50 w-full h-1/2 p-4 flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-xl uppercase">{nome}</h4>
                    <p>
                        <span className="font-medium">Categoria:</span> {categoria}
                    </p>
                </div>

                <a href={`/veritem/${id}`}>
                    <button
                        className="border border-blue-500 text-blue-500 w-full bg-white px-4 py-1 mt-3 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer"
                    >
                        Ver Item
                    </button>
                </a>
            </div>
        </div>
    );
};

export default ItemCardEstoque;
