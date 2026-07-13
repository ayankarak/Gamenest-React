import "./PlayPage.css";

function GameContainer({
    children,
    width = 700,
    height = "auto"
}) {

    return (

        <div className="playpage-game-wrapper">
            <div
                className="playpage-game-container"
                style={{
                    maxWidth: `${width}px`,
                    minHeight:
                        height === "auto"
                            ? "auto"
                            : `${height}px`
                }}
            >
                {children}
            </div>
        </div>

    );

}

export default GameContainer;