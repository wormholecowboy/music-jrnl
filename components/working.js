import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function WorkingArea() {
  let phrases = [
    {pname:"blue", id:"blue"},
    {pname:"yellow", id:"yellow"},
    {pname:"green", id:"green"},
    {pname:"red", id:"red"},
  ]
  return (
    <div className="flex flex-row gap-5">
      <DragDropContext>
        <Droppable droppableId="phrases">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {phrases.map(({pname, id}, index) => {
    return (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <span>{pname}</span>
                  </li>
                )}
              </Draggable>
             );
             })}          
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
