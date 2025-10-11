import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  PackageSearch,
  Bot,
  User,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { icon: <Home size={22} />, text: "Home", href: "/home" },
    { icon: <PackageSearch size={22} />, text: "Produtos", href: "/produtos" },
    { icon: <LayoutDashboard size={22} />, text: "Dashboard", href: "/dashboard" },
    { icon: <Bot size={22} />, text: "Chat-Bot", href: "/chatbot" },
    { icon: <User size={22} />, text: "Conta", href: "/profile" },
  ];

  return (
    <>
      {/* Botão do menu*/}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 text-blue-600 bg-white rounded-md p-2 shadow-md lg:hidden"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navbar principal */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-[230px] bg-blue-500 flex flex-col items-start justify-start shadow-lg transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 pr-5 pl-5 pb-5 pt-20 lg:p-5  w-full">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-100 to-blue-300 rounded-lg text-center font-extrabold flex items-center justify-center text-blue-600 text-lg">
            S
          </div>
          <h1 className="font-extrabold uppercase text-white text-2xl tracking-wide">
            Ssmai
          </h1>
        </div>

        {/* Linha divisória */}
        <hr className="border-t border-blue-300 w-full mb-4 opacity-60" />

        {/* Itens Navegação */}
        <nav className="flex flex-col w-full">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="group flex items-center gap-3 px-6 py-3 text-base text-white hover:bg-gray-100 hover:text-blue-600 transition"
            >
              <span className="text-white group-hover:text-blue-600">
                {link.icon}
              </span>
              <span>{link.text}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
