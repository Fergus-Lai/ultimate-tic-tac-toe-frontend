import { NavLink } from "react-router";

function Home() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
            <div className="text-4xl font-bold">Ultimate Tic Tac Toe</div>
            <NavLink
                to="/Game"
                className="flex w-1/4 items-center justify-center rounded-3xl bg-neutral-700 p-2 text-neutral-200 hover:bg-neutral-400 dark:hover:bg-neutral-500"
            >
                Local
            </NavLink>
            <NavLink
                to="/Game/Lobby"
                className="flex w-1/4 items-center justify-center rounded-3xl bg-neutral-700 p-2 text-neutral-200 hover:bg-neutral-400 dark:hover:bg-neutral-500"
            >
                Multiplayer
            </NavLink>
        </div>
    );
}

export default Home;
