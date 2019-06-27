import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';



export const SelectGoal = (props: {goal: string, setGoal: ()=>void }) => (
    <RadioGroup
        aria-label="Goal"
        name="goal"
        value={props.goal}
        onChange={props.setGoal}
    >
        <FormControlLabel value="maintain" control={<Radio />} label="Maintain Weight" />
        <FormControlLabel value="gain" control={<Radio />} label="Gain Weight" />
        <FormControlLabel value="lose" control={<Radio />} label="Lose Weight" />
    </RadioGroup>
)