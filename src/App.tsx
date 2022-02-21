import Face from "./Face";
import MineField from "./MineField";

export default function App() {
    return (
        <div id="main">
            <div id="game">
                <h1>MINESWEEPER</h1>
                <Face face="😎" onClick={() => {}}/>
                <MineField width={16} height={12} onClick={() => {}}/>
            </div>
        </div>
    );
}
