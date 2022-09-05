export default function ScaleTonality(props) {
  return (
    <div className="self-center">
      <span>Scale Type</span>
      <select
        value={props.scaleTonality}
        onChange={(e) => props.setScaleTonality(e.target.value)}
        className="self-center"
      >
        <option value="Major">Major</option>
        <option value="Minor">Minor</option>
        <option value="Blues">Blues</option>
      </select>
    </div>
  );
}
