import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { Bounce, toast } from "react-toastify";

export const WaitingScreen: React.FC = () => {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
            <div className="text-3xl font-bold">
                Waiting for opponent to join
            </div>
            <button
                className="flex cursor-pointer items-center justify-center gap-4 rounded-3xl bg-neutral-700 px-4 py-2 text-2xl hover:bg-neutral-400 dark:hover:bg-neutral-500"
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Copied url to clipboard", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                }}
            >
                Invite
                <FontAwesomeIcon icon={faShare} />
            </button>
        </div>
    );
};
