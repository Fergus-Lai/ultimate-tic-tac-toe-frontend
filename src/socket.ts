import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
export const URL =
    process.env.NODE_ENV === "production"
        ? "https://utt-backend.fergus-lai.dev"
        : "http://localhost:3000";

export const socket = io(URL);
