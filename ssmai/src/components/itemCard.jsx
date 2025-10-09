import React from "react";

const ItemCard = ({ item, onView }) => {
    return (
        <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center w-60 shadow-sm">
            <div className="bg-blue-100 w-full h-32 flex justify-center items-center rounded-lg">
                <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                />
            </div>

            <div className="mt-3 text-center">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.quantity} unidades</p>
            </div>

            <button
                onClick={() => onView(item.id)}
                className="border border-blue-500 text-blue-500 px-4 py-1 mt-3 rounded-lg hover:bg-blue-500 hover:text-white transition"
            >
                Ver Item
            </button>
        </div>
    );
};

export default ItemCard;
