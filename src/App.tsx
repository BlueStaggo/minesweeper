import React, { useState } from "react";
import Face from "./Face";
import { Mine } from "./Mine";
import MineField from "./MineField";

interface AppProps {
    width: number;
    height: number;
    mineCount: number;
}

export default function App(props: AppProps) {
    function genMines() {
        let x: number, y: number;
        let mines: Mine[] = [];
        let contains = (value: Mine) => value.equals(x, y);

        for (let i = 0; i < props.mineCount; i++) {
            do {
                x = Math.floor(Math.random() * props.width);
                y = Math.floor(Math.random() * props.height);
            } while (mines.find(contains))
            mines.push(new Mine(x, y));
        }

        return mines;
    }

    function reset() {
        setMines(genMines());
    }

    const [mines, setMines] = useState(genMines());

    return (
        <div id="main">
            <div id="game">
                <h1>MINESWEEPER</h1>
                <Face face="😎" onClick={reset}/>
                <MineField
                    width={props.width}
                    height={props.height}
                    mines={mines}
                    onClick={() => {}}
                />
            </div>
        </div>
    );
}
