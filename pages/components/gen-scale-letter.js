export default function ScaleLetter(props) {
  return (
    <div className="self-center">
      <span>Key</span>
      <select
        defaultValue={props.scaleLetter}
        className="self-center"
        onChange={(e) => props.setScaleLetter(e.target.value)}
      >
        <option value="Ab">Ab</option>
        <option value="A">A</option>
        <option value="Bb">Bb</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="Db">Db</option>
        <option value="D">D</option>
        <option value="Eb">Eb</option>
        <option value="F">F</option>
        <option value="Gb">Gb</option>
        <option value="G">G</option>
      </select>
    </div>
  );
}