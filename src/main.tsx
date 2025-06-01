import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home";
import Lobby from "./multiplayer/Lobby";
import { BrowserRouter, Route, Routes } from "react-router";
import { Local } from "./Local";
import { Multiplayer } from "./multiplayer/Game";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Game">
                    <Route index element={<Local />} />
                    <Route path="Lobby" element={<Lobby />} />
                    <Route
                        path="Multiplayer/:roomID"
                        element={<Multiplayer />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
