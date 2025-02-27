import { useState } from "react";
import { Board } from "~/board/Board";
import { BoardStatus, WINNING_COMBINATIONS } from "~/board/const";

export const GameBoard: React.FC = () => {
    const [player0Flag, setPlayer0Flag] = useState(true);
    const [activeBoard, setActiveBoard] = useState(-1);
    const [boardsStatus, setBoardsStatus] = useState<Map<number, BoardStatus>>(
        new Map(),
    );
    const [gameBoardStatus, setGameBoardStatus] = useState<BoardStatus | null>(
        null,
    );

    const gameOverResultGetter = () => {
        switch (gameBoardStatus) {
            case BoardStatus.Draw:
                return "Draw";
            case BoardStatus.Player0:
                return "Player 1 Wins!";
            case BoardStatus.Player1:
                return "Player 2 Wins!";
        }
    };

    const setActiveBoardHelper = (i: number) => {
        setActiveBoard(i == -1 || boardsStatus.has(i) ? -1 : i);
    };

    const setBoardStatusHelper = (i: number, newStatus: BoardStatus) => {
        const newBoard = new Map(boardsStatus).set(i, newStatus);
        setBoardsStatus(newBoard);
        checkBoardWin(newBoard);
    };

    const checkBoardWin = (board: Map<number, BoardStatus>) => {
        const player0 = new Set<number>();
        const player1 = new Set<number>();

        for (const [index, boardStatus] of board.entries()) {
            if (boardStatus == BoardStatus.Player0) player0.add(index);
            if (boardStatus == BoardStatus.Player1) player1.add(index);
        }

        for (const combination of WINNING_COMBINATIONS) {
            if (combination.isSubsetOf(player0)) {
                setGameBoardStatus(BoardStatus.Player0);
                return;
            } else if (combination.isSubsetOf(player1)) {
                setGameBoardStatus(BoardStatus.Player1);
                return;
            }
        }
        if (player0.size + player1.size == 9) {
            setGameBoardStatus(BoardStatus.Draw);
            return;
        }
    };

    const boardBgGetter = (i: number) => {
        switch (boardsStatus.get(i)) {
            case BoardStatus.Player0:
                return " bg-red-900";
            case BoardStatus.Player1:
                return " bg-blue-900";
            default:
                return "";
        }
    };

    const swapPlayer = () => setPlayer0Flag(!player0Flag);
    return (
        <div className="flex h-full max-h-full w-full flex-col items-center bg-neutral-200 dark:bg-neutral-900">
            {!gameBoardStatus ? (
                <>
                    <div className="min-h-fit text-center text-neutral-800 dark:text-neutral-200">
                        Player {player0Flag ? "1" : "2"}'s Turn
                    </div>
                    <div className="grid aspect-square max-h-full w-full max-w-screen-lg grid-cols-3 grid-rows-3 items-stretch justify-items-center px-8">
                        {[...Array(9)].map((_, i) => (
                            <div
                                className={
                                    "flex w-full border-black opacity-70 dark:border-neutral-500" +
                                    (i % 3 !== 2 ? " border-r-4" : "") +
                                    (i <= 5 ? " border-b-4" : "") +
                                    (activeBoard == i ? " bg-green-950" : "") +
                                    boardBgGetter(i)
                                }
                            >
                                <Board
                                    key={i}
                                    cord={i}
                                    swapPlayer={swapPlayer}
                                    player0Flag={player0Flag}
                                    active={
                                        !boardsStatus.has(i) &&
                                        (activeBoard == i || activeBoard == -1)
                                    }
                                    setActiveBoard={setActiveBoardHelper}
                                    setBoardStatus={(newStatus: BoardStatus) =>
                                        setBoardStatusHelper(i, newStatus)
                                    }
                                />
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
                </div>
            )}
        </div>
    );
};
