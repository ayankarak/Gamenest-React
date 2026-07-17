export const PIECES = [
    // I
    [
        [1, 1, 1, 1]
    ],
    // J
    [
        [2, 0, 0],
        [2, 2, 2]
    ],
    // L
    [
        [0, 0, 3],
        [3, 3, 3]
    ],
    // O
    [
        [4, 4],
        [4, 4]
    ],
    // S
    [
        [0, 5, 5],
        [5, 5, 0]
    ],
    // T
    [
        [0, 6, 0],
        [6, 6, 6]
    ],
    // Z
    [
        [7, 7, 0],
        [0, 7, 7]
    ]
];

// Random Piece
export const createPiece = () => {
    const shape =
        PIECES[
            Math.floor(
                Math.random() * PIECES.length
            )
        ];
    return {
        shape,
        x: Math.floor(
            (10 - shape[0].length) / 2
        ),
        y: 0
    };
};