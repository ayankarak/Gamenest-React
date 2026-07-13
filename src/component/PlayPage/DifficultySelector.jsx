import "./PlayPage.css";

function DifficultySelector({

    value,
    onChange,
    options = [

        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" }

    ],
    label = "Difficulty"
}) {

    return (

        <div className="playpage-difficulty">
            <label>
                {label} :
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>

    );

}

export default DifficultySelector;