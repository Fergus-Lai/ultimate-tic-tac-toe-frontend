import { NavLink } from "react-router";

function Home() {
    return (
        <div className="flex h-screen w-screen items-center justify-center gap-6 bg-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
            <NavLink
                to="/Game"
                className="rounded-3xl p-2 hover:bg-neutral-400 dark:hover:bg-neutral-700"
            >
                Local
            </NavLink>
            <NavLink
                to="/Game/Lobby"
                className="rounded-3xl p-2 hover:bg-neutral-400 dark:hover:bg-neutral-700"
            >
                Multiplayer
            </NavLink>
        </div>
    );
}

export default Home;
