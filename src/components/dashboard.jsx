
import { Line } from "react-chartjs-2";
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend);



const Dashboard = () => {
    const data = {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
        datasets: [
            {
                label: "Itens Vendidos",
                data: [320, 400, 370, 450, 510, 490, 530],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "Itens em Estoque",
                data: [900, 870, 850, 810, 790, 760, 740],
                borderColor: "#22c55e",
                backgroundColor: "rgba(34, 197, 94, 0.1)",
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
        <>

            {/* --- Dashboard: visível apenas em telas lg --- */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-6 w-full">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Estatísticas de Itens</h2>
                        <p className="text-gray-500 text-sm">Janeiro - Novembro 2025</p>
                    </div>
                    <a href="/dashboard">
                        <p className="text-blue-500 font-bold hover:underline cursor-pointer">
                            Ver Todas Estatísticas
                        </p>
                    </a>
                </div>

                <Line data={data} options={options} height={120} />

                <div className="grid grid-cols-5 gap-4 mt-6 text-center text-gray-600 text-sm">
                    <div>
                        <p className="font-semibold text-gray-800">Itens em Estoque</p>
                        <p>740 unidades (última atualização)</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">Itens Vendidos</p>
                        <p>530 unidades (Julho)</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">Itens Mais Vendidos</p>
                        <p>Item A, Item C, Item F</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">Itens Mais Saíram</p>
                        <p>1. Item A (210), 2. Item D (180)</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">Reposição Necessária</p>
                        <p>12 itens com baixo estoque</p>
                    </div>
                </div>
            </div>

            {/* --- Versão mobile --- */}
            <div className="lg:hidden bg-white rounded-xl shadow-md p-5 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Estoque Resumido</h2>
                <p className="text-gray-600 text-sm mb-4">
                    Acesse em um dispositivo maior para ver o gráfico detalhado.
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="bg-gray-100 rounded-lg p-3">
                        <p className="font-semibold">Em Estoque</p>
                        <p>740 unid.</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                        <p className="font-semibold">Vendidos</p>
                        <p>530 unid.</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                        <p className="font-semibold">Mais Vendidos</p>
                        <p>Item A, C, F</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                        <p className="font-semibold">Reposição</p>
                        <p>12 itens</p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Dashboard;