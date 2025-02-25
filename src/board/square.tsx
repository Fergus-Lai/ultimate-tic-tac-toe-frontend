import o from "~/assets/o.svg";
import x from "~/assets/x.svg";
import { SquareState } from "./SquareState";

type SquareProps = {
    squareState: SquareState;
};

export const Square: React.FC<SquareProps> = ({ squareState }) => {
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
        <div className="flex aspect-square w-1/3">
            {squareState != SquareState.Open && (
                <img
                    className="flex p-2"
                    src={GetSquareImage(squareState)}
                    alt={GetSquareAlt(squareState)}
                />
            )}
        </div>
    );
};
