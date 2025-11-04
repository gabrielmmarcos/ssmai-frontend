import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

    const [stats, setStats] = useState(null);
    const [graphData, setGraphData] = useState({ historico: [], previsoes: [] });

    useEffect(() => {
        async function fetchData() {
            try {
                // GET das informações gerais
                const statsRes = await api.get(`/ai_analysis/${id}`);
                setStats(statsRes.data);

                // GET dos dados do gráfico
                const graphRes = await api.get(`/ai_analysis/${id}/graph`);
                setGraphData(graphRes.data);
            } catch (error) {
                console.error("Erro ao buscar dados do dashboard:", error);
            }
        }
        fetchData();
    }, [id]);

    // prepara dados para o gráfico
    const data = {
        labels: [
            ...graphData.historico.map((d) =>
                new Date(d.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
            ),
            ...graphData.previsoes.map((d) =>
                new Date(d.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
            ),
        ],
        datasets: [
            {
                label: "Estoque Real",
                data: graphData.historico.map((d) => d.estoque),
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "Estoque Previsto",
                data: graphData.previsoes.map((d) => d.estoque_previsto),
                borderColor: "#9333ea",
                backgroundColor: "rgba(147, 51, 234, 0.1)",
                fill: true,
                tension: 0.4,
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

                    {/* Informações IA */}
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
            </div>
        </div>
    );
}

export default DashboardID;
