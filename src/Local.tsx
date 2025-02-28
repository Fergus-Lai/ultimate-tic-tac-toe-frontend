import { GameProvider } from "~/board/GameProvider";
import { GameBoard } from "~/board/GameBoard";

export const Local: React.FC = () => {
    return (
        <GameProvider>
            <GameBoard />
        </GameProvider>
    );
};
