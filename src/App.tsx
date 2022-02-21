import { useState } from "react";
import Header from "./Header";
import MineField from "./MineField";
import AbstractSpace, { SpaceContent, SpaceContext } from "./AbstractSpace";

interface AppProps {
    width: number;
    height: number;
    mineCount: number;
}

export default function App(props: AppProps) {
    function forSurrounding(x: number, y: number, callback: (x: number, y: number) => void) {
        for (let xx = Math.max(x - 1, 0); xx <= Math.min(x + 1, props.width - 1); xx++) {
            for (let yy = Math.max(y - 1, 0); yy <= Math.min(y + 1, props.height - 1); yy++) {
                if (xx === x && yy === y) continue;
                callback(xx, yy);
            }
        }
    }

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
                forSurrounding(x, y, (xx, yy) => {
                    if (spaces[xx][yy].content === SpaceContent.mine)
                        mines++;
                });

                spaces[x][y].content = Object.values(SpaceContent)[mines + 1];
            }
        }

        console.log("Done!");
        return spaces;
    }

    function reset() {
        setSpaces(genSpaces());
        setUsingFlag(false);
        setFlags(props.mineCount);
    }

    function dig(x: number, y: number, spaces: AbstractSpace[][]) {
        let newSpaces = spaces.slice(0);
        if (!usingFlag) {
            if (newSpaces[x][y].context !== SpaceContext.hidden) {
                return newSpaces;
            }
            newSpaces[x][y].context = SpaceContext.revealed;
            if (newSpaces[x][y].content === SpaceContent.empty) {
                forSurrounding(x, y, (xx, yy) => {
                    if (newSpaces[xx][yy].context === SpaceContext.hidden)
                        newSpaces = dig(xx, yy, newSpaces);
                });
            }
            return newSpaces;
        } else {
            if (newSpaces[x][y].context === SpaceContext.flagged) {
                newSpaces[x][y].context = SpaceContext.hidden;
                setFlags(flags + 1);
            } else if (newSpaces[x][y].context === SpaceContext.hidden) {
                newSpaces[x][y].context = SpaceContext.flagged;
                setFlags(flags - 1)
            }
            return newSpaces;
        }
    }

    const [spaces, setSpaces] = useState(() => {
        console.log("doot");
        return genSpaces();
    });
    const [usingFlag, setUsingFlag] = useState(false);
    const [flags, setFlags] = useState(props.mineCount);

    return (
        <div id="main">
            <div id="game">
                <h1>MINESWEEPER</h1>
                <Header
                    face="🙂"
                    flags={flags}
                    usingFlag={usingFlag}
                    onFaceClick={reset}
                    onFlagClick={() => {
                        setUsingFlag(!usingFlag);
                    }}
                />
                <MineField
                    width={props.width}
                    height={props.height}
                    spaces={spaces}
                    onClick={(x: number, y: number) => {
                        setSpaces(dig(x, y, spaces));
                    }}
                />
            </div>
        </div>
    );
}
