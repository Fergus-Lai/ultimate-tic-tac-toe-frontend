import { useContext } from "react";
import { Square } from "~/board/Square";
import { GameContext } from "~/board/BoardReducer";
import { makeMove } from "./Actions";

type BoardProps = {
    boardCord: number;
};

export const Board: React.FC<BoardProps> = ({ boardCord }) => {
    const { state, dispatch } = useContext(GameContext);
    const board = state.boardState[boardCord];

    return (
        <div className="flex aspect-square h-full max-h-full w-full items-center justify-center p-8">
            <div className="grid max-h-full w-full max-w-screen-lg grid-cols-3 grid-rows-3 items-stretch justify-items-center">
                {board.cells.map((square, i) => (
                    <div
                        className={
                            "flex aspect-square w-full border-black opacity-70 dark:border-neutral-300" +
                            (i % 3 !== 2 ? " border-r-4" : "") +
                            (i <= 5 ? " border-b-4" : "")
                        }
                    >
                        <Square
                            key={i}
                            active={
                                board.winner === null &&
                                (state.activeBoard === null ||
                                    state.activeBoard === boardCord)
                            }
                            squareState={square}
                            onClick={() =>
                                makeMove(dispatch, {
                                    cellIndex: i,
                                    boardIndex: boardCord,
                                })
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
