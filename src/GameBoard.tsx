import { Board } from "./board/Board";

export const GameBoard: React.FC = () => {
    return (
        <div className="flex h-screen max-h-screen w-full items-center justify-center bg-neutral-200 dark:bg-neutral-900">
            <div className="grid aspect-square max-h-full max-w-screen-lg grid-cols-3 grid-rows-3 items-stretch justify-items-center p-8">
                {[...Array(9)].map((_, i) => (
                    <div
                        className={
                            "flex flex-1/3 border-black dark:border-neutral-500" +
                            (i % 3 !== 2 ? " border-r-4" : "") +
                            (i <= 5 ? " border-b-4" : "")
                        }
                    >
                        <Board key={i} />
                    </div>
                ))}
            </div>
        </div>
    );
};
