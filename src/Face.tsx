type FaceProps = {
    face: "🙂" | "😯" | "😵" | "😎";
    onClick: () => void;
}

export default function Face(props: FaceProps) {
    return (
        <button id="face" onClick={props.onClick}>
            {props.face}
        </button>
    )
}
