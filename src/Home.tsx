import { NavLink } from "react-router";

function Home() {
    return (
        <div className="flex h-screen w-screen items-center justify-center gap-6">
            <NavLink to="/Board" className="h-1/4 w-1/12">
                Local
            </NavLink>
            <NavLink to="/Board/Multiplayer/:pid" className="h-1/4 w-1/12">
                Multiplayer
            </NavLink>
        </div>
    );
}

export default Home;
