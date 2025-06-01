import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { URL } from "../socket";

function Lobby() {
    const [roomID, setRoomID] = useState("");
    const navigate = useNavigate();
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
            <ToastContainer />
            <div className="flex h-1/6 flex-col gap-4">
                <div className="flex h-full flex-row gap-2">
                    <button
                        className="flex h-full items-center justify-center rounded-3xl bg-neutral-700 p-2 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                        onClick={async () => {
                            const res = await fetch(`${URL}/create-room`, {
                                method: "POST",
                            });
                            const createdRoomID = (await res.json()).roomId;
                            navigate(`/Game/Multiplayer/${createdRoomID}`);
                        }}
                    >
                        Create Game
                    </button>
                    <div className="flex flex-col justify-between gap-4">
                        <input
                            value={roomID}
                            onChange={(e) =>
                                setRoomID(e.target.value.toUpperCase())
                            }
                            type="text"
                            className="w-full flex-1/2 rounded-3xl border-2 border-neutral-400 text-center"
                            maxLength={6}
                        />
                        <NavLink
                            to={`/Game/Multiplayer/${roomID}`}
                            className="flex flex-1/2 items-center justify-center rounded-3xl bg-neutral-700 p-2 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                            aria-disabled={!!roomID.match("[A-Z0-9]{6}")}
                            onClick={(e) => {
                                if (!roomID.match("[A-Z0-9]{6}")) {
                                    e.preventDefault();
                                    toast.error("Incorrect Room ID", {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true,
                                        progress: undefined,
                                        theme: "colored",
                                        transition: Bounce,
                                    });
                                }
                            }}
                        >
                            Join
                        </NavLink>
                    </div>
                </div>
                <NavLink
                    to={"/"}
                    className="flex items-center justify-center rounded-3xl bg-neutral-700 p-2 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                >
                    Home Page
                </NavLink>
            </div>
        </div>
    );
}

export default Lobby;
