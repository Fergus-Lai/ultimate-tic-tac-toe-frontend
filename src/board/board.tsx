import { useState } from "react";
import { SquareState } from "~/board/SquareState";
import { Square } from "~/board/Square";

export const Board: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [board, setBoard] = useState<SquareState[][]>([
        [SquareState.Player0, SquareState.Open, SquareState.Open],
        [SquareState.Open, SquareState.Open, SquareState.Open],
        [SquareState.Open, SquareState.Open, SquareState.Open],
    ]);
    return (
        <div className="flex aspect-square h-full items-center justify-center">
            <div className="flex h-fit w-fit flex-col divide-y-4 divide-black dark:divide-neutral-400">
                {board.map((row) => (
                    <div className="gr flex flex-row justify-center divide-x-4 divide-black dark:divide-neutral-400">
                        {row.map((square) => (
                            <Square squareState={square}></Square>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
