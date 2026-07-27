// Generate a random Cross Sums puzzle

export const generatePuzzle = (size) => {

    const solution = [];

    const rowSums = [];
    const colSums = [];

    // Generate solution grid
    for (let row = 0; row < size; row++) {

        const currentRow = [];

        for (let col = 0; col < size; col++) {

            const randomNumber = Math.floor(Math.random() * 9) + 1;

            currentRow.push(randomNumber);
        }

        solution.push(currentRow);
    }

    // Calculate row sums
    for (let row = 0; row < size; row++) {

        const sum = solution[row].reduce(
            (total, value) => total + value,0
        );

        rowSums.push(sum);
    }

    // Calculate column sums
    for (let col = 0; col < size; col++) {

        let sum = 0;

        for (let row = 0; row < size; row++) {

            sum += solution[row][col];
        }

        colSums.push(sum);
    }

    return {solution,rowSums, colSums};
};