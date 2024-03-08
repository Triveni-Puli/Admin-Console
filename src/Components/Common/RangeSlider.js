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
  };
    const list = props.list;
    return(
      <>
        <Slider sx={{ width: 250 }}
        getAriaLabel={() => 'Temperature range'}
        defaultValue={(min+max)/2}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min= {min}
        max= {max}
        step = {step}
        marks={true}
        // getAriaValueText={value}
        // aria-labelledby="discrete-slider"
        // valueLabelDisplay="on"
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
  step:''
}

export default RangeSliderComponent;