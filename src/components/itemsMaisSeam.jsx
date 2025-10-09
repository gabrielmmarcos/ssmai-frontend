import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ItemCard from "./ItemCard";
import { useNavigate } from "react-router-dom";

const ItensMaisSaem = () => {
    const navigate = useNavigate();

    // 🔹 Itens simulados (sem backend)
    const [itens] = useState([
        { id: 1, name: "Item 1", quantity: 150, image: "https://via.placeholder.com/80" },
        { id: 2, name: "Item 2", quantity: 200, image: "https://via.placeholder.com/80" },
        { id: 3, name: "Item 3", quantity: 200, image: "https://via.placeholder.com/80" },
        { id: 4, name: "Item 4", quantity: 120, image: "https://via.placeholder.com/80" },
        { id: 5, name: "Item 5", quantity: 90, image: "https://via.placeholder.com/80" },
    ]);

    const handleViewItem = (id) => {
        navigate(`/item/${id}`);
    };

    return (
        <div className="mt-8 px-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Itens que mais saem</h2>
                <a href="/itens" className="text-blue-500 hover:underline">
                    Ver Todos
                </a>
            </div>

            <Swiper spaceBetween={20} slidesPerView={4}>
                {itens.map((item) => (
                    <SwiperSlide key={item.id}>
                        <ItemCard item={item} onView={handleViewItem} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ItensMaisSaem;
