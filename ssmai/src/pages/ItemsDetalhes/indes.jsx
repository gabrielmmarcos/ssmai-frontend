import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const itensFake = [
    { id: 1, name: "Item 1", quantity: 150, category: "Geral", brand: "Marca A", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Item 2", quantity: 200, category: "Limpeza", brand: "Marca B", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Item 3", quantity: 200, category: "Escritório", brand: "Marca C", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Item 4", quantity: 120, category: "Higiene", brand: "Marca D", image: "https://via.placeholder.com/150" },
];

const ItemDetalhes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = itensFake.find((i) => i.id === Number(id));

    if (!item) return <p className="p-10">Item não encontrado</p>;

    return (
        <div className="p-10 flex gap-10">
            <div className="bg-blue-50 w-64 h-96 rounded-xl flex items-center justify-center">
                <img src={item.image} alt={item.name} className="w-32 h-32" />
            </div>

            <div className="flex flex-col gap-3 w-64">
                <h1 className="text-2xl font-semibold">{item.name}</h1>
                <input type="text" value={item.name} readOnly className="border rounded p-2" />
                <input type="text" value={`${item.quantity} unidades`} readOnly className="border rounded p-2" />
                <input type="text" value={item.category} readOnly className="border rounded p-2" />
                <input type="text" value={item.brand} readOnly className="border rounded p-2" />

                <button
                    className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                    onClick={() => navigate("/")}
                >
                    Remover Produto
                </button>
            </div>
        </div>
    );
};

export default ItemDetalhes;
