import AbstractSpace from "./AbstractSpace";

interface SpaceProps extends AbstractSpace {
    x: number;
    y: number;
    onClick: () => void;
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
        >
            {content}
        </button>
    )
}
