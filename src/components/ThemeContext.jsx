import React, { createContext, useContext, useState } from "react";

// Defina todas as paletas que serão usadas no app
const colorPalettes = [
  {
    name: "Azul",
    main: "#1E293B",
    accent: "#38BDF8",
    bg: "#F1F5F9",
    text: "#1E293B",
    card: "#FFFFFF",
  },
  {
    name: "Vinho",
    main: "#581C1C",
    accent: "#E11D48",
    bg: "#FDE2E4",
    text: "#3B0A0A",
    card: "#FFF0F3",
  },
  {
    name: "Verde",
    main: "#064E3B",
    accent: "#10B981",
    bg: "#D1FAE5",
    text: "#052E16",
    card: "#ECFDF5",
  },
];

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [paletteIndex, setPaletteIndex] = useState(0);

  // Função para mudar a paleta (vai circular pelas opções)
  const changePalette = () => {
    setPaletteIndex((prev) => (prev + 1) % colorPalettes.length);
  };

  // paleta atual
  const palette = colorPalettes[paletteIndex];

  return (
    <ThemeContext.Provider value={{ palette, changePalette }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para acessar facilmente em qualquer componente
export const useTheme = () => useContext(ThemeContext);
