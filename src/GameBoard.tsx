import { Board } from "./board/Board";

export const GameBoard: React.FC = () => {
    return (
        <div className="flex h-screen max-h-screen w-full items-center justify-center p-4">
            <div className="grid max-w-screen-lg grid-cols-3 grid-rows-3 p-8">
                {[...Array(9)].map((_, i) => (
                    <div
                        className={
                            "flex flex-1/3" +
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
