import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { GameProvider } from "~/board/GameProvider";
import { GameBoard } from "~/board/GameBoard";
import { socket } from "~/socket";

export const Multiplayer: React.FC = () => {
    const { roomID } = useParams();
    const [connected, setConnected] = useState(socket.connected);
    useEffect(() => {
        const onConnected = () => {
            setConnected(true);
            if (roomID) {
                socket.emit("joinGame", { roomID });
            }
        };
        const onDisconnected = () => {
            setConnected(false);
        };
        socket.on("connect", onConnected);
        socket.on("disconnect", onDisconnected);
        return () => {
            socket.off("connect", onConnected);
            socket.off("disconnect", onDisconnected);
        };
    }, [roomID]);
    return (
        <>
            {connected ? (
                <GameProvider roomID={roomID}>
                    <GameBoard />
                </GameProvider>
            ) : (
                <div>Connecting</div>
            )}
        </>
    );
};
