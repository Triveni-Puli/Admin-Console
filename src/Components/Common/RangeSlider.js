import React, { useEffect, useState } from "react";
import Slider from '@mui/material/Slider';

const RangeSliderComponent = (props) => {
    const [value, setValue] = React.useState([20, 37]);

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
        // getAriaValueText={22}
      />
  )
}

export default RangeSliderComponent;