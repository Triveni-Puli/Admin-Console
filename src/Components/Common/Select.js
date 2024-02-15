import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

const SelectComponent = (props) => {
    const list = props.list;
    const id = props.id;
    const [value, setValue] = useState(list[0]);
    const handleChange = (event) =>{
        setValue(event.target.value);
        props.handleChange(event.target.value);
    }
    return(
        <Select sx={{ width: 250 }}
            labelId={id}
            id= {id}
            value={value}
            onChange={handleChange}
            size="small"
        >{
        list.map((val, key)=>{
            return <MenuItem value={val}>{val}</MenuItem>
        })
        }
        </Select>
  )
}
SelectComponent.defaultProps = {
    id: "",
    handleChange: ()=>{}
}

export default SelectComponent;