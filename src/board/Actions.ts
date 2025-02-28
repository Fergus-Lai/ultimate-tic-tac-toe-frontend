import { Dispatch } from "react";
import { ActionType, IActions } from "~/board/BoardReducer";

export const makeMove = (
    dispatch: Dispatch<IActions>,
    payload: { cellIndex: number; boardIndex: number },
) => {
    dispatch({ type: ActionType.MAKE_MOVE, payload });
};

export const resetBoard = (dispatch: Dispatch<IActions>) =>
    dispatch({ type: ActionType.RESET_BOARD });
