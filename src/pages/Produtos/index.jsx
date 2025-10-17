import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react"

function Produtos() {
    const navigate = useNavigate();

    const produtos = [
        // 🧴 Higiene
        {
            id: 1,
            titulo: "Sabonete Antibacteriano",
            preco: 4.99,
            quantidade: 120,
            quantidadeIdeal: 150,
            categoria: "Higiene",
        },
        {
            id: 2,
            titulo: "Shampoo Neutro 500ml",
            preco: 14.9,
            quantidade: 60,
            quantidadeIdeal: 80,
            categoria: "Higiene",
        },
        {
            id: 3,
            titulo: "Creme Dental 90g",
            preco: 6.5,
            quantidade: 95,
            quantidadeIdeal: 100,
            categoria: "Higiene",
        },
        {
            id: 4,
            titulo: "Papel Higiênico (Pacote c/ 12)",
            preco: 18.9,
            quantidade: 40,
            quantidadeIdeal: 60,
            categoria: "Higiene",
        },
        {
            id: 5,
            titulo: "Desodorante Aerosol 150ml",
            preco: 12.9,
            quantidade: 35,
            quantidadeIdeal: 50,
            categoria: "Higiene",
        },

        // 🍞 Comida
        {
            id: 6,
            titulo: "Arroz Branco 5kg",
            preco: 24.9,
            quantidade: 50,
            quantidadeIdeal: 80,
            categoria: "Comida",
        },
        {
            id: 7,
            titulo: "Feijão Carioca 1kg",
            preco: 8.9,
            quantidade: 65,
            quantidadeIdeal: 100,
            categoria: "Comida",
        },
        {
            id: 8,
            titulo: "Macarrão Espaguete 500g",
            preco: 5.49,
            quantidade: 45,
            quantidadeIdeal: 70,
            categoria: "Comida",
        },
        {
            id: 9,
            titulo: "Óleo de Soja 900ml",
            preco: 6.99,
            quantidade: 30,
            quantidadeIdeal: 50,
            categoria: "Comida",
        },
        {
            id: 10,
            titulo: "Café Torrado e Moído 500g",
            preco: 16.5,
            quantidade: 25,
            quantidadeIdeal: 40,
            categoria: "Comida",
        },
    ];

    return (
        <>
            <div className="flex w-full">
                {/* Navbar lateral fixa */}
                <Navbar />

                {/* Conteúdo principal */}
                <div className="flex flex-col flex-1 py-28 px-10 lg:py-10 min-h-screen bg-white overflow-x-hidden ml-0 lg:ml-52">
                    <h1 className="text-2xl lg:text-5xl text-center lg:text-left font-bold text-gray-800 mb-8">
                        Produtos
                    </h1>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-500 text-white text-sm uppercase">
                                    <th className="py-3 px-4 rounded-tl-xl ">Nome</th>
                                    <th className="py-3 px-4 border border-blue-400">Custo Unitário (R$)</th>
                                    <th className="py-3 px-4 border border-blue-400">Quantidade</th>
                                    <th className="py-3 px-4 border border-blue-400">Quantidade Ideal</th>
                                    <th className="py-3 px-4 rounded-tr-xl">Categoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border border-blue-200 hover:bg-blue-50 transition cursor-pointer"
                                        onClick={() => navigate(`/veritem`)}
                                    >
                                        <td className="py-3 px-4 font-medium border border-blue-100">
                                            {item.titulo}
                                        </td>
                                        <td className="py-3 px-4 border border-blue-100">
                                            {item.preco.toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4 border border-blue-100">
                                            {item.quantidade}
                                        </td>
                                        <td className="py-3 px-4 border border-blue-100">
                                            {item.quantidadeIdeal}
                                        </td>
                                        <td className="py-3 px-4 border border-blue-100">
                                            {item.categoria}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* add item  */}
                    <a href="/additem">
                        <div className="absolute bottom-2 right-2 w-20 h-20 flex items-center justify-center rounded-full bg-blue-500 ">
                            <span className="text-white">
                                <Plus size={38} />
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}

export default Produtos;
