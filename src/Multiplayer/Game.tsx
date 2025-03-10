import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { GameProvider } from "~/board/GameProvider";
import { GameBoard } from "~/board/GameBoard";
import { socket } from "~/socket";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface SocketError {
    message: string;
}

export const Multiplayer: React.FC = () => {
    const { roomID } = useParams();
    const [connected, setConnected] = useState(socket.connected);
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
                console.log("I");
                window.location.replace("/Game/Lobby");
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
        socket.on("connect", onConnected);
        socket.on("disconnect", onDisconnected);
        socket.on("error", onError);
        socket.connect();
        return () => {
            socket.off("connect", onConnected);
            socket.off("disconnect", onDisconnected);
            socket.off("error", onError);
            socket.disconnect();
        };
    }, [roomID, navigate]);
    return (
        <>
            <ToastContainer />
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
