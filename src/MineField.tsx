import Space, { SpaceContent, SpaceContext } from "./Space";
import { Mine } from "./Mine";

interface MineFieldProps {
    width: number;
    height: number;
    mines: Mine[];
    onClick: () => void;
}

function MineFieldRow(y: number, props: MineFieldProps) {
    return (
        <div className="mineFieldRow" key={y}>
            {[...Array(props.width).keys()].map((_, x) =>
                <Space
                    x={x}
                    y={y}
                    content={SpaceContent.mine}
                    context={props.mines.find((value) => value.equals(x, y))
                        ? SpaceContext.revealed
                        : SpaceContext.hidden}
                    onClick={props.onClick}
                    key={x}
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
