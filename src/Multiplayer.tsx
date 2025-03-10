import { GameProvider } from "~/board/GameProvider";
import { GameBoard } from "~/board/GameBoard";
import { useParams } from "react-router";

export const Multiplayer: React.FC = () => {
    const { roomID } = useParams();
    return (
        <GameProvider roomID={roomID}>
            <GameBoard />
        </GameProvider>
    );
};
