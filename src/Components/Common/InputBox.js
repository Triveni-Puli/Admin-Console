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
        <TextField className="inputBorder" id="outlined-basic" label="" variant="outlined" size="small" sx={{ width: width ? width : 280 }}
        onBlur={handleOnBlur} onChange={handleOnChange} />
  )
}
InputBox.defaultProps = {
    width: "",
    onChange: ()=>{},
    onBlur:()=>{}
}

export default InputBox;