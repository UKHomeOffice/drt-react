import React, {useState} from "react";
import {Box, Button, IconButton, TextField, Typography} from "@mui/material";
import moment, {Moment} from "moment";
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import CloseIcon from "@mui/icons-material/Close";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

export type IEditShiftStaff = {
    startDayAt: Moment,
    startTimeAt: Moment,
    endTimeAt: Moment,
    endDayAt: Moment,
    actualStaff: number
}

export interface IEditShiftStaffForm {
    essf: IEditShiftStaff,
    interval: number,
    handleSubmit: (ssf: IEditShiftStaff) => void,
    cancelHandler: () => void
}

export const EditShiftStaffForm = ({
                                       essf,
                                       interval,
                                       handleSubmit,
                                       cancelHandler
                                   }: IEditShiftStaffForm) => {
    const [startDate, setStartDate] = useState<Moment>(essf.startDayAt);
    const [startTime, setStartTime] = useState<Moment>(essf.startTimeAt.startOf('day'));
    const [endTime, setEndTime] = useState<Moment>(essf.endTimeAt.startOf('day'));
    const [endDate, setEndDate] = useState<Moment>(essf.endDayAt);
    const [staffNumber, setStaffNumber] = useState<number>(essf.actualStaff);
    const [error, setError] = useState<string | null>(null);
    const handleStartDateChange = (date: Moment | null) => {
        setStartDate(date);
        setEndDate(date);
    };

    const handleEndDateChange = (date: Moment | null) => {
        setEndDate(date);
    };

    const handleStartTimeChange = (date: Moment | null) => {
        setStartTime(date);
        if (date && endTime && date.isAfter(endTime)) {
            setError("Start time must be less than or equal to end time.");
            return;
        }
        setError(null);
    };

    const handleEndTimeChange = (date: Moment | null) => {
        setEndTime(date);
        if (date && startTime && date.isBefore(startTime)) {
            setError("End time must be greater than or equal to start time.");
            return;
        }
        setError(null);
    };

    const handleStaffNumberChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setStaffNumber(event.target.value as number);
    };

    const handleSubmitForm = (event: React.ChangeEvent<{ value: unknown }>) => {
        const diffInMinutes = (endTime.valueOf() - startTime.valueOf()) / 60000;
        console.log("endTime.valueOf", endTime.valueOf())
        console.log("startTime.valueOf", startTime.valueOf())
        console.log("selectedDate", startDate.valueOf())
        console.log("diffInMinutes", diffInMinutes)
        console.log("staffNumber", staffNumber)
        const ess: IEditShiftStaff = {
            startDayAt: startDate,
            startTimeAt: startTime,
            endTimeAt: endTime,
            endDayAt: endDate,
            actualStaff: staffNumber
        };
        handleSubmit(ess);
    }
    const duration = moment.duration(endTime.diff(startTime));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    return <Box data-testid={`shift-staff-form`}
                sx={{
                    paddingTop: '10px',
                    paddingLeft: '20px',
                    paddingBottom: '10px',
                    paddingRight: '20px',
                    width: '400px'
                }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h2" component="h2" fontWeight={"bold"}>Edit staff</Typography>
            <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={cancelHandler}>
                <CloseIcon fontSize="inherit"/>
            </IconButton>
        </Box>
        <Box sx={{paddingTop: '10px'}}>
            <Typography variant="h3" component="h3">Date</Typography>
            <Box sx={{paddingTop: '10px'}}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'en-gb'}>
                    <DatePicker sx={{backgroundColor: '#FFFFFF', width: '100%'}} label="Start Date" value={startDate}
                                onChange={handleStartDateChange}
                                format="DD MMMM YYYY"
                                renderInput={(params) => <TextField {...params} />}/>
                </LocalizationProvider>
            </Box>
            <Box sx={{paddingTop: '10px'}}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'en-gb'}>
                    <DatePicker sx={{backgroundColor: '#FFFFFF', width: '100%'}} label="End Date" value={endDate}
                                onChange={handleEndDateChange}
                                format="DD MMMM YYYY"
                                renderInput={(params) => <TextField {...params} />}/>
                </LocalizationProvider>
            </Box>
        </Box>
        <Box sx={{paddingTop: '10px'}}>
            <Typography variant="h3" component="h3">Time</Typography>
            <Box sx={{paddingTop: '10px', display: 'flex', justifyContent: 'flex-start'}}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'en-gb'}>
                    <TimePicker sx={{backgroundColor: '#FFFFFF', width: '50%'}} label="Start Time"
                                value={startTime}
                                ampm={false}
                                onChange={handleStartTimeChange}
                                minutesStep={interval}
                                views={['hours', 'minutes']}
                                renderInput={(params) => <TextField {...params} />}/>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'en-gb'}>
                    <TimePicker sx={{paddingLeft: '10px', backgroundColor: '#FFFFFF', width: '50%'}} label="End Time"
                                value={endTime}
                                onChange={handleEndTimeChange}
                                minutesStep={interval}
                                ampm={false}
                                views={['hours', 'minutes']}
                                renderInput={(params) => <TextField {...params} />}/>
                </LocalizationProvider>
            </Box>
        </Box>
        <Box sx={{paddingTop: '10px', paddingBottom: '10px'}}>
            <Typography variant="h3" component="h3">Staff</Typography>
            <Box sx={{paddingTop: '10px'}}>
                <TextField sx={{backgroundColor: '#FFFFFF', width: '100%'}} label="Staff Number"
                           value={staffNumber}
                           onChange={handleStaffNumberChange} type="number"/>
            </Box>
        </Box>
        {error && <Typography color="error" sx={{paddingTop: '10px'}}>{error}</Typography>}
        <Box sx={{paddingTop: '10px', paddingLeft: '10px', paddingRight: '20px', backgroundColor: '#E6E9F1'}}>
            <Typography variant="h6">Summary of Selections:</Typography>
            <Box sx={{paddingTop: '10px'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <CalendarTodayIcon sx={{marginRight: '5px'}}/>
                    <span style={{fontWeight: 'bold'}}>{endDate.diff(startDate, 'days') + 1} days</span>
                </Box>
                <Typography
                    sx={{paddingLeft: '32px'}}>{startDate.format('DD MMM YYYY')} to {endDate.format('DD MMM YYYY')}</Typography>
            </Box>
            <Box sx={{paddingTop: '10px'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <AccessTimeIcon sx={{marginRight: '5px'}}/>
                    <span style={{fontWeight: 'bold'}}>{hours} hours {minutes !== 0 && ` and ${minutes} minutes`}</span>
                </Box>
                <Typography
                    sx={{paddingLeft: '32px'}}>{startTime.format('HH:mm')} to {endTime.format('HH:mm')} </Typography>
            </Box>
            <Box sx={{paddingTop: '10px'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <PeopleIcon sx={{marginRight: '5px'}}/>
                    <span style={{fontWeight: 'bold'}}>Staff</span>
                </Box>
                <Typography sx={{paddingLeft: '32px'}}>{staffNumber}</Typography>
            </Box>
        </Box>
        <Box sx={{paddingTop: '10px'}}>
            <Button sx={{
                textTransform: 'none',
                paddingLeft: '10px',
                color: 'white',
                width: '100%',
                backgroundColor: 'primary.main',
                '&:hover': {
                    backgroundColor: 'primary.dark',
                }
            }} disabled={!!error} onClick={handleSubmitForm}>Save staff updates</Button>
        </Box>
    </Box>

}
