import o from "~/assets/o.svg";
import x from "~/assets/x.svg";
import { SquareState } from "./enums.ts";

type SquareProps = {
    squareState: SquareState;
    active: boolean;
    onClick: React.MouseEventHandler;
};

export const Square: React.FC<SquareProps> = ({
    squareState,
    active,
    onClick,
}) => {
    function GetSquareImage(squareState: SquareState): string | undefined {
        switch (squareState) {
            case SquareState.Open:
                return undefined;
            case SquareState.Player0:
                return o;
            case SquareState.Player1:
                return x;
        }
    }

    function GetSquareAlt(squareState: SquareState): string {
        switch (squareState) {
            case SquareState.Open:
                return "Open";
            case SquareState.Player0:
                return "Player 0";
            case SquareState.Player1:
                return "Player 1";
        }
    }

    return (
        <button
            className={
                "flex aspect-square w-full items-center justify-center" +
                (active && squareState == SquareState.Open
                    ? " cursor-pointer"
                    : "")
            }
            onClick={
                active && squareState == SquareState.Open ? onClick : () => {}
            }
        >
            <img
                className={`aspect-square h-3/4 w-3/4 ${squareState === SquareState.Open ? "invisible" : ""}`}
                src={GetSquareImage(squareState)}
                alt={GetSquareAlt(squareState)}
            />
        </button>
    );
};
