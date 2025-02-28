import o from "~/assets/o.svg";
import x from "~/assets/x.svg";
import { NulPlayer } from "~/board/BoardReducer";

type SquareProps = {
    squareState: NulPlayer;
    active: boolean;
    onClick: React.MouseEventHandler;
};

export const Square: React.FC<SquareProps> = ({
    squareState,
    active,
    onClick,
}) => {
    function GetSquareImage(squareState: NulPlayer): string | undefined {
        switch (squareState) {
            case 0:
                return o;
            case 1:
                return x;
            default:
                return undefined;
        }
    }

    function GetSquareAlt(squareState: NulPlayer): string {
        switch (squareState) {
            case 0:
                return "Player 0";
            case 1:
                return "Player 1";
            default:
                return "Open";
        }
    }

    return (
        <button
            className={
                "flex aspect-square w-full items-center justify-center" +
                (active && squareState == null ? " cursor-pointer" : "")
            }
            onClick={active && squareState == null ? onClick : () => {}}
        >
            <img
                className={`aspect-square h-3/4 w-3/4 ${squareState === null ? "invisible" : ""}`}
                src={GetSquareImage(squareState)}
                alt={GetSquareAlt(squareState)}
            />
        </button>
    );
};
