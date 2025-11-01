import React from "react";
import { Camera } from "lucide-react";

const ItemCard = ({ id, nome, categoria, quantidade, preco }) => {
    return (
        <div className="bg-blue-50 rounded-xl flex flex-col items-center w-full h-80 shadow-sm">
            <div className="h-full bg-blue-200 w-full rounded-xl flex justify-center items-center">
                <Camera />
            </div>
            <div className="w-full h-fit p-4  items-start ">
                <h4 className="font-bold  text-xl uppercase">{nome}</h4>
                <p><span className="font-medium">Categoria:</span> {categoria}</p>
                <p><span className="font-medium">Custo Médio:</span> {preco}</p>
                <p><span className="font-medium">Quantidade:</span> {quantidade}</p>
                <a href={`/veritem/${id}`}>
                    <button
                        className="border-1 border-blue-500 text-blue-500 w-full bg-white px-4 py-1 mt-3 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer"
                    >
                        Ver Item
                    </button>
                </a>
            </div>
        </div>
    );
};

export default ItemCard;
