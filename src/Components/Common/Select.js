import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SelectComponent = (props) => {
    const list = props.list;
    return(
        <Select sx={{ width: 250 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={list[0]}
            // label="Age"
            onChange=''
            size="small"
        >{
        list.map((val, key)=>{
            return <MenuItem value={val}>{val}</MenuItem>
        })
        }
        </Select>
  )
}

export default SelectComponent;