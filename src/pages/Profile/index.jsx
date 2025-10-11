import React from "react";
import Navbar from "../../components/navbar";
import {
    User,
    PackageSearch,
    LayoutDashboard,
    Settings,
    LogOut,
    ChevronRight,
    Camera,
} from "lucide-react";

function Profile() {
    const menuItems = [
        { icon: <User size={18} color="#f97316" />, label: "Ver Perfil", href: "/home" },
        { icon: <PackageSearch size={18} color="#2563eb" />, label: "Ver Estoque", href: "/produtos" },
        { icon: <LayoutDashboard size={18} color="#10b981" />, label: "Estatísticas", href: "/dashboard" },
        { icon: <Settings size={18} color="#6366f1" />, label: "Configurações", href: "/" },
        { icon: <LogOut size={18} color="#ef4444" />, label: "Sair", href: "/" },
    ];

    return (
        <>
            <div className="flex w-full">
                <Navbar />

                {/* Container principal */}
                <div className="flex flex-1 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52 items-center justify-center">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl px-6 py-10">


                        <div className="flex flex-col items-center justify-center">
                            <div className="w-40 h-40 bg-blue-200 rounded-full flex items-center justify-center shadow-inner mb-6">

                                <Camera />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">João 0</h1>
                            <p className="text-blue-500 text-sm cursor-pointer mt-2 hover:underline">
                                Alterar Perfil &gt;
                            </p>
                        </div>

                        {/* Menu (lado direito) */}
                        <div className="bg-gray-100 rounded-3xl shadow-sm p-6 w-full max-w-md">
                            <ul className="flex flex-col divide-y divide-gray-200">
                                {menuItems.map((item, index) => (
                                    <a href={item.href}>
                                        <li
                                            key={index}
                                            className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 transition cursor-pointer rounded-xl"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm">
                                                    {item.icon}
                                                </div>
                                                <span className="text-gray-700 font-medium">{item.label}</span>
                                            </div>
                                            <ChevronRight size={18} color="#9ca3af" />
                                        </li>
                                    </a>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
