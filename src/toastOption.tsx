import { Bounce, ToastOptions } from "react-toastify";

export const DEFAULT_TOAST_OPTION: ToastOptions<unknown> = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
};
