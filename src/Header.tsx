export type Face = "🙂" | "😯" | "😵" | "😎";

type HeaderProps = {
    face: "🙂" | "😯" | "😵" | "😎";
    flags: number;
    usingFlag: boolean;
    onFaceClick: () => void;
    onFlagClick: () => void;
}

export default function Header(props: HeaderProps) {
    return (
        <div id="header">
            <div
                className="headerItem"
            >
                Mines: {props.flags}
            </div>
            <button
                className="headerItem headerButton"
                onClick={props.onFaceClick}
            >
                {props.face}
            </button>
            <button
                className="headerItem headerButton"
                onClick={props.onFlagClick}
            >
                🚩
            </button>
            <div
                className="headerItem"
                style={{justifyContent: "right"}}
            >
                {props.usingFlag ? "Placing flags" : "Digging squares"}
            </div>
        </div>
    )
}
