import { useState } from "react";
import { SquareState, BoardStatus, WINNING_COMBINATIONS } from "~/board/const";
import { Square } from "~/board/Square";

type BoardProps = {
    boardCord: number;
    player0Flag: boolean;
    swapPlayer: () => void;
    active: boolean;
    setActiveBoard: (i: number) => void;
    setBoardStatus: (boardStatus: BoardStatus) => void;
};

export const Board: React.FC<BoardProps> = ({
    boardCord,
    player0Flag,
    swapPlayer,
    active,
    setActiveBoard,
    setBoardStatus,
}) => {
    const [board, setBoard] = useState<SquareState[]>([
        SquareState.Open,
        SquareState.Open,
        SquareState.Open,
        SquareState.Open,
        SquareState.Open,
        SquareState.Open,
        SquareState.Open,
        SquareState.Open,
        SquareState.Open,
    ]);

    function boardStatusCheck(board: SquareState[]) {
        // Check if board is won
        const player0 = new Set();
        const player1 = new Set();
        for (const [index, squareStatus] of board.entries()) {
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
        squareCord: number,
        player0Flag: boolean,
        swapPlayer: () => void,
    ) {
        const nextBoard = board.map((square, i) =>
            i === squareCord
                ? player0Flag
                    ? SquareState.Player0
                    : SquareState.Player1
                : square,
        );
        setBoard(nextBoard);
        const currentBoardStatus = boardStatusCheck(nextBoard);
        setActiveBoard(
            squareCord == boardCord && currentBoardStatus ? -1 : squareCord,
        );
        swapPlayer();
    }
    return (
        <div className="flex aspect-square h-full max-h-full w-full items-center justify-center p-8">
            <div className="grid max-h-full w-full max-w-screen-lg grid-cols-3 grid-rows-3 items-stretch justify-items-center">
                {board.map((square, i) => (
                    <div
                        className={
                            "flex aspect-square w-full border-black opacity-70 dark:border-neutral-300" +
                            (i % 3 !== 2 ? " border-r-4" : "") +
                            (i <= 5 ? " border-b-4" : "")
                        }
                    >
                        <Square
                            key={i}
                            active={active}
                            squareState={square}
                            onClick={() =>
                                boardChangeHelper(i, player0Flag, swapPlayer)
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
