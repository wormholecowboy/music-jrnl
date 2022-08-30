export default function ScaleLetter(props) {
  const scaleLetter = props.scaleLetter;

  function handleChange(e) {
    newVal = e.target.value;
    props.setScaleLetter(newVal);
    console.log(newVal);
  }
  return (
    <div className="self-center">
      <span>Key</span>
      <select className="self-center" onChange={(e) => handleChange}>
        <option>Ab</option>
        <option>A</option>
        <option>Bb</option>
        <option>B</option>
        <option>C</option>
        <option>Db</option>
        <option>D</option>
        <option>Eb</option>
        <option>F</option>
        <option>Gb</option>
        <option>G</option>
      </select>
    </div>
  );
}
