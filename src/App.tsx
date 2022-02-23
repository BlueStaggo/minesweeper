import { useRef, useState } from "react";
import Header, { Face } from "./Header";
import MineField from "./MineField";
import AbstractSpace, { SpaceContent, SpaceContext } from "./AbstractSpace";
import Settings from "./Settings";
import { useKeyPress } from "./utils";
import { useSound } from "use-sound";

import clickSoundSource from "./sounds/click.wav";
import digSoundSource from "./sounds/dig.wav";
import explosionSoundSource from "./sounds/explosion.wav";
import completeSoundSource from "./sounds/complete.wav";

interface AppProps {
    width: number;
    height: number;
    mineCount: number;
}

export default function App(props: AppProps) {
    function forSurrounding(x: number, y: number, callback: (x: number, y: number) => void) {
        for (let xx = Math.max(x - 1, 0); xx <= Math.min(x + 1, width.current - 1); xx++) {
            for (let yy = Math.max(y - 1, 0); yy <= Math.min(y + 1, height.current - 1); yy++) {
                if (xx === x && yy === y) continue;
                callback(xx, yy);
            }
        }
    }

    function allMinesDiscovered(spaces: AbstractSpace[][]) {
        return !spaces.find((spaceColumn) =>
            spaceColumn.find((space) =>
                space.content !== SpaceContent.mine
                && space.context !== SpaceContext.revealed
            )
        );
    }

    function genSpaces() {
        let x: number, y: number;
        let spaces: AbstractSpace[][] = Array.from({ length: width.current }, () => (
            Array.from({ length: height.current }, () => ({
                content: SpaceContent.empty,
                context: SpaceContext.hidden
            }))
        ));

        for (let i = 0; i < mines.current; i++) {
            do {
                x = Math.floor(Math.random() * width.current);
                y = Math.floor(Math.random() * height.current);
            } while (spaces[x][y].content === SpaceContent.mine)
            spaces[x][y].content = SpaceContent.mine;
        }

        for (let x = 0; x < width.current; x++) {
            for (let y = 0; y < height.current; y++) {
                if (spaces[x][y].content === SpaceContent.mine) continue;

                let mines = 0;
                forSurrounding(x, y, (xx, yy) => {
                    if (spaces[xx][yy].content === SpaceContent.mine)
                        mines++;
                });

                spaces[x][y].content = Object.values(SpaceContent)[mines + 1];
            }
        }

        return spaces;
    }

    function reset() {
        setSpaces(genSpaces());
        setUsingFlag(false);
        setFlags(props.mineCount);
        setFace("🙂");
    }

    function dig(x: number, y: number, spaces: AbstractSpace[][], recursed: boolean = false) {
        let newSpaces = spaces.slice(0);
        if (face !== "🙂" && face !== "😯")
            return spaces;
        if (!usingFlag) {
            if (newSpaces[x][y].context !== SpaceContext.hidden) {
                return newSpaces;
            }
            newSpaces[x][y].context = SpaceContext.revealed;
            if (!recursed)
                digSound();
            if (newSpaces[x][y].content === SpaceContent.empty) {
                forSurrounding(x, y, (xx, yy) => {
                    if (newSpaces[xx][yy].context === SpaceContext.hidden)
                        newSpaces = dig(xx, yy, newSpaces, true);
                });
            } else if (newSpaces[x][y].content === SpaceContent.mine) {
                setFace("😵");
                newSpaces.forEach((column) => {
                    column.map((space) => {
                        if (space.content === SpaceContent.mine)
                            space.context = SpaceContext.revealed;
                        return space;
                    })
                });
                explosionSound();
            }
            if (allMinesDiscovered(newSpaces)) {
                setFace("😎");
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

    let width = useRef(props.width);
    let height = useRef(props.height);
    let mines = useRef(props.mineCount);

    const [spaces, setSpaces] = useState(() => {
        return genSpaces();
    });
    const [usingFlag, setUsingFlag] = useState(false);
    const [flags, setFlags] = useState(mines.current);
    const [face, setFace] = useState<Face>("🙂");

    const [settingsHidden, setSettingsHidden] = useState(true);

    const [clickSound] = useSound(clickSoundSource);
    const [digSound] = useSound(digSoundSource);
    const [explosionSound] = useSound(explosionSoundSource);
    const [completeSound] = useSound(completeSoundSource);

    useKeyPress(() => setUsingFlag(!usingFlag), "KeyF");

    return (
        <main>
            <div id="main">
                <div id="game">
                    <h1>MINESWEEPER</h1>
                    <Header
                        face={face}
                        flags={flags}
                        usingFlag={usingFlag}
                        onFaceClick={reset}
                        onFlagClick={() => setUsingFlag(!usingFlag)}
                        onSettingsClick={() => setSettingsHidden(false)}
                    />
                    <MineField
                        width={width.current}
                        height={height.current}
                        spaces={spaces}
                        onClick={(x: number, y: number) => {
                            setSpaces(dig(x, y, spaces));
                            if (allMinesDiscovered(spaces))
                                completeSound();
                        }}
                        onMouseDown={() => {
                            if (face === "🙂") {
                                setFace("😯");
                                clickSound();
                            }
                        }}
                        onMouseUp={() => {
                            if (face === "😯") {
                                setFace("🙂");
                            }
                        }}
                    />
                </div>
            </div>
            <Settings
                hidden={settingsHidden}
                defaults={{
                    width: width.current,
                    height: height.current,
                    mines: mines.current
                }}
                onSubmit={(state) => {
                    setSpaces([]);
                    width.current = state.width;
                    height.current = state.height;
                    mines.current = state.mines;
                    setSettingsHidden(true);
                    reset();
                }}
            />
        </main>
    );
}
