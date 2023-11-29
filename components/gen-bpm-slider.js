import { Slider } from '@mui/material';
import { usePoolPhrasesContext } from './use-poolphrases-context';

export default function BpmSlider(props) {
    const handleChange = (event, newValue) => {
        setBpm(newValue);
    };

    const { bpm, setBpm } = usePoolPhrasesContext()

    return (
        <div className="self-center">
            <p className="text-center">BPM</p>
            <Slider
                valueLabelDisplay="auto"
                min={5}
                max={350}
                size="small"
                onChange={handleChange}
                value={bpm}
            />
        </div>
    );
}
