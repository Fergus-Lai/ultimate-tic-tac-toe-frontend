import { useState } from "react";
import { SquareState, BoardStatus } from "~/board/enums.ts";
import { Square } from "~/board/Square";

type BoardProps = {
    player0Flag: boolean;
    swapPlayer: () => void;
    active: boolean;
    setActiveBoard: React.Dispatch<React.SetStateAction<number>>;
    setBoardStatus: (boardStatus: BoardStatus) => void;
};

export const Board: React.FC<BoardProps> = ({
    player0Flag,
    swapPlayer,
    active,
    setActiveBoard,
    setBoardStatus,
}) => {
    const [board, setBoard] = useState<SquareState[][]>([
        [SquareState.Open, SquareState.Open, SquareState.Open],
        [SquareState.Open, SquareState.Open, SquareState.Open],
        [SquareState.Open, SquareState.Open, SquareState.Open],
    ]);

    function boardChangeHelper(
        rowCord: number,
        colCord: number,
        player0Flag: boolean,
        swapPlayer: () => void,
    ) {
        const nextBoard = board.map((row, i) =>
            row.map((square, j) =>
                i == rowCord && j == colCord
                    ? player0Flag
                        ? SquareState.Player0
                        : SquareState.Player1
                    : square,
            ),
        );
        setBoard(nextBoard);
        setActiveBoard(rowCord * 3 + colCord);
        swapPlayer();
    }

    return (
        <div className="flex aspect-square h-full max-h-full w-full items-center justify-center p-8">
            <div className="flex h-full max-h-full w-full max-w-full flex-col divide-y-4 divide-black dark:divide-neutral-300">
                {board.map((row, i) => (
                    <div
                        key={"row " + i}
                        className="flex w-full flex-row justify-center divide-x-4 divide-black dark:divide-neutral-400"
                    >
                        {row.map((square, j) => (
                            <Square
                                key={"square " + (i * 3 + j)}
                                active={active}
                                squareState={square}
                                onClick={() =>
                                    boardChangeHelper(
                                        i,
                                        j,
                                        player0Flag,
                                        swapPlayer,
                                    )
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
