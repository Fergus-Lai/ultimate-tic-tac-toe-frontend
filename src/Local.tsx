import { GameProvider } from "./Board/GameProvider";
import { GameBoard } from "./Board/GameBoard";

export const Local: React.FC = () => {
    return (
        <GameProvider>
            <GameBoard />
        </GameProvider>
    );
};
