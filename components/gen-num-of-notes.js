export default function NumOFNotesSel(props) {
  return (
    <div className="self-center my-3">
      <span>Number of Notes</span>
      <select
        className="self-center"
        defaultValue={props.numOFNotes}
        onChange={(e) => props.setNumOfNotes(e.target.value)}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </select>
    </div>
  );
}
