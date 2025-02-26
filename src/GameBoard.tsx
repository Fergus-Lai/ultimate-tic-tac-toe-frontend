import { useState } from "react";
import { Board } from "./board/Board";
import { BoardStatus } from "./board/enums";

export const GameBoard: React.FC = () => {
    const [player0Flag, setPlayer0Flag] = useState(true);
    const [activeBoard, setActiveBoard] = useState(-1);
    const [boardsStatus, setBoardsStatus] = useState<Map<number, BoardStatus>>(
        new Map(),
    );

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
                            swapPlayer={swapPlayer}
                            player0Flag={player0Flag}
                            active={activeBoard == i || activeBoard == -1}
                            setActiveBoard={setActiveBoard}
                            setBoardStatus={(newStatus: BoardStatus) =>
                                setBoardsStatus((prevBoardsStatus) =>
                                    new Map(prevBoardsStatus).set(i, newStatus),
                                )
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
