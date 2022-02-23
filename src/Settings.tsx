import { FormEvent, useState } from "react"
import Slider from "./Slider";

interface SettingsProps {
    hidden: boolean;
    defaults: SettingsState;
    onSubmit: (state: SettingsState) => void;
}

interface SettingsState {
    width: number;
    height: number;
    mines: number;
}

export default function Settings(props: SettingsProps) {
    function onSubmit(event: FormEvent) {
        props.onSubmit({
            width: width,
            height: height,
            mines: mines
        });
        event.preventDefault();
    }

    const [width, setWidth] = useState(16);
    const [height, setHeight] = useState(12);
    const [mines, setMines] = useState(30);

    return (
        <div id="settingsContainer" style={{
            visibility: props.hidden ? "hidden" : "visible"
        }}>
            <div id="settings">
                <h1>SETTINGS</h1>
                <form onSubmit={onSubmit}>
                    <Slider
                        min={5}
                        max={50}
                        step={1}
                        default={16}
                        label="Width:"
                        onChange={setWidth}
                    /><br/>
                    <Slider
                        min={5}
                        max={50}
                        step={1}
                        default={12}
                        label="Height:"
                        onChange={setHeight}
                    /><br/>
                    <Slider
                        min={0}
                        max={100}
                        step={1}
                        default={30}
                        label="Mines:"
                        onChange={setMines}
                    /><br/>
                    <input type="submit" value="OK"/>
                </form>
            </div>
        </div>
    )
}
