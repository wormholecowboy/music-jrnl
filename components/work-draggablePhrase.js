import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@mui/material";

export default function DraggablePhrase(props) {

    const { attributes,
        listeners,
        setNodeRef,
        transform,
        transition } = useSortable({ id: props.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card body className="m-1" >{props.children}</Card>
        </div>
    )
}

