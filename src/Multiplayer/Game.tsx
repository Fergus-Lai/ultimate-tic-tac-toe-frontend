import { useParams } from "react-router";
import { GameProvider } from "~/board/GameProvider";
import { GameBoard } from "~/board/GameBoard";

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
