import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiUser } from "react-icons/fi";

export default function UserInfoSection({
  palette,
  user,
  handlePhotoUpload,
  salvarNome
}) {
  const [editNomeOpen, setEditNomeOpen] = useState(false);
  const [userInfoOpen, setUserInfoOpen] = useState(true);
  const [novoNome, setNovoNome] = useState(user?.nome || "");

  return (
    <div className="rounded-xl shadow-md mb-6" style={{ backgroundColor: palette.card }}>
      {/* BOTÃO EXPANSÍVEL */}
      <button
        onClick={() => setUserInfoOpen(!userInfoOpen)}
        className="w-full flex justify-between items-center p-6 cursor-pointer"
      >
        <span className="text-lg font-bold">Informações do Usuário</span>
        {userInfoOpen ? <FiChevronUp size={28} /> : <FiChevronDown size={28} />}
      </button>

      {/* CONTEÚDO EXPANDIDO */}
      {userInfoOpen && (
        <div className="p-6 pt-0">
          <p>
            <strong>Nome:</strong> {user?.nome}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          {/* BOTÕES */}
          <div className="flex gap-4 mt-6">
            {/* FOTO */}
            <label className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer flex items-center gap-2">
              <FiUser /> Alterar Foto
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>

            {/* ALTERAR NOME */}
            <button
              onClick={() => {
                setEditNomeOpen(!editNomeOpen);
                setNovoNome(user?.nome || "");
              }}
              className="px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2"
            >
              <FiUser /> Alterar Nome
            </button>
          </div>

          {/* CAMPO DE ALTERAR NOME */}
          {editNomeOpen && (
            <div className="mt-4 p-4 rounded" style={{ backgroundColor: palette.input }}>
              <label className="font-semibold">Novo nome:</label>
              <input
                type="text"
                className="w-full p-2 rounded mt-2"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                autoFocus
              />
              <button
                onClick={() => salvarNome(novoNome, () => setEditNomeOpen(false))}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Salvar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
