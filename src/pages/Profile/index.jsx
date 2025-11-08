import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import {
    User,
    PackageSearch,
    LayoutDashboard,
    LogOut,
    ChevronRight,
    Camera,
} from "lucide-react";
import api from "../../api/api";

function Profile() {
    const menuItems = [
        { icon: <User size={18} color="#f97316" />, label: "Home", href: "/home" },
        { icon: <PackageSearch size={18} color="#2563eb" />, label: "Estoque", href: "/estoque" },
        { icon: <LayoutDashboard size={18} color="#10b981" />, label: "Dashboard", href: "/dashboard" },
        { icon: <LogOut size={18} color="#ef4444" />, label: "Sair", href: "/" },
    ];

    const [userName, setUserName] = useState("Usuário");

    useEffect(() => {
        async function carregarNomeUsuario() {
            try {
                const response = await api.get("/users/me");
                setUserName(response.data.name || "Usuário");
            } catch (error) {
                console.error("Erro ao carregar nome do usuário:", error);
            }
        }
        carregarNomeUsuario();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="flex w-full">
            <Navbar />

            <div className="flex flex-1 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52 items-center justify-center">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl px-6 py-10">
                    {/* Perfil */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-40 h-40 bg-blue-200 rounded-full flex items-center justify-center shadow-inner mb-6">
                            <Camera />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">{userName}</h1>
                    </div>

                    {/* Menu */}
                    <div className="bg-gray-100 rounded-3xl shadow-sm p-6 w-full max-w-md">
                        <ul className="flex flex-col divide-y divide-gray-200">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={
                                        item.label === "Sair"
                                            ? handleLogout
                                            : () => (window.location.href = item.href)
                                    }
                                    className={`flex items-center justify-between py-4 px-2 rounded-xl transition hover:bg-gray-50 cursor-pointer`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm">
                                            {item.icon}
                                        </div>
                                        <span
                                            className={`font-medium ${item.label === "Sair"
                                                    ? "text-red-500"
                                                    : "text-gray-700"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                    <ChevronRight size={18} color="#9ca3af" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
