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
            totalCards = 12;
            break;

        case "medium":
            totalCards = 20;
            break;

        case "hard":
            totalCards = 28;
            break;

        default:
            totalCards = 16;

    }

    const pairCount =
        totalCards / 2;

    const shuffledImages = shuffle(CARD_IMAGES);

    const selectedImages =
        shuffledImages.slice(
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