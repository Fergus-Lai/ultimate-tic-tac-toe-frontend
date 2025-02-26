import { useState } from "react";
import { SquareState, BoardStatus, WINNING_COMBINATIONS } from "~/board/const";
import { Square } from "~/board/Square";

type BoardProps = {
    cord: number;
    player0Flag: boolean;
    swapPlayer: () => void;
    active: boolean;
    setActiveBoard: (i: number) => void;
    setBoardStatus: (boardStatus: BoardStatus) => void;
};

export const Board: React.FC<BoardProps> = ({
    cord,
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

    function boardStatusCheck(board: SquareState[][]) {
        // Check if board is won
        const player0 = new Set();
        const player1 = new Set();
        for (const [index, squareStatus] of board.flat().entries()) {
            if (squareStatus == SquareState.Player0) player0.add(index);
            if (squareStatus == SquareState.Player1) player1.add(index);
        }
        for (const combination of WINNING_COMBINATIONS) {
            if (combination.isSubsetOf(player0)) {
                setBoardStatus(BoardStatus.Player0);
                return true;
            }
            if (combination.isSubsetOf(player1)) {
                setBoardStatus(BoardStatus.Player1);
                return true;
            }
        }
        if (player0.size + player1.size == 9) {
            setBoardStatus(BoardStatus.Draw);
            return true;
        }
        return false;
    }

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
        const currentBoardStatus = boardStatusCheck(nextBoard);
        const nextCord = rowCord * 3 + colCord;
        setActiveBoard(nextCord == cord && currentBoardStatus ? -1 : nextCord);
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
