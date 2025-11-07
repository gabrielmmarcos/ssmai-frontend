import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { Camera } from "lucide-react";
import CardHome from "../../components/cardsHome";
import api from "../../api/api";

function Home() {
  const [userName, setUserName] = useState("Carregando...");
  const [produtos, setProdutos] = useState([]);
  const [stocks, setStocks] = useState({});
  const [analises, setAnalises] = useState({});
  const leadTime = 7;

  // Formatar preço
  const formatarPreco = (valor) => {
    if (valor === null || valor === undefined) return "-";
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Buscar produtos + estoque + IA
  useEffect(() => {
    async function carregarTudo() {
      try {
        const response = await api.get("/products/all_by_user_enterpryse?offset=0&limit=20");
        const produtosData = response.data.products || [];
        setProdutos(produtosData);

        if (produtosData.length === 0) return;

        // Buscar estoque e análise de IA
        const responses = await Promise.all(
          produtosData.map(async (p) => {
            try {
              const [stockRes, aiRes] = await Promise.all([
                api.get(`/stock/${p.id}`),
                api.get(`/ai_analysis/${p.id}?lead_time=${leadTime}`)
              ]);
              return {
                id: p.id,
                estoque: {
                  custo_medio: stockRes.data.custo_medio,
                  quantidade_disponivel: stockRes.data.quantidade_disponivel,
                },
                analise: aiRes.data
              };
            } catch {
              return {
                id: p.id,
                estoque: { custo_medio: null, quantidade_disponivel: null },
                analise: null
              };
            }
          })
        );

        const stockMap = {};
        const analiseMap = {};
        responses.forEach((r) => {
          stockMap[r.id] = r.estoque;
          analiseMap[r.id] = r.analise;
        });

        setStocks(stockMap);
        setAnalises(analiseMap);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    carregarTudo();
  }, []);

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

  return (
    <div className="flex w-full">
      <Navbar />
      <div className="flex flex-col flex-1 py-28 px-6 lg:px-10 lg:py-10 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">

        <h1 className="text-2xl lg:text-5xl text-center lg:text-left font-bold text-gray-800 mb-8">
          Bem-vindo, <span className="text-blue-600">{userName}</span>
        </h1>

        {/* <div className="flex justify-center lg:justify-between items-center mb-10">
          <h2 className="text-lg font-semibold text-gray-800">Principais itens no Estoque</h2>
          <a href="/estoque">
            <p className="hidden lg:block text-blue-500 font-bold hover:underline cursor-pointer">
              Ver Todos
            </p>
          </a>
        </div> */}

        {produtos.length > 0 ? (
          <div className="grid grid-cols-1  gap-6">
            {produtos
              .sort((a, b) => a.id - b.id)
              .map((p) => (
                <CardHome
                  key={p.id}
                  id={p.id}
                  nome={p.nome}
                  categoria={p.categoria}
                  img={p.image}
                  preco={stocks[p.id] ? formatarPreco(stocks[p.id].custo_medio) : "-"}
                  quantidade={stocks[p.id]?.quantidade_disponivel ?? "-"}
                  analise={analises[p.id]}

                />
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Camera className="text-blue-400 w-16 h-16 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Nenhum produto cadastrado</h3>
            <p className="text-gray-500 mb-6">Adicione um produto para começar a gerenciar seu estoque e análises com IA.</p>
            <a href="/additem">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Adicionar Produto
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
