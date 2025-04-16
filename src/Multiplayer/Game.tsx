import { useParams } from "react-router";
import { GameProvider } from "../Board/GameProvider";
import { GameBoard } from ".././Board/GameBoard";

export const Multiplayer: React.FC = () => {
    const { roomID } = useParams();
    return (
        <>
            <GameProvider roomID={roomID}>
                <GameBoard />
            </GameProvider>
        </>
    );
};
