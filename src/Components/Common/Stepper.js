import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AddAlertIcon from '@mui/icons-material/Delete';
const StepperComponent = (props) => {
  const steps = [0,1,2,3];


//   const CustomStepIcon = () => {
//     return (
//       <div>
//         {<AddAlertIcon/>}
//       </div>
//     );
//   };

    return(
        <Stepper  activeStep={props.activeStep} sx={{ marginTop: 4, marginBottom: 4 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label} sx={{ '& .MuiStepLabel-root .Mui-completed': {
              color: '#8291A0', // circle color (COMPLETED)
            },'& .MuiStepLabel-root .Mui-active': {
                color: '#FFFFFF',
                borderRadius: "14px",
                border:"1px solid #8291A0" // circle color (ACTIVE)
              },
              '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                fill: '#8291A0', // circle's number (ACTIVE)
              },
              '& .MuiStepConnector-line':{
                border: "2px solid #8291A0"
              }
            }}  >
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
  )
}

export default StepperComponent;