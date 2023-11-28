import Image from 'next/image';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@mui/material";
import { list } from 'postcss';

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
        <div ref={setNodeRef} style={style} >
            <Card className="mx-2">{props.children}
                <span {...attributes} {...listeners}>
                    <Image
                        alt="move"
                        src="/../public/move.png"
                        className="rounded-full m-2"
                        width={20}
                        height={20}
                    />
                </span>
            </Card>
        </div>
    )
}

