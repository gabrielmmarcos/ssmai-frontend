import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { Camera, AlertTriangle } from "lucide-react";
import CardHome from "../../components/cardsHome";
import api from "../../api/api";

function Home() {
  const [userName, setUserName] = useState("Carregando...");
  const [worstStocks, setWorstStocks] = useState([]);
  const [hasProducts, setHasProducts] = useState(false);
  const [loading, setLoading] = useState(true);

  // Buscar nome do usuário
  useEffect(() => {
    async function carregarUsuario() {
      try {
        const response = await api.get("/users/me");
        setUserName(response.data.name || "Usuário");
      } catch {
        setUserName("Usuário");
      }
    }
    carregarUsuario();
  }, []);

  // Buscar produtos e itens de risco
  useEffect(() => {
    async function carregarItens() {
      try {
        // 1️⃣ Verifica se o usuário já possui produtos
        const produtosRes = await api.get("/products/all_by_user_enterpryse?offset=0&limit=20");
        const produtosData = produtosRes.data.products || [];
        setHasProducts(produtosData.length > 0);

        // 2️⃣ Se tiver produtos, busca os de risco
        if (produtosData.length > 0) {
          const token = localStorage.getItem("token");
          const worstRes = await api.get("/ai_analysis/worst_stocks/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setWorstStocks(worstRes.data || []);
        }
      } catch (error) {
        console.error("Erro ao carregar itens de risco:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarItens();
  }, []);

  // Formatar preço
  const formatarPreco = (valor) => {
    if (valor === null || valor === undefined) return "-";
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="flex w-full">
      <Navbar />
      <div className="flex flex-col flex-1 py-28 px-6 lg:px-10 lg:py-10 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">
        <h1 className="text-2xl lg:text-5xl text-center lg:text-left font-bold text-gray-800 mb-8">
          Bem-vindo, <span className="text-blue-600">{userName}</span>
        </h1>

        {/*  Loading */}
        {loading ? (
          <p className="text-gray-500 text-center">Carregando...</p>
        ) : !hasProducts ? (
          //  Primeira vez — nenhum produto cadastrado
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Camera className="text-blue-400 w-16 h-16 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Nenhum produto cadastrado
            </h3>
            <p className="text-gray-500 mb-6">
              Adicione um produto para começar a gerenciar seu estoque e análises com IA.
            </p>
            <a href="/additem">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Adicionar Produto
              </button>
            </a>
          </div>
        ) : worstStocks.length === 0 ? (
          //  Tem produtos, mas nenhum de risco
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <AlertTriangle className="text-green-500 w-16 h-16 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Nenhum item de risco encontrado
            </h3>
            <p className="text-gray-500">
              Todos os produtos estão dentro do nível ideal de estoque.
            </p>
          </div>
        ) : (
          //  Itens de risco encontrados
          <div className="grid grid-cols-1 gap-6">
            <h2 className="text-lg font-semibold text-gray-800">Itens de Risco</h2>
            {worstStocks.map((item) => (
              <CardHome
                key={item.stock.id}
                id={item.stock.id}
                nome={`Produto ${item.stock.id_produtos}`}
                categoria="Risco de Estoque"
                img={item.stock.image || null}
                preco={formatarPreco(item.stock.custo_medio)}
                quantidade={item.stock.quantidade_disponivel}
                analise={item.indicators}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
