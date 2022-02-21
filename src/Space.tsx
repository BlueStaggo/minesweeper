import AbstractSpace from "./AbstractSpace";

interface SpaceProps extends AbstractSpace {
    x: number;
    y: number;
    onClick: () => void;
    onMouseDown: () => void;
    onMouseUp: () => void;
}

export default function Space(props: SpaceProps) {
    let content = {
        Hidden: "",
        Revealed: props.content,
        Flagged: "🚩"
    }[props.context];

    return (
        <button
            className={`space space${props.content} space${props.context}`}
            onClick={props.onClick}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
        >
            {content}
        </button>
    )
}
