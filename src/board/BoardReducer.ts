import { createContext } from "react";
import { WINNING_COMBINATIONS } from "./const";
import { socket } from "~/socket";

export type NulPlayer = null | 0 | 1;

export class Board {
    cells: NulPlayer[] = Array(9).fill(null);
    winner: 0 | 1 | 2 | null = null;

    constructor(cells?: NulPlayer[], winner?: 0 | 1 | 2 | null) {
        if (cells !== undefined && cells.length == 9) this.cells = cells;
        if (winner !== undefined) this.winner = winner;
    }

    public checkState(): 0 | 1 | 2 | null {
        // Check if board is won
        const player0 = new Set();
        const player1 = new Set();
        for (const [index, squareStatus] of this.cells.entries()) {
            if (squareStatus === 0) player0.add(index);
            if (squareStatus === 1) player1.add(index);
        }
        for (const combination of WINNING_COMBINATIONS) {
            if (combination.isSubsetOf(player0)) return 0;
            if (combination.isSubsetOf(player1)) return 1;
        }
        if (player0.size + player1.size == 9) return 2;
        return null;
    }
}

export type GameBoardState = {
    boardState: Board[];
    currentPlayer: 0 | 1;
    activeBoard: null | number;
    globalWinner: 0 | 1 | 2 | null;
    roomID?: string;
};

export const initialState: GameBoardState = {
    boardState: Array(9)
        .fill(null)
        .map(() => new Board()),
    currentPlayer: 0,
    activeBoard: null,
    globalWinner: null,
};

function checkGlobalWinner(gameBoard: Board[]) {
    const player0 = new Set();
    const player1 = new Set();
    for (const [index, board] of gameBoard.entries()) {
        if (board.winner === 0) player0.add(index);
        if (board.winner === 1) player1.add(index);
    }
    for (const combination of WINNING_COMBINATIONS) {
        if (combination.isSubsetOf(player0)) return 0;
        if (combination.isSubsetOf(player1)) return 1;
    }
    if (player0.size + player1.size == 9) return 2;
    return null;
}

export function gameBoardReducer(
    state: GameBoardState,
    action: IActions,
): GameBoardState {
    switch (action.type) {
        case ActionType.SET_BOARD: {
            const { turn, board, activeBoard } = action.payload;
            return {
                ...state,
                currentPlayer: turn,
                boardState: board,
                activeBoard: activeBoard,
            };
        }
        case ActionType.MAKE_MOVE: {
            const { boardIndex, cellIndex } = action.payload;
            if (state.roomID) {
                socket.emit("makeMove", {
                    roomId: state.roomID,
                    boardIndex: boardIndex,
                    cellIndex: cellIndex,
                });
                return { ...state };
            } else {
                const newBoard = [...state.boardState];
                newBoard[boardIndex].cells[cellIndex] = state.currentPlayer;
                newBoard[boardIndex].winner = newBoard[boardIndex].checkState();
                return {
                    ...state,
                    boardState: newBoard,
                    currentPlayer: state.currentPlayer == 0 ? 1 : 0,
                    activeBoard:
                        newBoard[cellIndex].winner === null ? cellIndex : null,
                    globalWinner: checkGlobalWinner(newBoard),
                };
            }
        }
        case ActionType.GAME_OVER: {
            const { winner } = action.payload;
            return {
                ...state,
                globalWinner: winner,
            };
        }
        case ActionType.RESET_BOARD:
            return initialState;
        default:
            return state;
    }
}

export enum ActionType {
    MAKE_MOVE = "MAKE_MOVE",
    RESET_BOARD = "RESET_BOARD",
    SET_BOARD = "SET_BOARD",
    GAME_OVER = "GAME_OVER",
}

export type IActions =
    | { type: ActionType.RESET_BOARD }
    | {
          type: ActionType.MAKE_MOVE;
          payload: { cellIndex: number; boardIndex: number };
      }
    | {
          type: ActionType.SET_BOARD;
          payload: {
              turn: 0 | 1;
              board: Board[];
              activeBoard: number | null;
          };
      }
    | {
          type: ActionType.GAME_OVER;
          payload: {
              winner: 0 | 1 | 2 | null;
          };
      };

export type ActionsMap = {
    resetBoard: undefined;
    makeMove: { boardIndex: number; cellIndex: number };
};

interface GameContextInterface {
    state: GameBoardState;
    dispatch: React.Dispatch<IActions>;
}

export const GameContext = createContext<GameContextInterface>({
    state: initialState,
    dispatch: () => {},
});
