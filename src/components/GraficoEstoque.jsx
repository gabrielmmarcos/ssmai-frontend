import React, { useEffect, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import api from "../api/api";

export default function GraficoEstoque({ id, leadTime }) {
    const [graphData, setGraphData] = useState(null);
    const [originalGraphData, setOriginalGraphData] = useState(null);
    const [historicoFilter, setHistoricoFilter] = useState("todas");

    // Buscar dados originais da API
    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");
            try {
                const res = await api.get(`/ai_analysis/${id}/graph`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGraphData(res.data);
                setOriginalGraphData(res.data);
            } catch (err) {
                console.error("Erro ao buscar gráfico:", err);
            }
        }
        fetchData();
    }, [id, leadTime]);

    // Atualizar gráfico quando o filtro mudar
    useEffect(() => {
        if (!originalGraphData) return;

        if (historicoFilter === "todas") {
            setGraphData(originalGraphData);
            return;
        }

        const dias = parseInt(historicoFilter, 10);
        const historicoFiltrado = originalGraphData.historico.slice(-dias);

        setGraphData({
            historico: historicoFiltrado,
            previsoes: originalGraphData.previsoes,
        });
    }, [historicoFilter, originalGraphData]);

    const chartData = useMemo(() => {
        if (!graphData) return null;

        const historico = graphData.historico || [];
        const previsoes = graphData.previsoes || [];

        const labels = [
            ...historico.map((h) => new Date(h.data).toLocaleDateString("pt-BR")),
            ...previsoes.map((p) => new Date(p.data).toLocaleDateString("pt-BR")),
        ];

        const data = [
            ...historico.map((h) => h.estoque),
            ...previsoes.map((p) => p.saida_prevista),
        ];

        const historicoLength = historico.length;
        const totalLength = data.length;
        const ratio = historicoLength / totalLength;

        return {
            labels,
            datasets: [
                {
                    label: "",
                    data,
                    borderColor: (ctx) => {
                        const chart = ctx.chart;
                        const { ctx: canvasCtx, chartArea } = chart;
                        if (!chartArea) return "#3b82f6";

                        const gradient = canvasCtx.createLinearGradient(
                            chartArea.left,
                            0,
                            chartArea.right,
                            0
                        );

                        gradient.addColorStop(0, "#3b82f6"); // azul histórico
                        gradient.addColorStop(ratio, "#3b82f6");
                        gradient.addColorStop(ratio, "#9333ea"); // roxo previsão
                        gradient.addColorStop(1, "#9333ea");

                        return gradient;
                    },
                    backgroundColor: "rgba(59,130,246,0.1)",
                    borderWidth: 2,
                    tension: 0.1,
                    pointRadius: 2,
                },
            ],
        };
    }, [graphData]);


    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Data",
                    color: "#374151",
                    font: {
                        size: 14,
                        weight: "bold",
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Quantidade",
                    color: "#374151",
                    font: {
                        size: 14,
                        weight: "bold",
                    },
                },
            },
        },
    };


    if (!chartData) return <p>Carregando gráfico...</p>;

    return (
        <div className="w-full p-4 bg-white rounded-2xl ">
            <div className="flex w-full justify-between">
                <div className="flex flex-col items-start mb-4">
                    <h3 className="text-gray-700 font-semibold mb-1">Filtrar histórico</h3>
                    <select
                        value={historicoFilter}
                        onChange={(e) => setHistoricoFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 text-gray-700 bg-white shadow-sm"
                    >
                        <option value="todas">Todas movimentações</option>
                        <option value="150">Últimos 150 dias</option>
                        <option value="120">Últimos 120 dias</option>
                        <option value="90">Últimos 90 dias</option>
                        <option value="60">Últimos 60 dias</option>
                        <option value="30">Últimos 30 dias</option>
                        <option value="15">Últimos 15 dias</option>
                    </select>
                </div>
                {/* Legenda personalizada */}
                <div className="flex  gap-4 justify-center items-center mt-6 text-gray-700">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-blue-500 rounded-sm"></span>
                        <span>Histórico do Estoque</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-purple-500 rounded-sm"></span>
                        <span>Previsão de Estoque</span>
                    </div>
                </div>
            </div>
            <div className="relative w-full ">
                <Line data={chartData} options={chartOptions} />
            </div>


        </div>
    );
}
