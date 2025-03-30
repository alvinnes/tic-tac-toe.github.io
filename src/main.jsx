import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GameBoard from "./GameBoard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GameBoard />
  </StrictMode>
);
