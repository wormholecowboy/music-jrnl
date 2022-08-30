export default function ScaleTonality(props) {
  function handleChange(e) {
    props.setScaleTonality(e.target.value);
    console.log(props.scaleTonality);
  }

  return (
    <div className="self-center">
      <span>Scale Type</span>{' '}
      <select
        value={props.scaleTonality}
        onChange={handleChange}
        className="self-center"
      >
        <option value="Major">Major</option>
        <option value="Minor">Minor</option>
        <option value="Blues">Blues</option>
      </select>
    </div>
  );
}
