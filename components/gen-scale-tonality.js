export default function ScaleTonality({
    scaleTonality,
    setScaleTonality,
    getScale,
}) {
    const handleClick = (e) => {
        setScaleTonality(e.target.value);
    };
    return (
        <div className="self-center">
            <span>Scale Type</span>
            <select
                value={scaleTonality}
                onChange={(e) => handleClick(e)}
                className="self-center"
            >
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
                <option value="Blues">Blues</option>
                <option value="Dorian">Dorian</option>
                <option value="Phrygian">Phrygian</option>
                <option value="Lydian">Lydian</option>
                <option value="Mixolydian">Mixolydian</option>
                <option value="Locrian">Locrian</option>
                <option value="Chromatic">Chromatic</option>
                <option value="Bebop">Bebop</option>
                <option value="Diminished">Diminished</option>
            </select>
        </div>
    );
}
