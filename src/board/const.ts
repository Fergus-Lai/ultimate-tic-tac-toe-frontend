export enum BoardStatus {
    Draw,
    Player0,
    Player1,
}

export enum SquareState {
    Open,
    Player0,
    Player1,
}

export const WINNING_COMBINATIONS: Set<number>[] = [
    new Set([0, 1, 2]),
    new Set([3, 4, 5]),
    new Set([6, 7, 8]),
    new Set([0, 3, 6]),
    new Set([1, 4, 7]),
    new Set([2, 5, 8]),
    new Set([2, 4, 6]),
    new Set([0, 4, 8]),
];
