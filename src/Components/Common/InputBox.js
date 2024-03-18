import TextField from '@mui/material/TextField';
import { width } from '@mui/system';

const InputBox = (props) => {
    const width= props.width ;
    const handleOnChange = (event) =>{
        props.onChange(event);
    }

    const handleOnBlur = (event) =>{
        props.onBlur(event);
    }
    return(
        <TextField disabled={props.disabled} type={props.type} className="inputBorder" id="outlined-basic" label="" variant="outlined" size="small" value= {props.value} sx={{ width: width ? width : 260 }}
        onBlur={handleOnBlur} onChange={handleOnChange} />
  )
}
InputBox.defaultProps = {
    width: "",
    value: "",
    type: "",
    disabled: false,
    onChange: ()=>{},
    onBlur:()=>{}
}

export default InputBox;