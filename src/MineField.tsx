import Space from "./Space";
import AbstractSpace from "./AbstractSpace";

interface MineFieldProps {
    width: number;
    height: number;
    spaces: AbstractSpace[][];
    onClick: (x: number, y: number) => void;
}

function MineFieldRow(y: number, props: MineFieldProps) {
    return (
        <div className="mineFieldRow" key={y}>
            {[...Array(props.width).keys()].map((_, x) =>
                <Space
                    x={x}
                    y={y}
                    content={props.spaces[x][y].content}
                    context={props.spaces[x][y].context}
                    onClick={() => props.onClick(x, y)}
                    key={x}
                />)}
        </div>
    )
}

export default function MineField(props: MineFieldProps) {
    return (
        <div id="mineField">
            {[...Array(props.height).keys()].map((_, y) =>
                MineFieldRow(y, props))}
        </div>
    );
}
