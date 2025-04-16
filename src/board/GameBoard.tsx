import { NavLink } from "react-router";
import { Board } from "~/board/Board";
import { GameContext } from "~/board/BoardReducer";
import { useContext } from "react";
import { resetBoard } from "./Actions";

export const GameBoard: React.FC = () => {
    const { state, dispatch } = useContext(GameContext);

    const gameOverResultGetter = () => {
        switch (state.globalWinner) {
            case 0:
                return state.roomID ? "You Won" : "Player 1 Wins!";
            case 1:
                return state.roomID ? "You lost" : "Player 2 Wins!";
            case 2:
                return "Draw";
        }
    };

    const boardBgGetter = (i: number) => {
        switch (state.boardState[i].winner) {
            case 0:
                return " bg-red-300 dark:bg-red-900";
            case 1:
                return " bg-indigo-300 dark:bg-indigo-900";
            default:
                return "";
        }
    };

    return (
        <div className="flex h-full max-h-full w-full flex-col items-center bg-neutral-200 dark:bg-neutral-900">
            {state.globalWinner === null ? (
                <>
                    <div className="min-h-fit text-center text-neutral-800 dark:text-neutral-200">
                        {state.roomID
                            ? state.currentPlayer == 0
                                ? "Your "
                                : "Opponent's "
                            : `Player ${state.currentPlayer + 1}'s `}
                        Turn
                    </div>
                    <div className="grid aspect-square max-h-full w-full max-w-screen-lg grid-cols-3 grid-rows-3 items-stretch justify-items-center px-8">
                        {[...Array(9)].map((_, i) => (
                            <div
                                className={
                                    "flex w-full border-black opacity-70 dark:border-neutral-500" +
                                    (i % 3 !== 2 ? " border-r-4" : "") +
                                    (i <= 5 ? " border-b-4" : "") +
                                    (state.activeBoard == i
                                        ? " bg-green-300 dark:bg-green-950"
                                        : boardBgGetter(i))
                                }
                            >
                                <Board key={i} boardCord={i} />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex h-full flex-col items-center justify-center text-center text-neutral-800 dark:text-neutral-200">
                    <div className="text-3xl font-bold">Game Over</div>
                    <div className="text-3xl font-bold">
                        {gameOverResultGetter()}
                    </div>
                    <div className="flex flex-row gap-4 text-2xl">
                        <button
                            className="cursor-pointer rounded-3xl p-2 hover:bg-neutral-400 dark:hover:bg-neutral-700"
                            onClick={() => resetBoard(dispatch)}
                        >
                            Another Game
                        </button>
                        <NavLink
                            to="/"
                            className="rounded-3xl p-2 hover:bg-neutral-400 dark:hover:bg-neutral-700"
                        >
                            Home
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};
