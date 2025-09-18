import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext.jsx";
import {
  FiMenu,
  FiHome,
  FiStar,
  FiClock,
  FiList,
  FiMessageCircle,
  FiSettings,
  FiMessageSquare,
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

export default function Chatbot() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Olá! 👋 Como posso te ajudar hoje?" },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { palette, changePalette } = useTheme();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
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
      className="flex min-h-screen transition-colors duration-500"
      style={{ backgroundColor: palette.bg, color: palette.text }}
    >
      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "w-64" : "w-16"
        } p-4 flex flex-col h-screen sticky top-0 transition-all duration-300`}
        style={{ backgroundColor: palette.main, color: "white" }}
      >
        <div className="flex justify-between items-center mb-6">
          {menuOpen && (
            <span className="font-bold text-xl">Manual da Vida</span>
          )}
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
        <header
          className="flex justify-between items-center p-4 shadow-md border-b sticky top-0 z-20 transition-colors duration-500"
          style={{ backgroundColor: palette.main, borderColor: palette.accent }}
        >
          {/* Logo com clique para mudar paleta */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={changePalette}
          >
            <img
              src="/coruja_avatar.png"
              alt="Noctua"
              className="w-10 h-10 rounded-full object-cover hover:scale-110 transition-transform"
            />
            <span className="text-white font-bold text-lg">Noctua</span>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded font-semibold hover:brightness-110"
            style={{ backgroundColor: palette.accent, color: "#fff" }}
          >
            Login
          </button>
        </header>

        <main className="flex-1 flex flex-col p-6 relative">
          {/* Lista de mensagens com scroll */}
          <div className="flex-1 overflow-y-auto mb-4 flex flex-col space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg max-w-[70%] break-words whitespace-normal ${
                  msg.sender === "user"
                    ? "self-end bg-blue-500 text-white"
                    : "self-start bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input fixo relativo ao conteúdo */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="sticky bottom-0 flex items-center border-t p-4 bg-white z-10"
            style={{ backgroundColor: palette.bg }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 p-2 outline-none border rounded-lg"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 rounded text-white"
              style={{ backgroundColor: palette.accent }}
            >
              Enviar
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
