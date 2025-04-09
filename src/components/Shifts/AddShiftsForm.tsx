import React, {useState} from 'react';
import {Box, Button, IconButton, ThemeProvider, Typography} from '@mui/material';
import {ConfirmShiftForms} from "./ConfirmShiftForms";
import {drtTheme} from "../../index";
import {getAirportNameByCode} from "../../airports";
import AddIcon from '@mui/icons-material/Add';
import {EditShiftForm} from "./EditShiftForm";

export interface ShiftForm {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  defaultStaffNumber: number;
}

export interface ShiftsFormProps {
  port: string;
  terminal: string;
  interval: number;
  shiftForms: ShiftForm[];
  confirmHandler: (shiftForms: ShiftForm[]) => void;
}

export const AddShiftsForm = ({port, terminal, interval, shiftForms, confirmHandler}: ShiftsFormProps) => {
  const [shifts, setShifts] = useState<ShiftForm[]>(Array.from(shiftForms).length > 0 ? shiftForms : [
    {id: 1, name: '', startTime: '', endTime: '', defaultStaffNumber: 0}
  ]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const onContinue = () => {
    if (shiftsHaveErrors(shifts)) {
      setShowErrors(true);
      return;
    }
    setShowConfirm(true)
  };

  const onCancel = () => {
    setShowConfirm(false);
  };

  const shiftIsValid = (shift: ShiftForm) => {
    return shift.name !== '' &&
      shift.startTime !== '' &&
      shift.endTime !== '' &&
      shift.startTime !== shift.endTime
  }

  const shiftsHaveErrors = (shifts: ShiftForm[]) => shifts.some(shift => {
    return !shiftIsValid(shift)
  })

  const handleAddShift = () => {
    if (shiftsHaveErrors(shifts)) {
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    setShifts([
      ...shifts,
      {id: shifts.length + 1, name: '', startTime: '', endTime: '', defaultStaffNumber: 0}
    ]);
  };

  const handleRemoveShift = (id: number) => {
    setShifts(shifts.filter(shift => shift.id !== id));
  };

  return (
    <ThemeProvider theme={drtTheme}>
      <Box>
        {!showConfirm ? (
          <Box sx={{p: 2, minWidth: '500px'}}>
            <Typography sx={{fontSize: '20px'}}>Add staff to {port} {getAirportNameByCode(port)} {terminal}</Typography>
            <Typography variant="h1" sx={{paddingBottom: '10px'}}>Step 1 of 2 - Create your shift pattern</Typography>
            {Array.from(shifts).map(form => {
              return <EditShiftForm key={form.id}
                                    formState={form}
                                    onUpdate={state => {
                                      const updatedShifts = shifts.map(shift => {
                                        if (shift.id === state.id) {
                                          return {...shift, ...state};
                                        }
                                        return shift;
                                      });
                                      setShifts(updatedShifts)
                                      if (showErrors) {
                                        setShowErrors(shiftsHaveErrors(updatedShifts))
                                      }
                                    }}
                                    interval={interval}
                                    removeShift={handleRemoveShift}
                                    showSubmitErrors={showErrors}
              />
            })}
            <Box>
              <Button variant="outlined" color="primary" onClick={handleAddShift} sx={{gap: 0, paddingLeft: '0'}}>
                <IconButton color="primary" sx={{padding: '0'}}>
                  <AddIcon/>
                </IconButton>
                Add a shift
              </Button>
            </Box>
            <Box sx={{"paddingTop": "10px"}}>
              <Button variant="contained" color="primary" onClick={onContinue} data-cy="shift-continue-button">
                Continue
              </Button>
              {showErrors && (
                <Typography color="error" variant="body2">Please fix the errors before continuing</Typography>
              )}
            </Box>
          </Box>) : (
          <ConfirmShiftForms port={port}
                             terminal={terminal}
                             shifts={shifts}
                             editShiftsHandler={onCancel}
                             confirmHandler={confirmHandler}
                             removeShiftHandler={handleRemoveShift}/>)
        }
      </Box>
    </ThemeProvider>
  )
};
