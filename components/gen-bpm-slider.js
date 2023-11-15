import { Slider } from '@mui/material';

export default function BpmSlider(props) {
    const handleChange = (event, newValue) => {
        props.setBpm(newValue);
    };

    return (
        <div className="self-center">
            <p className="text-center">BPM</p>
            <Slider
                valueLabelDisplay="auto"
                min={5}
                max={280}
                size="small"
                onChange={handleChange}
                value={props.bpm}
            />
        </div>
    );
}
