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
} from "react-icons/fi";

const menuItems = [
  { name: "Início", icon: <FiHome />, path: "/" },
  { name: "Tutoriais", icon: <FiStar />, path: "/tutoriais" },
  { name: "Minhas Playlists", icon: <FiList />, path: "/playlists" },
  { name: "Chatbot", icon: <FiMessageCircle />, path: "/chatbot" },
  { name: "Histórico", icon: <FiClock />, path: "/historico" },
  { name: "Feedback", icon: <FiMessageCircle />, path: "/feedback" },
  { name: "Configuração", icon: <FiSettings />, path: "/config" },
];

const mainColor = "#1E293B";
const bgLight = "#F1F5F9";
const accentColor = "#38BDF8";

export default function Feedback() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [type, setType] = useState("Sugestão");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !message) return;
    const newFeedback = { type, title, message, rating, date: new Date().toLocaleDateString() };
    setFeedbacks([newFeedback, ...feedbacks]);
    setTitle("");
    setMessage("");
    setRating(0);
    alert("Obrigado pelo seu feedback!");
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: bgLight, color: mainColor }}>
      {/* Sidebar */}
      <aside
        className={`${menuOpen ? "w-64" : "w-16"} p-4 transition-all duration-300 flex flex-col`}
        style={{ backgroundColor: mainColor, color: "white" }}
      >
        <div className="flex justify-between items-center mb-6">
          {menuOpen && <span className="font-bold text-xl">MDV</span>}
          <button onClick={() => setMenuOpen(!menuOpen)} className="hover:opacity-80">
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
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Feedback</h1>

        {/* Formulário */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Enviar Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-2 rounded border w-1/3"
              >
                <option value="Sugestão">Sugestão</option>
                <option value="Bug">Bug</option>
                <option value="Elogio">Elogio</option>
                <option value="Outro">Outro</option>
              </select>
              <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2 rounded border flex-1"
              />
            </div>
            <textarea
              placeholder="Mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 rounded border"
              rows={4}
            />
            {/* Avaliação por estrelas */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-gray-500">Sua avaliação</span>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Lista de feedbacks enviados */}
        {feedbacks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2">Seus Feedbacks</h2>
            {feedbacks.map((fb, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{fb.title}</span>
                  <span className="text-gray-500 text-sm">{fb.date}</span>
                </div>
                <p className="mb-2">{fb.message}</p>
                <span className="text-yellow-400">{'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}</span>
                <div className="text-sm text-gray-500 mt-1">{fb.type}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
