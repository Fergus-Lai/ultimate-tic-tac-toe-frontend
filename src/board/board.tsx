import { useState } from "react";
import { SquareState } from "~/board/SquareState";
import { Square } from "~/board/Square";

export const Board: React.FC = () => {
    const [board, setBoard] = useState<SquareState[][]>([
        [SquareState.Player0, SquareState.Open, SquareState.Open],
        [SquareState.Open, SquareState.Open, SquareState.Open],
        [SquareState.Open, SquareState.Open, SquareState.Open],
    ]);

    function boardChangeHelper(
        rowCord: number,
        colCord: number,
        player: SquareState.Player0 | SquareState.Player1,
    ) {
        const nextBoard = board.map((row, i) =>
            row.map((square, j) =>
                i == rowCord && j == colCord ? player : square,
            ),
        );
        setBoard(nextBoard);
    }

    return (
        <div className="flex aspect-square h-full max-h-full w-full items-center justify-center p-8">
            <div className="flex h-full max-h-full w-full max-w-full flex-col divide-y-4 divide-black dark:divide-neutral-400">
                {board.map((row, i) => (
                    <div
                        key={"row " + i}
                        className="flex flex-row justify-center divide-x-4 divide-black dark:divide-neutral-400"
                    >
                        {row.map((square, j) => (
                            <Square
                                key={"square " + (i * 3 + j)}
                                squareState={square}
                                onClick={() =>
                                    boardChangeHelper(i, j, SquareState.Player0)
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
