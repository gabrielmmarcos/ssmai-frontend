import React from "react";
import { Camera, } from "lucide-react";

const ItemCard = () => {
    return (
        <div className="bg-blue-50 rounded-xl  flex flex-col items-center w-full h-72  shadow-sm">
            <div className="h-1/2 bg-blue-200 w-full rounded-xl flex justify-center items-center" >
                <Camera />
            </div>
            <div className="w-full h-1/2 p-4">

                <h4 className="font-semibold w-full">Item 1</h4>
                <p>200 Unidades</p>

                <a href="/veritem">
                    <button
                        className="border-2 border-blue-500 text-blue-500 w-full  bg-white px-4 py-1 mt-3 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer"
                    >
                        Ver Item
                    </button>
                </a>
            </div>
        </div>
    );
};

export default ItemCard;
