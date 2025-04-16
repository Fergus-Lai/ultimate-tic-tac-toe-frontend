import { ReactNode, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { Bounce, toast, ToastContainer } from "react-toastify";
import {
    Board,
    gameBoardReducer,
    GameContext,
    initialState,
} from "~/board/BoardReducer";
import { socket } from "~/socket";

interface GameProviderProps {
    children: ReactNode;
    roomID?: string;
}

interface SocketError {
    message: string;
}

interface SocketBoardUpdate {
    board: Board[];
    turn: string;
}

export const GameProvider: React.FC<GameProviderProps> = ({
    roomID,
    children,
}) => {
    const [state, dispatch] = useReducer(gameBoardReducer, {
        ...initialState,
        roomID,
    });
    const [connected, setConnected] = useState(socket.connected);
    const [gameStarted, setGameStarted] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const onConnected = () => {
            setConnected(true);
            if (roomID) {
                socket.emit("joinGame", { roomID });
            }
        };
        const onDisconnected = () => {
            setConnected(false);
            setTimeout(function () {
                navigate("/Game/Lobby");
            }, 5000);
        };
        const onError = (data: SocketError) => {
            toast.error(data.message + ", redirecting to lobby", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            socket.disconnect();
        };
        const onGameStart = (data: SocketBoardUpdate) => {
            setGameStarted(true);
        };
        socket.on("connect", onConnected);
        socket.on("disconnect", onDisconnected);
        socket.on("gameStart", onGameStart);
        socket.on("error", onError);
        socket.connect();
        return () => {
            setGameStarted(false);
            socket.off("connect", onConnected);
            socket.off("disconnect", onDisconnected);
            socket.off("error", onError);
            socket.off("gameStart", onGameStart);
            socket.disconnect();
        };
    }, [roomID, navigate]);

    return (
        <>
            <ToastContainer />
            <GameContext.Provider value={{ state, dispatch }}>
                {roomID && !connected
                    ? "Connecting"
                    : roomID && !gameStarted
                      ? "Waiting for other player"
                      : children}
            </GameContext.Provider>
        </>
    );
};
