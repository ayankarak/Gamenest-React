const CARD_IMAGES = [

    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍒",
    "🥝",
    "🍍",
    "🥭",

    "🍓",
    "🍊",
    "🍋",
    "🥥",
    "🍑",
    "🍐",
    "🍏",
    "🫐",

    "🚗",
    "🚌",
    "🚲",
    "✈️",
    "🚀",
    "🚁",
    "🚢",
    "🏎️",

    "🐶",
    "🐱",
    "🐼",
    "🦁",
    "🐯",
    "🐸",
    "🐵",
    "🦊"

];


// Shuffle Function

const shuffle = (array) => {

    return [...array].sort(
        () => Math.random() - 0.5
    );

};


// Create Cards

export const createCards = (
    difficulty
) => {

    let totalCards;

    switch (difficulty) {

        case "easy":
            totalCards = 8;
            break;

        case "medium":
            totalCards = 12;
            break;

        case "hard":
            totalCards = 14;
            break;

        default:
            totalCards = 8;

    }

    const pairCount =
        totalCards / 2;

    const selectedImages =
        CARD_IMAGES.slice(
            0,
            pairCount
        );

    const cards = [

        ...selectedImages,
        ...selectedImages

    ];

    return shuffle(cards).map(
        (image, index) => ({

            id: index,

            image,

            isFlipped: false,

            isMatched: false

        })
    );

};