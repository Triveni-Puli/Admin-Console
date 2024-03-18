import React, { useEffect, useState } from "react";
import Slider from '@mui/material/Slider';
import "../../common.css";

const RangeSliderComponent = (props) => {
  const min = props.min;
  const max= props.max;
  const step = props.step;
  // const [value, setValue] = React.useState([min,max]);
  const [value, setValue] = React.useState();

  const handleChange = (event, newValue) => {
    console.log("slider", newValue);
    setValue(newValue);
    props.handleChange(newValue);
  };
    const list = props.list;
    return(
      <>
        <Slider sx={{ width: 250 }}
        getAriaLabel={() => 'Temperature range'}
        defaultValue={props.isEdit ? props.defaultValue :(min+max)/2}
        value={value}
        onChange={handleChange}
        // valueLabelDisplay="auto"
        valueLabelDisplay="on"
        min= {min}
        max= {max}
        step = {step}
        marks={true}
        disabled = {props.isEdit ? true : false}
        // getAriaValueText={value}
        // aria-labelledby="discrete-slider"
        // getAriaValueText={22}
      />
      <div className="sliderDiv"><input value={min} disabled className="sliderInput"></input>
        <span className="line">---</span>
        <input value={max} disabled className="sliderInput"></input>
      </div>
    </>
  )
}

RangeSliderComponent.defaultProps = {
  min: '',
  max: '',
  step:'',
  isEdit: false,
  defaultValue:'',
  handleChange : ()=>{}
}

export default RangeSliderComponent;