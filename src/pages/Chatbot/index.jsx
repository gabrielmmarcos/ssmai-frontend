import { useState } from "react";
import Navbar from "../../components/navbar";
import { Send } from "lucide-react";

function Chatbot() {
    const [messages, setMessages] = useState([
        { from: "bot", text: "Olá! 👋 Como posso te ajudar hoje?" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() === "") return;

        // adiciona a mensagem do usuário
        const newMessage = { from: "user", text: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");

        // simula resposta do bot
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    from: "bot",
                    text: "Interessante! Me conte mais sobre isso. 🤖",
                },
            ]);
        }, 800);
    };

    return (
        <div className="flex w-full bg-white relative z-0">
            {/* Navbar com z-index alto */}
            <div className="z-50">
                <Navbar />
            </div>

            {/* Container principal */}
            <div className="flex flex-col flex-1 py-28 px-4 lg:py-10 min-h-screen bg-white overflow-hidden lg:ml-52 relative">
                {/* Título */}
                <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center uppercase">
                    Chat-Bot
                </h1>

                {/* Área de mensagens */}
                <div className="flex flex-col gap-4 flex-1 overflow-y-auto p-4 max-h-[75vh]">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"
                                }`}
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
                </div>

                {/* Input fixo (teclado) */}
                <div className="flex items-center gap-2 mt-4 bg-white p-3 fixed bottom-0 left-0 right-0 lg:static lg:rounded-xl  lg:mt-4">
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
                        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition cursor-pointer justify-center items-center flex"
                    >
                        <Send size={30} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
