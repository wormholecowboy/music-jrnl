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
      </select>
    </div>
  );
}
