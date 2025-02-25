import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { GameBoard } from "./GameBoard.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Board">
                    <Route index element={<GameBoard />} />
                    <Route path="Multiplayer" element={<GameBoard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
