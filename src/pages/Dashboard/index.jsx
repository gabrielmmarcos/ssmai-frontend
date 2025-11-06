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
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend);

function DashboardID() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [graphData, setGraphData] = useState({ historico: [], previsoes: [] });
    const [allProducts, setAllProducts] = useState([]);
    const [leadTime, setLeadTime] = useState(7);
    const [historicoFilter, setHistoricoFilter] = useState("todas");




    // Buscar lista de produtos
    useEffect(() => {
        async function fetchProducts() {
            const token = localStorage.getItem("token"); //token geral
            try {
                const res = await api.get(`/products/all_by_user_enterpryse?offset=0&limit=100`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllProducts(res.data.products || []);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        }
        fetchProducts();
    }, []);

    //  Buscar dados do produto e gráfico
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

    //  Aplicar filtro no histórico
    const filteredHistorico = (() => {
        if (historicoFilter === "todas") return graphData.historico;
        const dias = parseInt(historicoFilter, 10);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - dias);
        return graphData.historico.filter((d) => new Date(d.data) >= cutoff);
    })();

    //  Preparar dados do gráfico
    const allLabels = [
        ...filteredHistorico.map((d) =>
            new Date(d.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
        ),
        ...graphData.previsoes.map((d) =>
            new Date(d.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
        ),
    ];

    const allData = [
        ...filteredHistorico.map((d) => d.estoque),
        ...graphData.previsoes.map((d) => d.saida_prevista),
    ];

    const data = {
        labels: allLabels,
        datasets: [
            {
                label: "Estoque (Histórico e Previsão)",
                data: allData,
                borderColor: (ctx) => {
                    const chart = ctx.chart;
                    const { ctx: canvasCtx, chartArea } = chart;
                    if (!chartArea || allData.length === 0) return "#3b82f6";
                    const ratio = filteredHistorico.length / allData.length || 0;
                    const gradient = canvasCtx.createLinearGradient(
                        chartArea.left,
                        0,
                        chartArea.right,
                        0
                    );
                    gradient.addColorStop(0, "#3b82f6");
                    gradient.addColorStop(Math.min(ratio, 1), "#3b82f6");
                    gradient.addColorStop(Math.min(ratio, 1), "#9333ea");
                    gradient.addColorStop(1, "#9333ea");
                    return gradient;
                },
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                ticks: { color: "#6b7280" },
                grid: { color: "rgba(0,0,0,0.05)" },
            },
            y: {
                ticks: { color: "#6b7280" },
                grid: { color: "rgba(0,0,0,0.05)" },
            },
        },
        plugins: {
            legend: {
                labels: { color: "#374151" },
            },
        },
    };

    return (
        <div className="flex w-full">
            <Navbar />
            <div className="flex flex-col flex-1 py-28 px-10 lg:py-10 min-h-screen bg-white overflow-x-hidden ml-0 lg:ml-52">
                <h1 className="text-3xl font-bold text-purple-600 mb-6">Dashboard IA</h1>

                {/* Gráfico */}
                <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Evolução do Estoque</h2>
                            <p className="text-gray-500 text-sm">
                                Histórico e previsão de estoque do produto #{id}
                            </p>
                        </div>
                    </div>

                    <Line data={data} options={options} height={120} />

                    {/* Estatísticas IA */}
                    {stats ? (
                        <div className="grid grid-cols-5 gap-4 mt-6 text-center text-gray-600 text-sm">
                            <div>
                                <p className="font-semibold text-gray-800">Média Diária</p>
                                <p>{stats.diary_average} unid.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Demanda Lead Time</p>
                                <p>{stats.demanda_leadtime} unid.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Estoque de Segurança</p>
                                <p>{stats.safety_stock} unid.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Estoque Ideal</p>
                                <p>{stats.estoque_ideal} unid.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Recomendado Pedir</p>
                                <p>{stats.pedir} unid.</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-4">
                            Carregando estatísticas da IA...
                        </p>
                    )}
                </div>


                <div className="flex flex-wrap gap-4 mt-8 justify-center">
                    {/* Selecionar Produto */}
                    <select
                        onChange={(e) => navigate(`/dashboard/${e.target.value}`)}
                        className="border border-gray-300 rounded-lg p-2 text-gray-700 bg-white shadow-sm"
                    >

                        {allProducts.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nome}
                            </option>
                        ))}
                    </select>

                    {/* Selecionar Lead Time */}
                    <select
                        value={leadTime}
                        onChange={(e) => setLeadTime(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 text-gray-700 bg-white shadow-sm"
                    >
                        {[...Array(60)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1} dias
                            </option>
                        ))}
                    </select>

                    {/* Filtro de Histórico */}
                    <select
                        value={historicoFilter}
                        onChange={(e) => setHistoricoFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 text-gray-700 bg-white shadow-sm"
                    >
                        <option value="todas">Todas movimentações</option>
                        <option value="90">Últimos 90 dias</option>
                        <option value="60">Últimos 60 dias</option>
                        <option value="30">Últimos 30 dias</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default DashboardID;
