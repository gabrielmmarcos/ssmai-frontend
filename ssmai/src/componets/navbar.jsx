import React from "react";
import { User, BookOpen, Bookmark, UserPlus, Notebook } from "lucide-react";

const Navbar = () => {
  // Lista para evitar repetição de código
  const links = [
    { icon: <User size={45} />, text: "Funções bibliotecário", href: "/Bibliotecario" },
    { icon: <BookOpen size={45} />, text: "Empréstimos", href: "/Emprestimo" },
    { icon: <Bookmark size={45} />, text: "Reservas", href: "/Reserva" },
    { icon: <UserPlus size={45} />, text: "Alunos", href: "/Alunos" },
    { icon: <Notebook size={45} />, text: "Cadastrar acervo", href: "/Acervo" },
  ];

  return (
    <div className="fixed top-0 left-0 min-h-screen w-[230px] bg-neutral-900 flex flex-col items-center justify-evenly rounded-r-2xl">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="flex flex-col items-center text-white group hover:text-red-500 cursor-pointer"
        >
          <div>{link.icon}</div>
          <span className="text-xl mt-2">{link.text}</span>
        </a>
      ))}
    </div>

  );
};

export default Navbar;
