import { useState } from "react";

interface SliderProps {
    min: number;
    max: number;
    step: number;
    default: number;
    label: string;
    onChange: (value: number) => void;
}

export default function Slider(props: SliderProps) {
    const [value, setValue] = useState(props.default);

    return (
        <label>
            {props.label}
            <input
                type="range"
                min={props.min}
                max={props.max}
                step={props.step}
                value={value}
                onChange={(event) => {
                    setValue(parseInt(event.target.value));
                    props.onChange(parseInt(event.target.value));
                }}
            />
            <input
                type="number"
                // min={props.min}
                // max={props.max}
                step={props.step}
                value={value}
                onChange={(event) => {
                    setValue(parseInt(event.target.value));
                    props.onChange(parseInt(event.target.value));
                }}
            />
        </label>
    )
}
