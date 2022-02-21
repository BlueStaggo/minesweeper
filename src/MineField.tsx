import Space, { SpaceContent, SpaceContext } from "./Space";

interface MineFieldProps {
    width: number;
    height: number;
    onClick: () => void;
}

function MineFieldRow(y: number, props: MineFieldProps) {
    return (
        <div className="mineFieldRow" key={y}>
            {[...Array(props.width).keys()].map((_, i) =>
                <Space
                    x={i}
                    y={y}
                    content={Object.values(SpaceContent)[1]}
                    context={SpaceContext.hidden}
                    onClick={props.onClick}
                    key={i}
                />)}
        </div>
    )
}

export default function MineField(props: MineFieldProps) {
    return (
        <div id="mineField">
            {[...Array(props.height).keys()].map((_, i) =>
                MineFieldRow(i, props))}
        </div>
    );
}
