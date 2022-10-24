export default function ScaleLetter({ scaleLetter, setScaleLetter }) {
  const handleClick = (e) => {
    setScaleLetter(e.target.value);
  };
  return (
    <div className="self-center">
      <span>Key</span>
      <select
        value={scaleLetter}
        className="self-center"
        onChange={(e) => handleClick(e)}
      >
        <option value="Ab">Ab</option>
        <option value="A">A</option>
        <option value="Bb">Bb</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="Db">Db</option>
        <option value="D">D</option>
        <option value="Eb">Eb</option>
        <option value="E">D</option>
        <option value="F">F</option>
        <option value="Gb">Gb</option>
        <option value="G">G</option>
      </select>
    </div>
  );
}
