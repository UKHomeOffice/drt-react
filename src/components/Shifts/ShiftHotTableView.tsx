import React, {useState} from 'react';
import {Box, IconButton, ThemeProvider, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Handsontable from 'handsontable';
import {HotTable} from '@handsontable/react';
import moment from 'moment';
import {registerAllModules} from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import {LocalDate} from './LocalDate';
import {drtTheme} from '../../index';
import EditIcon from '@mui/icons-material/Edit';
import {shiftDateToString} from "../Util";

export interface ShiftDate {
  year: number;
  month: number;
  day: number;
}

export interface ShiftDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export interface ShiftSummary {
  name: string;
  startTime: string;
  endTime: string;
  startDate: ShiftDate;
  endDate?: ShiftDate;
  defaultStaffNumber: number;
}

export interface StaffTableEntry {
  column: number;
  row: number;
  name: string;
  staffNumber: number;
  startTime: ShiftDateTime;
  endTime: ShiftDateTime;
}

export interface ShiftSummaryStaffing {
  index: number;
  shiftSummary: ShiftSummary;
  staffTableEntries: StaffTableEntry[];
}

const getWeekFirstDate = (date: ShiftDate) => {
  const givenDate = moment({year: date.year, month: date.month - 1, day: date.day});
  const startOfWeek = givenDate.clone().startOf('week');
  return {
    firstDate: {
      year: startOfWeek.year(),
      month: startOfWeek.month() + 1,
      day: startOfWeek.date(),
      hours: 0,
      minutes: 0
    }
  };
};

const numberOfDays = (dayRange: string, daysInMonth: number) => {
  if (dayRange === 'weekly')
    return 7;
  else if (dayRange === 'daily')
    return 1;
  else
    return daysInMonth;
}


const generateColumnHeaders = (shiftDate: ShiftDate, dayRange: string, daysInMonth: number) => {
  const headers: string[] = [];
  const {firstDate} = getWeekFirstDate(shiftDate);
  const daysCount = numberOfDays(dayRange, daysInMonth);
  let nextDate = dayRange === 'weekly' ?
    new LocalDate(firstDate.year, firstDate.month, firstDate.day, 0, 0) : dayRange === 'daily' ?
      new LocalDate(shiftDate.year, shiftDate.month, shiftDate.day, 0, 0) : new LocalDate(shiftDate.year, shiftDate.month, 1, 0, 0);
  for (let i = 1; i <= daysCount; i++) {
    const date = moment({year: nextDate.year, month: nextDate.month - 1, day: nextDate.day});
    const formattedDate = date.format('D');
    const day = date.format('ddd');
    headers.push(`<div style="text-align: left; padding-left: 1px; margin: 0;">${formattedDate}<br>${day}</div>`);
    nextDate = nextDate.addDays(1);
  }
  return headers;
};

const generateColumns = (dayRange: string, tableIndex: number, daysInMonth: number) => {
  const columns: Handsontable.ColumnSettings[] = [];//[{data: 'time', title: 'Time', width: 100, readOnly: true}];
  const columnWidth = Math.max(55, Math.floor(1200 / daysInMonth));
  const daysCount = numberOfDays(dayRange, daysInMonth);

  for (let day = 1; day <= daysCount; day++) {
    columns.push({data: `${tableIndex}-${day}`, title: ``, width: columnWidth, readOnly: false});
  }
  return columns;
};

const generateRows = (shiftDate: ShiftDate, dayRange: string, tableIndex: number, shift: ShiftSummaryStaffing, interval: number, isExpanded: boolean) => {
  const rows: any[] = [];
  const rowHeaders: string[] = [];
  const daysInMonth = moment().month(shiftDate.month - 1).daysInMonth();
  const {firstDate} = getWeekFirstDate(shiftDate);
  const daysCount = numberOfDays(dayRange, daysInMonth);
  const firstDay = dayRange === 'weekly' ?
    new LocalDate(firstDate.year, firstDate.month, firstDate.day, 0, 0) : dayRange === 'daily' ?
      new LocalDate(shiftDate.year, shiftDate.month, shiftDate.day, 0, 0) : new LocalDate(shiftDate.year, shiftDate.month, 1, 0, 0);

  if (shift) {
    let displayEndTime = '';
    if (shift.shiftSummary.endTime === '24:00')
      displayEndTime = '00:00'
    else
      displayEndTime = shift.shiftSummary.endTime

    if (isExpanded) {
      const [startHour, startMinute] = shift.shiftSummary.startTime.split(':').map(Number);
      const [endHour, endMinute] = shift.shiftSummary.endTime.split(':').map(Number);
      const startTime: LocalDate = new LocalDate(firstDay.year, firstDay.month, firstDay.day, startHour, startMinute);

      const isShiftEndAfterMidNight = endHour < startHour || (endHour == startHour && endMinute < startMinute)
      let endDate = new LocalDate(firstDay.year, firstDay.month, firstDay.day, endHour, endMinute);
      if (isShiftEndAfterMidNight) {
        endDate = endDate.addDays(1)
        console.log('new end date', endDate.addDays(1), 'end date', endDate, 'start date', startTime)
      }

      const endTime: LocalDate = endDate;

      let currentTime = startTime;
      while (currentTime.isBefore(endTime)) {
        let nextTime
        if ((currentTime.minute === 30 && interval === 60) || (currentTime.hour === endTime.hour && interval === 60 && endTime.minute === 30)) {
          nextTime = currentTime.addMinutes(30);
        } else {
          nextTime = currentTime.addMinutes(interval);
        }
        let nextTimeHourDisplay = 0;
        if (nextTime.hour === 24)
          nextTimeHourDisplay = 0
        else
          nextTimeHourDisplay = nextTime.hour
        const row: any = {}
        let nextDay = firstDay;
        for (let day = 1; day <= daysCount; day++) {
          const dayAssignments = shift.staffTableEntries.filter(assignment => assignment.startTime.year === nextDay.year && assignment.startTime.month === nextDay.month
            && assignment.startTime.day === nextDay.day && assignment.startTime.hour === currentTime.hour && assignment.startTime.minute === currentTime.minute);
          row[`${tableIndex}-${day}`] = dayAssignments.length > 0 ? dayAssignments[0].staffNumber : '-';
          nextDay = nextDay.addDays(1);
        }
        rows.push(row);
        rowHeaders.push(`${currentTime.hour.toString().padStart(2, '0')}:${currentTime.minute.toString().padStart(2, '0')} to ${nextTimeHourDisplay.toString().padStart(2, '0')}:${nextTime.minute.toString().padStart(2, '0')}`);
        currentTime = nextTime;
      }
    } else {
      const headerRow: any = {};
      let nextDate = firstDay;

      for (let day = 1; day <= daysCount; day++) {
        const dayAssignments = shift.staffTableEntries.filter(assignment => assignment.startTime.day === nextDate.day && assignment.startTime.year === nextDate.year && assignment.startTime.month === nextDate.month);
        const staffNumbers = dayAssignments.map(assignment => assignment.staffNumber);
        if (staffNumbers.length === 0) {
          headerRow[`${tableIndex}-${day}`] = 'N/A';
        } else {
          const minStaffNumber = Math.min(...staffNumbers);
          const maxStaffNumber = Math.max(...staffNumbers);
          headerRow[`${tableIndex}-${day}`] = (minStaffNumber === maxStaffNumber) ? `${minStaffNumber}` : `${minStaffNumber} to ${maxStaffNumber}`;
        }
        nextDate = nextDate.addDays(1);
      }
      rows.push(headerRow);
      rowHeaders.push(`${shift.shiftSummary.startTime} to ${displayEndTime}`);
    }
    return {rows, rowHeaders};
  }
}

export interface ShiftHotTableViewProps {
  interval: number;
  dayRange: string;
  shiftDate: ShiftDate;
  shiftSummaries: ShiftSummaryStaffing[];
  handleSaveChanges: (shifts: ShiftSummaryStaffing[], changedAssignments: StaffTableEntry[]) => void;
  handleEditShift: (index: number, shiftSummary: ShiftSummary) => void;
}

export const ShiftHotTableView: React.FC<ShiftHotTableViewProps> = ({
                                                                      interval,
                                                                      dayRange,
                                                                      shiftDate,
                                                                      shiftSummaries,
                                                                      handleSaveChanges,
                                                                      handleEditShift
                                                                    }) => {
  registerAllModules();

  // const daysInMonth = moment().month(shiftDate.month - 1).daysInMonth();
  const monthIndex = (shiftDate.month ?? (new Date().getMonth() + 1)) - 1;
  const daysInMonth = moment().month(monthIndex).daysInMonth();
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const toggleRowExpansion = (shiftType: string) => {
    setExpandedRows(prev => ({...prev, [shiftType]: !prev[shiftType]}));
  };

  const cellRenderer = (isExpanded: boolean) => {
    return function (
      this: any,
      instance: Handsontable,
      td: HTMLTableCellElement,
      row: number,
      col: number,
      prop: string | number,
      value: any,
      cellProperties: Handsontable.CellProperties
    ) {
      Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
      td.style.borderSpacing = '0';
      td.style.padding = '1';

      // Apply readOnly logic based on `isExpanded` and `col === 0`
      cellProperties.readOnly = !isExpanded && row === 0;
    };
  };

  const handleAfterChange = (changes: Handsontable.CellChange[] | null, source: string) => {
    if (changes && source !== 'loadData') {
      const newShifts = [...shiftSummaries];
      const changedAssignments: StaffTableEntry[] = [];
      changes.forEach(([row, tableColumn, oldValue, newValue]) => {
        if (typeof tableColumn === 'string') {
          const [tableIndex, columnIndex] = tableColumn.split('-').map(Number);
          const shiftIndex = newShifts.findIndex(shift => shift.index === tableIndex);
          if (shiftIndex !== -1) {
            if (columnIndex) {
              const assignmentIndex = newShifts[shiftIndex].staffTableEntries.findIndex(assignment => assignment.row === row && assignment.column === columnIndex);

              if (assignmentIndex !== -1) {
                newShifts[shiftIndex].staffTableEntries[assignmentIndex].staffNumber = parseInt(newValue, 10);
                changedAssignments.push(newShifts[shiftIndex].staffTableEntries[assignmentIndex]);
              }
            } else if (tableColumn === 'time') {
              const [startTime, endTime] = newValue.split(' - ');
              newShifts[shiftIndex].shiftSummary.startTime = startTime;
              newShifts[shiftIndex].shiftSummary.endTime = endTime;
            }
          }
        }
      });
      handleSaveChanges(newShifts, changedAssignments);
    }
  };

  return (
    <ThemeProvider theme={drtTheme}>
      {shiftSummaries.map((shift, index) => {
        const isExpanded = expandedRows[shift.shiftSummary.name] || false;
        const {rows, rowHeaders} = generateRows(shiftDate, dayRange, index, shift, interval, isExpanded);
        let tableHeight = 84;
        if (rows) tableHeight = isExpanded ? Math.min(rows.length * 24 + 60, 500) : 84;

        return (
          <Box key={index} sx={{marginBottom: 4}}>
            <Box display="flex" alignItems="center">
              <Typography variant="h6" gutterBottom>
                {shift.shiftSummary.name}
              </Typography>
              <IconButton onClick={() => toggleRowExpansion(shift.shiftSummary.name)}>
                {isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
              </IconButton>
            </Box>
            <Box display="flex" gap="20px" alignItems="center" paddingBottom="10px">
              <Typography>{`Time covered: ${shift.shiftSummary.startTime} to ${shift.shiftSummary.endTime}`}</Typography>
              <Typography>Default staff: {shift.shiftSummary.defaultStaffNumber}</Typography>
              <Typography>{`Start Date: ${shiftDateToString(shift.shiftSummary.startDate)}`}</Typography>
              <Typography>{shift.shiftSummary.endDate ? `End Date: ${shiftDateToString(shift.shiftSummary.endDate)}` : ''}</Typography>
              <Box
                sx={{
                  cursor: 'pointer',
                  color: 'primary.main',
                  textDecoration: 'underline',
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}
                onClick={() => handleEditShift(index, shift.shiftSummary)}
              >
                <EditIcon sx={{marginRight: '5px'}}/>
                <Typography>Edit Shift</Typography>
              </Box>
            </Box>
            <HotTable
              id={`hot-table-${index}`}
              className={`shift-hot-table-${index}`}
              data={rows}
              colHeaders={generateColumnHeaders(shiftDate, dayRange, daysInMonth)}
              columns={generateColumns(dayRange, index, daysInMonth)}
              style={{overflow: `hidden`, borderSpacing: '0', height: `${tableHeight}px`}}
              cells={(row, col) => ({
                renderer: cellRenderer(isExpanded)
              })}
              afterChange={handleAfterChange}
              bindRowsWithHeaders="strict"
              rowHeaders={rowHeaders}
              rowHeaderWidth={100}
              licenseKey={'non-commercial-and-evaluation'}
            />
          </Box>
        );
      })}
    </ThemeProvider>
  );
};