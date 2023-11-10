import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import DraggablePhrase from "./work-draggablePhrase";

export default function WorkingArea() {

    const [phrases, setPhrases] = useState(["phrase1", "phrase2", "phrase3", "phrase4"])

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setPhrases(phrases => {
                const activeIndex = phrases.indexOf(active.id);
                const overIndex = phrases.indexOf(over.id);

                return arrayMove(phrases, activeIndex, overIndex)
            })
        }

    }

    return (
        <div className="flex flex-row gap-5 bg-slate-100 ">
            <h2>Working Area</h2>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={phrases} strategy={horizontalListSortingStrategy}>
                    {phrases.map(phrase => <DraggablePhrase id={phrase} key={phrase} />)}
                </SortableContext>

            </DndContext>
        </div>
    );
}
