import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import api from "../../api/api";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { ChevronDown, DatabaseZap } from "lucide-react";
import { Line } from "react-chartjs-2";
import GraficoEstoque from "../../components/GraficoEstoque";


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend);

function DashboardID() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");
    ;

    const [stats, setStats] = useState(null);
    const [graphData, setGraphData] = useState({ historico: [], previsoes: [] });
    const [allProducts, setAllProducts] = useState([]);
    const [leadTime, setLeadTime] = useState(7);

    const [name, setName] = useState(null);

    // get nome
    useEffect(() => {
        async function getNome() {
            const token = localStorage.getItem("token");
            console.log(graphData)
            try {
                const res = await api.get(`/products/with_analysis?offset=0&limit=100`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const produtos = res.data?.products || [];
                console.log(produtos)
                const produto = res.data.products.find(p => p.id === Number(id));
                setName(produto ? produto.nome : "Produto não encontrado");
            } catch (error) {
                console.error("Erro ao buscar nome:", error);
                setName("Erro ao carregar nome");
            }
        }
        getNome();
    }, [id]);


    // Buscar lista de produtos
    useEffect(() => {
        async function fetchProducts() {
            const token = localStorage.getItem("token"); //token geral
            try {
                const res = await api.get(`/products/with_analysis?offset=0&limit=100`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllProducts(res.data.products || []);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        }
        fetchProducts();
    }, []);

    //  get gráfico
    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token"); //token geral
            try {
                const statsRes = await api.get(`/ai_analysis/${id}?lead_time=${leadTime}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStats(statsRes.data);

                const graphRes = await api.get(`/ai_analysis/${id}/graph`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGraphData(graphRes.data);


            } catch (error) {
                console.error("Erro ao buscar dados do dashboard:", error);
            }
        }
        fetchData();
    }, [id, leadTime]);

    // //  Aplicar filtro no histórico
    // const filteredHistorico = React.useMemo(() => {
    //     if (!graphData?.historico) return [];
    //     if (historicoFilter === "todas") return graphData.historico;

    //     const dias = parseInt(historicoFilter, 10);
    //     const cutoff = new Date();
    //     cutoff.setDate(cutoff.getDate() - dias);

    //     return graphData.historico.filter((d) => {
    //         const dataItem = new Date(d.data);
    //         return dataItem >= cutoff;
    //     });
    // }, [graphData, historicoFilter]);

    // //  Preparar dados do gráfico
    // const allLabels = [
    //     ...filteredHistorico.map((d) =>
    //         new Date(d.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    //     ),
    //     ...graphData.previsoes.map((d) =>
    //         new Date(d.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    //     ),
    // ];

    // const allData = [
    //     ...filteredHistorico.map((d) => d.estoque),
    //     ...graphData.previsoes.map((d) => d.saida_prevista),
    // ];

    // const data = {
    //     labels: allLabels,

    //     datasets: [
    //         {
    //             label: "Estoque (Histórico e Previsão)",
    //             data: allData,
    //             borderColor: (ctx) => {
    //                 const chart = ctx.chart;
    //                 const { ctx: canvasCtx, chartArea } = chart;
    //                 if (!chartArea || allData.length === 0) return "#3b82f6";

    //                 // use o tamanho ORIGINAL do histórico para calcular o ponto de corte
    //                 const historicoTotal = graphData.historico.length;
    //                 const ratio = historicoTotal / allData.length || 0;

    //                 const gradient = canvasCtx.createLinearGradient(
    //                     chartArea.left,
    //                     0,
    //                     chartArea.right,
    //                     0
    //                 );
    //                 gradient.addColorStop(0, "#3b82f6");
    //                 gradient.addColorStop(Math.min(ratio, 1), "#3b82f6");
    //                 gradient.addColorStop(Math.min(ratio, 1), "#9333ea");
    //                 gradient.addColorStop(1, "#9333ea");
    //                 return gradient;
    //             },
    //             backgroundColor: "rgba(59, 130, 246, 0.1)",
    //             borderWidth: 2,
    //             fill: false,
    //             tension: 0.4,
    //             pointRadius: 3,
    //             pointHoverRadius: 5,
    //         },
    //     ],

    // };



    // const options = {
    //     responsive: true,
    //     scales: {
    //         x: {
    //             ticks: { color: "#6b7280" },
    //             grid: { color: "rgba(0,0,0,0.05)" },
    //         },
    //         y: {
    //             ticks: { color: "#6b7280" },
    //             grid: { color: "rgba(0,0,0,0.05)" },
    //         },
    //     },
    //     plugins: {
    //         legend: {
    //             labels: { color: "#374151" },
    //         },
    //     },
    // };


    //passa pra float

    function passFloat(value) {

        const num = parseFloat(value);
        if (isNaN(num)) return "0.00";
        return num.toFixed(2);
    }

    //passa para int
    function passInt(value) {
        const num = parseInt(value);
        return num;
    }
    return (
        <div className="flex w-full">
            <Navbar />
            <div className="flex flex-col flex-1 py-28 px-5 lg:py-10 min-h-screen bg-white overflow-x-hidden ml-0 lg:ml-52">
                <div className="flex flex-col w-full lg:px-10 lg:flex-row justify-center gap-10 lg:gap-0  lg:justify-between items-center">
                    <h1 className="text-3xl lg:text-5xl text-center w-fit lg:w-full   flex font-bold text-gray-800 ">
                        {name}
                    </h1>
                    <div className="flex flex-col lg:flex-row gap-6 justify-start lg:justify-center items-start lg:items-center mb-6">


                        {/* Selecionar Produto */}
                        <div className="flex flex-col items-center lg:items-start w-[250px]">
                            <h3 className="text-gray-700 font-semibold mb-1">Selecionar produto</h3>
                            <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm flex justify-between items-center w-full text-gray-700"
                            >
                                {selected || "Selecione um produto"}
                                <ChevronDown size={16} className="text-gray-500" />
                            </button>

                            {open && (
                                <ul className="absolute mt-17 max-w-[250px] border border-gray-300 rounded-lg bg-white shadow-md max-h-[200px] overflow-y-auto w-full z-10">
                                    {[...allProducts]
                                        .sort((a, b) => a.id - b.id)
                                        .map((p) => (
                                            <li
                                                key={p.id}
                                                onClick={() => {
                                                    setSelected(p.nome);
                                                    setOpen(false);
                                                    navigate(`/dashboard/${p.id}`);
                                                }}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {p.nome}
                                            </li>
                                        ))}
                                </ul>
                            )}

                        </div>


                    </div>

                </div>
                {/* Gráfico */}
                <div className="hidden lg:block bg-white rounded-2xl px-8  py-6 w-full shadow-sm">
                    <div className="mt-2">
                        {/* Gráfico */}
                        <GraficoEstoque id={id} leadTime={leadTime} />

                    </div>
                </div>



                {/* Estatísticas IA */}
                <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between px-10 mt-20 items-center">
                    <h1 className="text-2xl  text-center w-fit lg:w-full  items-center flex font-bold text-gray-800 ">
                        Dados do Item
                    </h1>
                    {/* Selecionar Lead Time */}
                    <div className="flex flex-col items-start w-[250px] lg:w-[300px]">
                        <h3 className="text-gray-700 font-semibold mb-1 w-full text-center lg:text-start">Período/Reposição</h3>
                        <select
                            value={leadTime}
                            onChange={(e) => setLeadTime(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 text-gray-700 bg-white shadow-sm w-full"
                        >
                            {[...Array(60)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1} dias
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {stats ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-10 mt-6">
                        {/* Média Diária */}
                        <div className="bg-blue-50 rounded-2xl p-4 shadow-sm text-center">
                            <p className="text-sm font-semibold text-blue-700">Média Diária</p>
                            <p className="text-2xl font-bold text-blue-900 mt-2">{passInt(stats.diary_average)} unid.</p>
                        </div>

                        {/* Demanda Lead Time */}
                        <div className="bg-blue-50 rounded-2xl p-4 shadow-sm text-center">
                            <p className="text-sm font-semibold text-blue-700">Demanda Lead Time</p>
                            <p className="text-2xl font-bold text-blue-900 mt-2">{passFloat(stats.demanda_leadtime)} unid.</p>
                        </div>

                        {/* Estoque de Segurança */}
                        <div className="bg-blue-50 rounded-2xl p-4 shadow-sm text-center">
                            <p className="text-sm font-semibold text-blue-700">Estoque de Segurança</p>
                            <p className="text-2xl font-bold text-blue-900 mt-2">{passInt(stats.safety_stock)} unid.</p>
                        </div>

                        {/* Estoque Ideal */}
                        <div className="bg-blue-50 rounded-2xl p-4 shadow-sm text-center">
                            <p className="text-sm font-semibold text-blue-700">Estoque Ideal</p>
                            <p className="text-2xl font-bold text-blue-900 mt-2">{passInt(stats.estoque_ideal)} unid.</p>
                        </div>

                        {/* Recomendado Pedir */}
                        <div className="bg-blue-50 rounded-2xl p-4 shadow-sm text-center">
                            <p className="text-sm font-semibold text-blue-700">Recomendado Pedir</p>
                            <p className="text-2xl font-bold text-blue-900 mt-2">{passInt(stats.pedir)} unid.</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-4">
                        Carregando estatísticas da IA...
                    </p>
                )}

            </div>
        </div >
    );
}

export default DashboardID;
