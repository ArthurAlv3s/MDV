import React, { useState, useEffect } from "react";
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
const mainColor = "#1E293B";
const accentColor = "#38BDF8";
const bgLight = "#F1F5F9";

export default function Tutoriais() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortByDate, setSortByDate] = useState("desc");
  const [visibleTutorials, setVisibleTutorials] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    <div className="flex min-h-screen" style={{ backgroundColor: bgLight, color: mainColor }}>
      {/* Sidebar */}
      <aside className={`${menuOpen ? "w-64" : "w-16"} p-4 transition-all duration-300 flex flex-col`} style={{ backgroundColor: mainColor, color: "white" }}>
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 shadow-md border-b" style={{ backgroundColor: mainColor }}>
          <input
            type="text"
            placeholder="Pesquisar tutoriais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded w-full max-w-md border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button
            onClick={() => navigate("/login")}
            className="ml-4 px-4 py-2 rounded font-semibold hover:brightness-110"
            style={{ backgroundColor: accentColor, color: "#fff" }}
          >
            Login
          </button>
        </header>

        {/* Main */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Tutoriais</h1>

          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 rounded border bg-white">
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <select value={sortByDate} onChange={(e) => setSortByDate(e.target.value)} className="px-4 py-2 rounded border bg-white">
              <option value="desc">Mais Recentes</option>
              <option value="asc">Mais Antigos</option>
            </select>
          </div>

          {/* Grid de tutoriais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTutorials.map((tutorial, idx) => (
              <div key={`${tutorial.title}-${idx}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={tutorial.img} alt={tutorial.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="font-bold text-lg">{tutorial.title}</h2>
                  <p className="text-sm text-gray-500">{tutorial.category} • {new Date(tutorial.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button onClick={loadMore} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                Carregar Mais
              </button>
            </div>
          )}

          {!hasMore && <p className="text-gray-500 text-center mt-6">Fim dos resultados</p>}
        </main>
      </div>
    </div>
  );
}
