export enum SpaceContent {
    mine = "💣",
    empty = "",
    one = "1",
    two = "2",
    three = "3",
    four = "4",
    five = "5",
    six = "6",
    seven = "7",
    eight = "8"
}

export enum SpaceContext {
    hidden = "Hidden",
    revealed = "Revealed",
    flagged = "Flagged"
}

interface SpaceProps {
    x: number;
    y: number;
    content: SpaceContent;
    context: SpaceContext;
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
