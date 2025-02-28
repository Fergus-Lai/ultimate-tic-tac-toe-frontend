import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { GameBoard } from "./board/GameBoard.tsx";
import { Local } from "~/Local.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Board">
                    <Route index element={<Local />} />
                    <Route path="Multiplayer" element={<GameBoard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
