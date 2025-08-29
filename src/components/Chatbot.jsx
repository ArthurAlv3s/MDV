import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiStar,
  FiClock,
  FiList,
  FiMessageCircle,
  FiSettings,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";

const menuItems = [
  { name: "Início", icon: <FiHome />, path: "/" },
  { name: "Tutoriais", icon: <FiStar />, path: "/tutoriais" },
  { name: "Minhas Playlists", icon: <FiList />, path: "/playlists" },
  { name: "Chatbot", icon: <FiMessageSquare />, path: "/chatbot" },
  { name: "Histórico", icon: <FiClock />, path: "/historico" },
  { name: "Feedback", icon: <FiMessageCircle />, path: "/feedback" },
  { name: "Configuração", icon: <FiSettings />, path: "/config" },
];

const mainColor = "#1E293B";
const accentColor = "#38BDF8";
const bgLight = "#F1F5F9";

export default function Chatbot() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Olá! 👋 Como posso te ajudar hoje?" },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    // lógica de resposta do bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "O Manual da Vida (MDV) é um site pensado como um guia prático para a vida adulta. Nele, você encontra dicas, ferramentas e conteúdos organizados em tópicos claros, que vão de finanças pessoais, organização, saúde, estudo e carreira, até habilidades essenciais do dia a dia. A ideia é tornar a vida mais simples e autônoma, oferecendo orientação prática para situações cotidianas. Com uma interface simplória, o site permite que qualquer pessoa navegue facilmente, encontre informações relevantes e aplique o conhecimento no próprio ritmo, sem chamar atenção e sem atrapalhar sua concentração.",
        },
      ]);
    }, 1000);
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: bgLight, color: mainColor }}
    >
      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "w-64" : "w-16"
        } p-4 transition-all duration-300 flex flex-col`}
        style={{ backgroundColor: mainColor, color: "white" }}
      >
        <div className="flex justify-between items-center mb-6">
          {menuOpen && <span className="font-bold text-xl">Manual da Vida</span>}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hover:opacity-80"
          >
            <FiMenu size={24} />
          </button>
        </div>
        <nav className="flex-1">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="flex items-center mb-4 cursor-pointer hover:opacity-80 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              {menuOpen && <span className="ml-4">{item.name}</span>}
            </div>
          ))}
        </nav>
      </aside>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 shadow-md border-b bg-[#1E293B] border-gray-700">
          {/* Logo com imagem e texto */}
          <div className="flex items-center space-x-3">
            <img
              src="/coruja_avatar.png"
              alt="Noctua"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-white font-bold text-lg">Noctua</span>
          </div>

          {/* Botão de login */}
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded font-semibold hover:brightness-110"
            style={{ backgroundColor: accentColor, color: "#fff" }}
          >
            Login
          </button>
        </header>

        {/* Chat Area */}
        <main className="flex-1 p-6 flex flex-col justify-between relative">
          {/* Imagem de fundo */}
          <img
            src="./public/log.png"
            alt=""
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none"
            style={{ width: "300px", height: "auto" }}
          />

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 flex flex-col relative z-10">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end text-right"
                    : "bg-gray-200 text-gray-900 self-start text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center border rounded-lg p-2 bg-white relative z-10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 p-2 outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 px-4 py-2 rounded text-white"
              style={{ backgroundColor: accentColor }}
            >
              Enviar
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
