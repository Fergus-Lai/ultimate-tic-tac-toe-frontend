import o from "~/assets/o.svg";
import x from "~/assets/x.svg";
import { SquareState } from "./SquareState";

type SquareProps = {
    squareState: SquareState;
    onClick: React.MouseEventHandler;
};

export const Square: React.FC<SquareProps> = ({ squareState, onClick }) => {
    function GetSquareImage(squareState: SquareState): string {
        switch (squareState) {
            case SquareState.Open:
                return "";
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
                (squareState == SquareState.Open ? " cursor-pointer" : "")
            }
            onClick={squareState != SquareState.Open ? () => {} : onClick}
        >
            {squareState != SquareState.Open && (
                <img
                    className="h-3/4 w-3/4"
                    src={GetSquareImage(squareState)}
                    alt={GetSquareAlt(squareState)}
                />
            )}
        </button>
    );
};
