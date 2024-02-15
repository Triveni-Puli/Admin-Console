import React, { useEffect, useState } from "react";
import Slider from '@mui/material/Slider';
import { HomeMax } from "@mui/icons-material";

const RangeSliderComponent = (props) => {
  const min = props.min;
  const max= props.max;
  const [value, setValue] = React.useState([min,max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const list = props.list;
    return(
        <Slider sx={{ width: 300 }}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min= {min}
        max= {max}
        // getAriaValueText={22}
      />
  )
}

RangeSliderComponent.defaultProps = {
  min: '',
  max: ''
}

export default RangeSliderComponent;