import TextField from '@mui/material/TextField';

const InputBox = (props) => {
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