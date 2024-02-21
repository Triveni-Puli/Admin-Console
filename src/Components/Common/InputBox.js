// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { useState } from 'react';
import TextField from '@mui/material/TextField';

const InputBox = (props) => {
    // const list = props.;
    // const id = props.id;
    const handleOnChange = (event) =>{
        props.onChange(event);
    }

    const handleOnBlur = (event) =>{
        props.onBlur(event);
    }
    return(
        <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ width: props.width }}
        onBlur={handleOnBlur} onChange={handleOnChange} />
  )
}
InputBox.defaultProps = {
    width: "",
    onChange: ()=>{},
    onBlur:()=>{}
}

export default InputBox;