import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import DraggablePhrase from "./work-draggablePhrase";
import { usePoolPhrasesContext } from "./use-poolphrases-context";

export default function WorkingArea() {

    const [phrases, setPhrases] = useState(["phrase1", "phrase2", "phrase3", "phrase4"])
    const { workingPhrases, setWorkingPhrases } = usePoolPhrasesContext();

    console.log("working phrases", workingPhrases)
    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setWorkingPhrases(phrases => {
                const activeIndex = phrases.indexOf(active.id);
                const overIndex = phrases.indexOf(over.id);

                return arrayMove(phrases, activeIndex, overIndex)
            })
        }

    }

    return (
        <div className="flex flex-col justify-center justify-items-center">
            <h2 className="self-center">Chain your pool phrase together here.</h2>
            <div className="p-8 flex self-center">

                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={workingPhrases} strategy={horizontalListSortingStrategy}>
                        {workingPhrases.map(phrase => <DraggablePhrase id={phrase} key={phrase} />)}
                    </SortableContext>

                </DndContext>
            </div>
        </div>
    );
}
