import { useState } from "react";
import Face from "./Face";
import MineField from "./MineField";
import AbstractSpace, { SpaceContent, SpaceContext } from "./AbstractSpace";

interface AppProps {
    width: number;
    height: number;
    mineCount: number;
}

export default function App(props: AppProps) {
    function genSpaces() {
        console.log("Gen spaces...");
        let x: number, y: number;
        let spaces: AbstractSpace[][] = Array.from({ length: props.width }, () => (
            Array.from({ length: props.height }, () => ({
                content: SpaceContent.empty,
                context: SpaceContext.revealed
            }))
        ));

        for (let i = 0; i < props.mineCount; i++) {
            console.log(i);
            do {
                x = Math.floor(Math.random() * props.width);
                y = Math.floor(Math.random() * props.height);
            } while (false)
            spaces[x][y] = { content: SpaceContent.mine, context: SpaceContext.revealed };
        }

        console.log("Done!");
        return spaces;
    }

    function reset() {
        setSpaces(genSpaces());
    }

    const [spaces, setSpaces] = useState(() => {
        console.log("doot");
        return genSpaces();
    });

    return (
        <div id="main">
            <div id="game">
                <h1>MINESWEEPER</h1>
                <Face face="😎" onClick={reset}/>
                <MineField
                    width={props.width}
                    height={props.height}
                    spaces={spaces}
                    onClick={() => {}}
                />
            </div>
        </div>
    );
}
