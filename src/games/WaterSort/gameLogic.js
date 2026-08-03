export const generatePuzzle = (colorsCount, emptyTubes = 2) => {
    const tubes = [];
    // Create colors
    const colors = [];
    for (let i = 0; i < colorsCount; i++) {
        colors.push(`color-${i + 1}`);
    }
    // Each color appears 4 times
    const allColors = [];
    colors.forEach(color => {
        for (let i = 0; i < 4; i++) {
            allColors.push(color);
        }
    });
    // Shuffle colors
    for (let i = allColors.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [allColors[i], allColors[randomIndex]] =
            [allColors[randomIndex], allColors[i]];
    }
    // Create tubes
    const tubeCount = colorsCount + emptyTubes;
    for (let i = 0; i < tubeCount; i++) {
        if (i < colorsCount) {
            tubes.push(allColors.slice(i * 4, i * 4 + 4));
        }
        else {
            tubes.push([]);
        }
    }
    return tubes;
};