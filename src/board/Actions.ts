import { Dispatch } from "react";
import { ActionType, Board, IActions } from "~/Board/BoardReducer";

export const makeMove = (
    dispatch: Dispatch<IActions>,
    payload: { cellIndex: number; boardIndex: number },
) => {
    dispatch({ type: ActionType.MAKE_MOVE, payload });
};

export const resetBoard = (dispatch: Dispatch<IActions>) =>
    dispatch({ type: ActionType.RESET_BOARD });

export const setBoard = (
    dispatch: Dispatch<IActions>,
    payload: { turn: 0 | 1; board: Board[]; activeBoard: number | null },
) => dispatch({ type: ActionType.SET_BOARD, payload });

export const gameOver = (
    dispatch: Dispatch<IActions>,
    payload: { winner: 0 | 1 | 2 | null },
) => dispatch({ type: ActionType.GAME_OVER, payload });
