import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { Send } from "lucide-react";
import api from "../../api/api";
import ResponseAPI from "../../components/responseapi";

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("geral"); // 'geral' ou 'assistente'


    // Buscar histórico quando entra no modo "geral"
    useEffect(() => {
        if (mode === "geral") {
            fetchHistory();
        } else {
            setMessages([
                { from: "bot", text: "Olá! 👋 Sou o assistente da SSMAI, como posso ajudar?" },
            ]);
        }
    }, [mode]);

    // Função para buscar histórico
    const fetchHistory = async () => {
        try {
            const response = await api.get("/chatbot/history");
            const data = response.data;

            if (data?.conversations?.length > 0) {
                const formatted = data.conversations
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
            setMessages([
                { from: "bot", text: "❌ Erro ao carregar o histórico." },
            ]);
        }
    };

    // Função para enviar mensagens
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
                // 🔹 Envia pro backend (com token e modal de retorno)
                try {
                    const body = { message: messageToSend };
                    const response = await api.post("/chatbot/chat", body, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    botReply =
                        response.data?.response
                    console.log('backend kae') ||
                        response.data?.message ||
                        "Desculpe, não consegui entender. 😅";


                } catch (error) {
                    console.error("Erro ao enviar mensagem:", error);

                    botReply = "❌ Ocorreu um erro ao se conectar com o servidor.";
                }
            } else {
                // 🔹 Envia pro AWS Lambda
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
                    data?.body?.message
                console.log('backend kae')
                    ||
                    data?.message ||
                    "Desculpe, o assistente não conseguiu responder agora. 😅";
            }

            // adiciona resposta do bot
            setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full bg-white relative z-0">
            {/* Navbar */}
            <div className="z-50">
                <Navbar />
            </div>

            {/* Container principal */}
            <div className="flex flex-col flex-1 py-28 px-4 lg:py-10 min-h-screen bg-white overflow-hidden lg:ml-52 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 w-full px-10">
                    <h1 className="text-3xl font-bold text-black uppercase">Chat-Bot</h1>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setMode("geral")}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${mode === "geral"
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Chat Geral
                        </button>
                        <button
                            onClick={() => setMode("assistente")}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${mode === "assistente"
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Chat Assistente
                        </button>
                    </div>
                </div>

                {/* Mensagens */}
                <div className="flex flex-col gap-4 flex-1 overflow-y-auto p-4 max-h-[75vh] bg-gray-50 rounded-2xl">
                    {[...messages]
                        .sort((a, b) => b.id - a.id)
                        .map((msg, i) => (
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
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                    {loading && (
                        <div className="text-gray-400 text-sm">O bot está digitando...</div>
                    )}
                </div>


                {/* Input */}
                <div className="flex items-center gap-2 mt-4 bg-white p-3 fixed bottom-0 left-0 right-0 lg:static lg:rounded-xl lg:mt-4">
                    <input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1 border rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className={`bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition cursor-pointer flex justify-center items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
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
