import { ReactNode, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import {
    Board,
    gameBoardReducer,
    GameContext,
    getInitialState,
} from "./BoardReducer";
import { socket } from "../socket";
import { gameOver, setBoard } from "./Actions";
import { Loader } from "../multiplayer/Loader";
import { WaitingScreen } from "../multiplayer/WaitingScreen";
import { DEFAULT_TOAST_OPTION } from "~/toastOption";

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
    activeBoard: number | null;
}

interface SocketGameOver {
    winner: string;
}

export const GameProvider: React.FC<GameProviderProps> = ({
    roomID,
    children,
}) => {
    const [state, dispatch] = useReducer(gameBoardReducer, {
        ...getInitialState(),
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
            toast.error(
                data.message + ", redirecting to lobby",
                DEFAULT_TOAST_OPTION,
            );
            socket.disconnect();
        };
        const onGameStart = (data: SocketBoardUpdate) => {
            setGameStarted(true);
            const dataCurrentPlayer = data.turn == socket.id ? 0 : 1;
            setBoard(dispatch, {
                turn: dataCurrentPlayer,
                board: data.board,
                activeBoard: null,
            });
        };
        const onUpdateBoard = (data: SocketBoardUpdate) => {
            const dataCurrentPlayer = data.turn == socket.id ? 0 : 1;
            setBoard(dispatch, {
                turn: dataCurrentPlayer,
                board: data.board,
                activeBoard: data.activeBoard,
            });
        };
        const onGameOver = (data: SocketGameOver) => {
            const { winner } = data;
            const gameWinner =
                winner == "Opponent Left"
                    ? 3
                    : winner == "draw"
                      ? 2
                      : socket.id == winner
                        ? 0
                        : 1;
            gameOver(dispatch, { winner: gameWinner });
        };

        socket.on("connect", onConnected);
        socket.on("disconnect", onDisconnected);
        socket.on("gameStart", onGameStart);
        socket.on("updateBoard", onUpdateBoard);
        socket.on("gameOver", onGameOver);
        socket.on("error", onError);
        socket.connect();
        return () => {
            setGameStarted(false);
            socket.off("connect", onConnected);
            socket.off("disconnect", onDisconnected);
            socket.off("error", onError);
            socket.off("gameStart", onGameStart);
            socket.off("updateBoard", onUpdateBoard);
            socket.off("gameOver", onGameOver);
            socket.disconnect();
        };
    }, [roomID, navigate]);

    return (
        <>
            <ToastContainer />
            <GameContext.Provider value={{ state, dispatch }}>
                {roomID && !connected ? (
                    <Loader />
                ) : roomID && !gameStarted ? (
                    <WaitingScreen />
                ) : (
                    children
                )}
            </GameContext.Provider>
        </>
    );
};
