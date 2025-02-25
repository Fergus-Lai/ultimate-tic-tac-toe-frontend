import { Board } from "./board/Board";

export const GameBoard: React.FC = () => {
    return (
        <div className="flex h-screen max-h-screen justify-center">
            <div className="flex h-full w-fit flex-col items-center justify-center divide-y-4 divide-black dark:divide-neutral-400">
                {[...Array(3)].map(() => (
                    <div className="flex min-h-0 w-fit grow flex-row items-center justify-center divide-x-4 divide-black dark:divide-neutral-400">
                        {[...Array(3)].map(() => (
                            <Board />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
