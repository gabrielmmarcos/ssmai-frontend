import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import api from "../../api/api";
import Navbar from "../../components/navbar";

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("geral");

    // Carrega histórico quando entra no modo "geral"
    useEffect(() => {
        if (mode === "geral") {
            fetchHistory();
        } else {
            setMessages([
                { from: "bot", text: "Olá! 👋 Sou o assistente da SSMAI, como posso ajudar?" },
            ]);
        }
    }, [mode]);

    // Busca histórico do chat geral
    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/chatbot/history", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = response.data;

            if (data?.conversations?.length > 0) {
                const ordered = [...data.conversations].sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );

                const formatted = ordered
                    .map((item) => [
                        { from: "user", text: item.user_message },
                        { from: "bot", text: item.assistant_response },
                    ])
                    .flat();

                setMessages(formatted);
            } else {
                setMessages([
                    { from: "bot", text: "Olá! 👋 Sou o assistente da SSMAI, como posso ajudar?" },
                ]);
            }
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            setMessages([{ from: "bot", text: "Erro ao carregar o histórico." }]);
        }
    };

    // Envia mensagem
    const handleSend = async () => {
        const token = localStorage.getItem("token");
        if (input.trim() === "") return;

        const userMsg = { from: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        const messageToSend = input;
        setInput("");
        setLoading(true);

        try {
            let botReply = "";

            if (mode === "geral") {
                // CHAT GERAL 
                try {
                    const body = { message: messageToSend };
                    const response = await api.post("/chatbot/chat", body, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    botReply =
                        response.data?.response ||
                        response.data?.message ||
                        "Desculpe, não consegui entender. 😅, Tente novamente";

                    console.log("Resposta do kae:", botReply);
                } catch (error) {
                    console.error("Erro ao enviar mensagem geral:", error);
                    botReply = "Ocorreu um erro ao se conectar com o servidor.";
                }
            } else {
                // CHAT ASSISTENTE (AWS Lambda)
                try {
                    const lambdaResponse = await fetch(
                        "https://lrkb9tvss6.execute-api.us-east-2.amazonaws.com/default/bedrock-kb-lambda-ssmai",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ message: messageToSend }),
                        }
                    );

                    const data = await lambdaResponse.json();

                    botReply =
                        data?.body?.answer ||
                        data?.answer ||
                        "Desculpe, o assistente não conseguiu responder agora. 😅, Tente novamente";

                    console.log("Resposta chat do viado do joao:", botReply);
                } catch (error) {
                    console.error("Erro no chat assistente:", error);
                    botReply = "Erro ao conectar com o assistente.";
                }
            }
            // const parts = botReply.split("\n").filter((p) => p.trim() !== "");
            // const groupedParts = [];
            // for (let i = 0; i < parts.length; i += 5) {
            //     groupedParts.push(parts.slice(i, i + 4).join("\n"));
            // }
            // setMessages((prev) => [
            //     ...prev,
            //     ...parts.map((part) => ({ from: "bot", text: part })),
            // ]);
            setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full">
            {/* Navbar lateral */}
            <Navbar />

            {/* Conteúdo principal do Chat */}
            <div className=" relative flex flex-col flex-1 w-full py-28 px-0 lg:px-5 lg:py-0 min-h-screen bg-white overflow-x-hidden ml-0 lg:ml-52">
                {/* HEADER */}
                <div className="relative lg:fixed top-0 gap-4 lg:gap-0 flex flex-col lg:flex-row justify-between items-center mb-6 w-full lg:w-[1300px] px-6 py-4 bg-white">
                    <h1 className="text-2xl font-bold text-black uppercase">Chat-Bot</h1>

                    {/* BOTÕES DE MODO */}
                    <div className="flex gap-2 flex-col lg:flex-row">
                        <button
                            onClick={() => setMode("geral")}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all cursor-pointer  ${mode === "geral"
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Estoque Inteligente
                        </button>
                        <button
                            onClick={() => setMode("assistente")}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all cursor-pointer ${mode === "assistente"
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Chat Assistente
                        </button>
                    </div>
                </div>

                {/* MENSAGENS */}
                <div className="mt-4 lg:mt-20 flex flex-col gap-4 flex-1 overflow-y-auto p-4 bg-white rounded-2xl mx-0 lg:mx-6 mb-20">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] p-3 rounded-2xl text-sm ${msg.from === "user"
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                                    }`}
                            >
                                {/* --- dentro do map() onde renderiza msg --- */}
                                <div className="prose prose-sm max-w-none" style={{ whiteSpace: "pre-line" }}>
                                    {(() => {
                                        // converte quebras simples em quebra forçada do Markdown (dois espaços + \n)
                                        const formatted = String(msg.text || "").replace(/\r\n/g, "\n").replace(/\n/g, "  \n");
                                        return <ReactMarkdown>{formatted}</ReactMarkdown>;
                                    })()}
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="text-gray-400 text-sm">O bot está digitando...</div>
                    )}
                </div>

                {/* INPUT */}
                <div className="flex items-center gap-2 bg-white p-3 w-full lg:w-[1300px] fixed bottom-0 left-0 right-0 lg:left-52 px-2 lg:px-20">
                    <input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1 border w-full rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className={`bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        <Send size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
