import { ReactNode, useReducer } from "react";
import {
    gameBoardReducer,
    GameContext,
    initialState,
} from "~/board/BoardReducer";

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(gameBoardReducer, initialState);
    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};
