import React, {useState} from 'react';
import {Box, Button, Stack, Typography} from '@mui/material';
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
  const [shiftIdCounter, setShiftIdCounter] = useState(1);

  const [shifts, setShifts] = useState<ShiftForm[]>(Array.from(shiftForms).length > 0 ? shiftForms : [
    {id: shiftIdCounter, name: '', startTime: '', endTime: '', defaultStaffNumber: 0}
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
      {id: shiftIdCounter + 1, name: '', startTime: '', endTime: '', defaultStaffNumber: 0}
    ]);
    setShiftIdCounter(prevCounter => prevCounter + 1);
  };

  const handleRemoveShift = (id: number) => {
    setShifts(shifts.filter(shift => shift.id !== id));
  };

  const handleEditOnUpdate = (state: ShiftForm) => {
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
  }

  return (
    <>
      <Stack direction={'row'} mb={2}>
        {!showConfirm ? (
          <Box>
            <Typography variant='body1' mb={1}>Add staff to {port} {getAirportNameByCode(port)} {terminal}</Typography>
            <Typography variant="h1" mb={4}>Step 1 of 2 - Create your shift pattern</Typography>
            {shifts.map((form, index) => {
              return <EditShiftForm 
                index={index}
                key={form.id}
                formState={form}
                onUpdate={handleEditOnUpdate}
                interval={interval}
                removeShift={handleRemoveShift}
                showSubmitErrors={showErrors}
              />
            })}
          </Box>) : (
          <ConfirmShiftForms 
            port={port}
            terminal={terminal}
            shifts={shifts}
            editShiftsHandler={onCancel}
            confirmHandler={confirmHandler}
            removeShiftHandler={handleRemoveShift}/>)
        }
      </Stack>
      <Stack direction={'column'} spacing={2} alignItems='start'> 
        <Button variant="outlined" color="primary" onClick={handleAddShift} startIcon={<AddIcon/>}>
          Add a shift
        </Button>
        <Button variant="contained" color="primary" onClick={onContinue} data-cy="shift-continue-button">
          Continue
        </Button>
        {showErrors && (
          <Typography color="error" variant="body2">Please fix the errors before continuing</Typography>
        )}
      </Stack>
    </>
  )
};
