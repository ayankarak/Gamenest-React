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

export const pourWater = (tubes, fromIndex, toIndex) => {
    // Same tube
    if (fromIndex === toIndex) {
        return tubes;
    }
    const fromTube = tubes[fromIndex];
    const toTube = tubes[toIndex];
    // Empty source
    if (fromTube.length === 0) {
        return tubes;
    }
    // Full destination
    if (toTube.length >= 4) {
        return tubes;
    }
    const movingColor = fromTube[fromTube.length - 1];
    // Destination top color
    const topColor = toTube[toTube.length - 1];
    // Different colors cannot be mixed
    if ( toTube.length > 0 && topColor !== movingColor) {
        return tubes;
    }
    // How many same-color layers are on top
    let count = 0;
    for (let i = fromTube.length - 1; i >= 0; i-- ) {
        if (fromTube[i] === movingColor) {
            count++;
        } 
        else {
            break;
        }
    }
    // Cannot exceed capacity
    const space = 4 - toTube.length;
    const amount = Math.min(count, space);
    const newTubes = tubes.map(tube => [...tube]);
    for (let i = 0; i < amount; i++) {
        newTubes[toIndex].push( newTubes[fromIndex].pop() );
    }
    return newTubes;
};