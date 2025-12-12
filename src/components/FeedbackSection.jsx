import React, { useState, useEffect } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

export default function FeedbackSection({ palette }) {
  const [open, setOpen] = useState(false);

  const [feedbacks, setFeedbacks] = useState([]);
  const [type, setType] = useState("outros");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState("");

  // Carrega feedbacks
  useEffect(() => {
    fetch("http://localhost:5000/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data.feedbacks || []))
      .catch((err) => console.log(err));
  }, []);

  // Enviar feedback
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
      alert("Obrigado pelo feedback!");
    } catch (err) {
      console.log(err);
      alert("Erro de conexão");
    }
  };

  const filtered = feedbacks.filter(
    (fb) =>
      fb.titulo.toLowerCase().includes(search.toLowerCase()) ||
      fb.mensagem.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="rounded-xl shadow-md mb-6 cursor-pointer transition-all"
      style={{ backgroundColor: palette.card }}
    >
      {/* Cabeçalho do card */}
          <div
            onClick={() => setOpen(!open)}
            className="p-4 flex justify-between items-center text-lg font-bold"
          >
            <span>Feedback</span>

            {/* Ícones modernos */}
            <span>
              {open ? <FiChevronUp size={26} /> : <FiChevronDown size={26} />}
            </span>
          </div>

      {/* Conteúdo interno */}
      {open && (
        <div className="px-6 pb-6">

          {/* Pesquisar */}
          <input
            type="text"
            placeholder="Pesquisar feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded w-full mb-4 bg-white text-black"
          />

          <h2 className="text-xl font-semibold mb-4">Enviar Feedback</h2>

          {/* Formulário */}
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
                  className={`cursor-pointer text-2xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <button
              type="submit"
              className="px-6 py-2 rounded font-semibold hover:brightness-110 text-white"
              style={{ backgroundColor: palette.accent }}
            >
              Enviar
            </button>
          </form>

          {/* Lista */}
          {filtered.length > 0 && (
            <div className="mt-6 space-y-3">
              <h2 className="text-xl font-bold">Seu Feedback</h2>

              {filtered.map((fb, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded shadow"
                  style={{ backgroundColor: palette.bg }}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">{fb.titulo}</span>
                    <span className="text-sm opacity-70">
                      {new Date(fb.criadoEm).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="mt-2">{fb.mensagem}</p>

                  <div className="text-yellow-400 mt-1">
                    {"★".repeat(fb.avaliacao)}
                    {"☆".repeat(5 - fb.avaliacao)}
                  </div>

                  <div className="text-sm opacity-70 mt-1">{fb.tipo}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
