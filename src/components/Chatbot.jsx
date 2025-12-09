import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext.jsx";
import { useAuth } from "./AuthContext.jsx";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  FiMenu,
  FiHome,
  FiStar,
  FiClock,
  FiList,
  FiMessageCircle,
  FiSettings,
  FiMessageSquare,
  FiTrash2,
  FiSend,
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
    {
      sender: "bot",
      text: "Olá! 👋 Eu sou a Noctua, sua assistente do Manual da Vida! Posso te ajudar com dúvidas sobre vida adulta, finanças, organização, saúde, carreira e muito mais. Como posso te ajudar hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { palette, changePalette } = useTheme();
  const { user, token, logout } = useAuth();

  const messagesEndRef = useRef(null);
  const genAI = useRef(null);

  // Inicializa o Gemini AI
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      genAI.current = new GoogleGenerativeAI(apiKey);
    } else {
      console.error("Chave da API do Gemini não encontrada!");
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Função para enviar mensagem ao Gemini
  const handleSend = async () => {
    if (input.trim() === "" || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setLoading(true);

    try {
      if (!genAI.current) {
        throw new Error("API do Gemini não inicializada");
      }

      const model = genAI.current.getGenerativeModel({ model: "gemini-1.5-pro-latest" });


      // Contexto personalizado para o Manual da Vida
      const prompt = `Você é a Noctua, uma assistente virtual amigável e prestativa do site "Manual da Vida" (MDV). 
Seu objetivo é ajudar pessoas com questões práticas da vida adulta, incluindo:
- Finanças pessoais e orçamento
- Organização e produtividade
- Saúde física e mental
- Carreira e estudos
- Habilidades do dia a dia
- Relacionamentos e comunicação

Responda de forma clara, objetiva e empática. Use linguagem acessível e exemplos práticos quando possível.

Pergunta do usuário: ${userMessage}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botReply = response.text();

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Erro ao chamar Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente. 😔",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Limpar conversa
  const limparConversa = () => {
    setMessages([
      {
        sender: "bot",
        text: "Conversa limpa! Como posso te ajudar agora? 😊",
      },
    ]);
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
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header
          className="flex items-center p-4 shadow-md border-b sticky top-0 z-20 transition-colors duration-500"
          style={{ backgroundColor: palette.main, borderColor: palette.accent }}
        >
          <div className="flex-1"></div>

          {/* Logo com nome da assistente */}
          <div className="flex-1 flex justify-center items-center space-x-3">
            <img
              src="/coruja_avatar.png"
              alt="Noctua"
              className="w-12 h-12 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform"
              onClick={changePalette}
            />
            <div className="text-white">
              <div className="font-bold text-lg">Noctua</div>
              <div className="text-xs opacity-80">Assistente Virtual</div>
            </div>
          </div>

          <div className="flex-1 flex justify-end items-center space-x-5 text-white">
            <button
              onClick={limparConversa}
              className="px-3 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
              title="Limpar conversa"
            >
              <FiTrash2 />
              {menuOpen && <span className="text-sm">Limpar</span>}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.fotoPerfil || "https://via.placeholder.com/40"}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                  onClick={() => navigate("/perfil")}
                />
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="px-3 py-1 rounded font-semibold hover:brightness-110"
                  style={{ backgroundColor: palette.accent }}
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded font-semibold hover:brightness-110"
                style={{ backgroundColor: palette.accent }}
              >
                Login
              </button>
            )}
          </div>
        </header>

        {/* Área de mensagens */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Lista de mensagens com scroll */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-4 rounded-2xl max-w-[75%] break-words shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src="/coruja_avatar.png"
                        alt="Noctua"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs font-semibold text-gray-600">
                        Noctua
                      </span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 p-4 rounded-2xl border border-gray-200 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input fixo no final */}
          <div
            className="border-t p-4 bg-white"
            style={{ backgroundColor: palette.bg }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3 max-w-4xl mx-auto"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                disabled={loading}
                className="flex-1 p-3 outline-none border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={loading || input.trim() === ""}
                className="px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                style={{
                  backgroundColor: loading ? "#999" : palette.accent,
                }}
              >
                <FiSend />
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}