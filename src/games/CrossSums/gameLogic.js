// Generate Cross Sums Puzzle
export const generatePuzzle = (size) => {
    const solution = [];
    const removedSolution = [];
    const rowSums = [];
    const colSums = [];

    // GENERATE SOLUTION
    for (let row = 0; row < size; row++) {
        solution[row] = [];
        removedSolution[row] = [];
        for (let col = 0; col < size; col++) {
            // Number between 1 and 4
            const number = Math.floor(Math.random() * 4) + 1;
            solution[row][col] = number;
            // true = this cell should be removed
            removedSolution[row][col] =
                Math.random() < 0.3;
        }
    }

    // ROW SUMS

    for (let row = 0; row < size; row++) {
        let sum = 0;
        for (let col = 0; col < size; col++) {
            // Only count cells that are NOT removed
            if (!removedSolution[row][col]) {
                sum += solution[row][col];
            }
        }
        rowSums[row] = sum;
    }

    // COLUMN SUMS

    for (let col = 0; col < size; col++) {
        let sum = 0;
        for (let row = 0; row < size; row++) {
            if (!removedSolution[row][col]) {
                sum += solution[row][col];
            }
        }
        colSums[col] = sum;
    }
    // RETURN PUZZLE
    return {
        solution,
        removedSolution,
        rowSums,
        colSums
    };
};