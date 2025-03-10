import { ReactNode, useReducer } from "react";
import {
    gameBoardReducer,
    GameContext,
    initialState,
} from "~/board/BoardReducer";

interface GameProviderProps {
    children: ReactNode;
    roomID?: string;
}

export const GameProvider: React.FC<GameProviderProps> = ({
    roomID,
    children,
}) => {
    const [state, dispatch] = useReducer(gameBoardReducer, {
        ...initialState,
        roomID,
    });
    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};
