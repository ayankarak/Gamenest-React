import "./PlayPage.css";

function ScoreBoard({ items = [] }) {

    return (

        <div className="playpage-scoreboard">

            {items.map((item, index) => (
                <div
                    key={index}
                    className="playpage-score-card"
                >
                    <h3>{item.label}</h3>
                    <p>{item.value}</p>
                </div>
            ))}
            
        </div>

    );

}

export default ScoreBoard;