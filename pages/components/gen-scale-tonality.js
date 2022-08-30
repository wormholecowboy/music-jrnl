export default function ScaleTonality() {
  return (
    <div className="self-center">
      <span>Scale Type</span>{' '}
      <select className="self-center">
        <option value="major">Major</option>
        <option value="minor">Minor</option>
        <option value="blues">Blues</option>
      </select>
    </div>
  );
}
