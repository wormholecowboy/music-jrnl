import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function WorkingArea() {
  return (
    <div className="flex flex-row gap-5">
      <DragDropContext>
        <ul>
          <li key={1} value="one">
            one
          </li>
          <li key={2} value="two">
            two
          </li>
          <li key={3} value="three">
            three
          </li>
          <li key={4} value="four">
            four
          </li>
          <li key={5} value="five">
            five
          </li>
        </ul>
      </DragDropContext>
    </div>
  );
}
