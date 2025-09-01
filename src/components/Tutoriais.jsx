import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext.jsx";
import {
  FiMenu,
  FiHome,
  FiStar,
  FiClock,
  FiList,
  FiMessageCircle,
  FiMessageSquare,
  FiSettings,
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

const allTutorials = [
  { title: "Como organizar seus estudos", category: "Produtividade", date: "2024-08-01", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b" },
  { title: "Aprenda a usar planilhas no dia a dia", category: "Tecnologia", date: "2024-07-15", img: "https://images.unsplash.com/photo-1581090700227-4c4f50b1d6c5" },
  { title: "Dicas rápidas de produtividade", category: "Produtividade", date: "2024-09-02", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d" },
  { title: "Guia básico de finanças pessoais", category: "Finanças", date: "2024-06-20", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f" },
  { title: "Aprenda a escrever melhor", category: "Comunicação", date: "2024-08-20", img: "https://images.unsplash.com/photo-1509057199576-632a47484ece" },
  { title: "Como pesquisar com eficiência", category: "Estudos", date: "2024-09-05", img: "https://images.unsplash.com/photo-1498079022511-d15614cb1c02" },
];

const categories = ["Todos", "Produtividade", "Tecnologia", "Finanças", "Comunicação", "Estudos"];
const PAGE_SIZE = 6;

export default function Tutoriais() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortByDate, setSortByDate] = useState("desc");
  const [visibleTutorials, setVisibleTutorials] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { palette, changePalette } = useTheme(); // usa o tema do context
  const [menuOpen, setMenuOpen] = useState(true);


  const filteredTutorials = allTutorials
    .filter(t => (selectedCategory === "Todos" || t.category === selectedCategory) &&
      t.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortByDate === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
    );

  useEffect(() => {
    setPage(1);
    setVisibleTutorials(filteredTutorials.slice(0, PAGE_SIZE));
  }, [selectedCategory, sortByDate, searchTerm]);

  const loadMore = () => {
    const nextPage = page + 1;
    const nextTutorials = filteredTutorials.slice(0, nextPage * PAGE_SIZE);
    setVisibleTutorials(nextTutorials);
    setPage(nextPage);
  };

  const hasMore = visibleTutorials.length < filteredTutorials.length;

  return (
    <div className="flex" style={{ backgroundColor: palette.bg, color: palette.text }}>
      {/* Sidebar fixa */}
      <aside
        className={`fixed top-0 left-0 h-screen ${menuOpen ? "w-64" : "w-16"} p-4 flex flex-col transition-all duration-300`}
        style={{ backgroundColor: palette.main, color: "white" }}
      >
        <div className="flex justify-between items-center mb-6">
          {menuOpen && <span className="font-bold text-xl">Manual da Vida</span>}
          <button onClick={() => setMenuOpen(!menuOpen)} className="hover:opacity-80">
            <FiMenu size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-auto">
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

      {/* Conteúdo principal */}
      <div className={`flex-1 ml-${menuOpen ? "64" : "16"} flex flex-col`} style={{ marginLeft: menuOpen ? "16rem" : "4rem" }}>
        {/* Header fixo */}
        <header
          className="fixed top-0 left-0 right-0 flex items-center p-4 shadow-md z-10"
          style={{ backgroundColor: palette.main, marginLeft: menuOpen ? "16rem" : "4rem" }}
        >
          <div className="flex-1 flex">
            <input
              type="text"
              placeholder="Pesquisar tutoriais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded w-full max-w-md border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/arvore.png"
              alt="Logo"
              className="h-20 w-auto cursor-pointer hover:scale-110 transition-transform"
              onClick={changePalette} // aqui
            />
          </div>

          <div className="flex-1 flex justify-end items-center space-x-5">
            <a href="./" className="text-white">Quer ser um patrocinador?</a>
            <a href="./" className="text-white">Quer ser um Tutor?</a>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded font-semibold hover:brightness-110"
              style={{ backgroundColor: palette.accent, color: "#fff" }}
            >
              Login
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 mt-32 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Tutoriais</h1>

          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded border bg-white"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <select
              value={sortByDate}
              onChange={(e) => setSortByDate(e.target.value)}
              className="px-4 py-2 rounded border bg-white"
            >
              <option value="desc">Mais Recentes</option>
              <option value="asc">Mais Antigos</option>
            </select>
          </div>

          {/* Grid de tutoriais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTutorials.map((tutorial, idx) => (
              <div key={`${tutorial.title}-${idx}`} className="rounded-lg shadow-md overflow-hidden" style={{ backgroundColor: palette.card }}>
                <img src={tutorial.img} alt={tutorial.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="font-bold text-lg">{tutorial.title}</h2>
                  <p className="text-sm" style={{ color: palette.text }}>{tutorial.category} • {new Date(tutorial.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button onClick={loadMore} className="px-4 py-2 rounded hover:brightness-110" style={{ backgroundColor: palette.accent, color: "#fff" }}>
                Carregar Mais
              </button>
            </div>
          )}

          {!hasMore && <p className="text-center mt-6" style={{ color: palette.text }}>Fim dos resultados</p>}
        </main>
      </div>
    </div>
  );
}
