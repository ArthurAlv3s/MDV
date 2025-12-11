import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext.jsx";
import { useAuth } from "./AuthContext.jsx";

import {
  FiMenu,
  FiHome,
  FiStar,
  FiClock,
  FiList,
  FiMessageCircle,
  FiMessageSquare,
  FiSettings,
  FiSearch
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

export default function Feedback() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [type, setType] = useState("outros");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { palette, changePalette } = useTheme();
  const { user, logout } = useAuth();

  // CARREGA feedbacks do banco — agora funciona porque você criou o GET
  useEffect(() => {
    fetch("http://localhost:5000/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data.feedbacks || []))
      .catch((err) => console.log(err));
  }, []);

  // Envia feedback
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !message || rating === 0) {
      alert("Preencha todos os campos e selecione uma avaliação!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: type,
          titulo: title,
          mensagem: message,
          avaliacao: rating,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Erro ao enviar feedback");
        return;
      }

      setFeedbacks([data.feedback, ...feedbacks]);
      setTitle("");
      setMessage("");
      setRating(0);
      alert("Obrigado pelo seu feedback!");
    } catch (err) {
      console.log(err);
      alert("Erro de conexão");
    }
  };

  // Filtro da lista
  const filteredFeedbacks = feedbacks.filter(
    (fb) =>
      fb.titulo.toLowerCase().includes(search.toLowerCase()) ||
      fb.mensagem.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: palette.bg, color: palette.text }}>
      {/* ==== SIDEBAR ==== */}
      <aside
        className={`${menuOpen ? "w-64" : "w-16"} p-4 transition-all duration-300 flex flex-col`}
        style={{ backgroundColor: palette.main, color: "white" }}
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

      {/* ==== CONTEÚDO PRINCIPAL ==== */}
      <main className="flex-1">
        {/* HEADER */}
        <header
          className="flex items-center p-4 shadow-md border-b sticky top-0 z-20"
          style={{ backgroundColor: palette.main }}
        >
          <div className="flex-1 flex items-center">
            <div className="flex items-center bg-white rounded-lg px-3 py-2 text-black w-64">
              <FiSearch />
              <input
                type="text"
                placeholder="Pesquisar feedback..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ml-2 w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/arvore.png"
              alt="Logo"
              className="h-20 w-auto cursor-pointer hover:scale-110 transition-transform"
              onClick={changePalette}
            />
          </div>

          <div className="flex-1 flex justify-end items-center space-x-5">
            <a href="#" className="text-white">Quer ser um patrocinador?</a>
            <a href="#" className="text-white">Quer ser um Tutor?</a>

            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.fotoPerfil || "https://via.placeholder.com/40"}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                  onClick={() => navigate("/config")}
                />

                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="px-3 py-1 rounded font-semibold hover:brightness-110"
                  style={{ backgroundColor: palette.accent, color: "#fff" }}
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded font-semibold hover:brightness-110"
                style={{ backgroundColor: palette.accent, color: "#fff" }}
              >
                Login
              </button>
            )}
          </div>
        </header>

        {/* ==== CONTEÚDO DA PÁGINA ==== */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Feedback</h1>

          {/* FORM */}
          <div className="p-6 rounded-lg shadow-md mb-8" style={{ backgroundColor: palette.card }}>
            <h2 className="text-xl font-bold mb-4">Enviar Feedback</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="px-4 py-2 rounded border w-1/3"
                >
                  <option value="bug">Bug</option>
                  <option value="elogio">Elogio</option>
                  <option value="outros">Outro</option>
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
              </div>

              <button
                type="submit"
                className="px-6 py-2 rounded font-semibold hover:brightness-110"
                style={{ backgroundColor: palette.accent, color: "#fff" }}
              >
                Enviar
              </button>
            </form>
          </div>

          {/* LISTA */}
          {filteredFeedbacks.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-2">Seu Feedback</h2>

              {filteredFeedbacks.map((fb, idx) => (
                <div key={idx} className="p-4 rounded-lg shadow-md" style={{ backgroundColor: palette.card }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{fb.titulo}</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(fb.criadoEm).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="mb-2">{fb.mensagem}</p>

                  <span className="text-yellow-400">
                    {"★".repeat(fb.avaliacao)}
                    {"☆".repeat(5 - fb.avaliacao)}
                  </span>

                  <div className="text-sm text-gray-500 mt-1">{fb.tipo}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
