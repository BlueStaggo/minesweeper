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
                context: SpaceContext.hidden
            }))
        ));

        for (let i = 0; i < props.mineCount; i++) {
            console.log(i);
            do {
                x = Math.floor(Math.random() * props.width);
                y = Math.floor(Math.random() * props.height);
            } while (false)
            spaces[x][y].content = SpaceContent.mine;
        }

        for (let x = 0; x < spaces.length; x++) {
            for (let y = 0; y < spaces[x].length; y++) {
                if (spaces[x][y].content === SpaceContent.mine) continue;

                let mines = 0;
                for (let xx = Math.max(x - 1, 0); xx <= Math.min(x + 1, props.width - 1); xx++)
                    for (let yy = Math.max(y - 1, 0); yy <= Math.min(y + 1, props.height - 1); yy++)
                        if (spaces[xx][yy].content === SpaceContent.mine)
                            mines++;

                spaces[x][y].content = Object.values(SpaceContent)[mines + 1];
            }
        }

        console.log("Done!");
        return spaces;
    }

    function reset() {
        setSpaces(genSpaces());
    }

    function dig(x: number, y: number) {
        let newSpaces = spaces.slice(0);
        newSpaces[x][y].context = SpaceContext.revealed;
        setSpaces(newSpaces);
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
                    onClick={dig}
                />
            </div>
        </div>
    );
}
