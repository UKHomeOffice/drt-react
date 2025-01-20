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

export interface ViewDate {
  year: number;
  month: number;
  day: number;
}

export interface ShiftDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export interface DefaultShift {
  name: string;
  defaultStaffNumber: number;
  startTime: string;
  endTime: string;
}

export interface ShiftAssignment {
  column: number;
  row: number;
  name: string;
  staffNumber: number;
  startTime: ShiftDate;
  endTime: ShiftDate;
}

export interface ShiftData {
  index: number;
  defaultShift: DefaultShift;
  assignments: ShiftAssignment[];
}

const getWeekFirstDate = (date: ViewDate) => {
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


const generateColumnHeaders = (viewDate: ViewDate, dayRange: string, daysInMonth: number) => {
  const headers: string[] = ['Time'];
  const {firstDate} = getWeekFirstDate(viewDate);
  const daysCount = numberOfDays(dayRange, daysInMonth);
  let nextDate = dayRange === 'weekly' ?
    new LocalDate(firstDate.year, firstDate.month, firstDate.day, 0, 0) : dayRange === 'daily' ?
      new LocalDate(viewDate.year, viewDate.month, viewDate.day, 0, 0) : new LocalDate(viewDate.year, viewDate.month, 1, 0, 0);
  for (let i = 1; i <= daysCount; i++) {
    const date = moment({year: nextDate.year, month: nextDate.month - 1, day: nextDate.day});
    const formattedDate = date.format('D');
    const day = date.format('ddd');
    headers.push(`${formattedDate}</br>${day}`);
    nextDate = nextDate.addDays(1);
  }
  return headers;
};

const generateColumns = (dayRange: string, tableIndex: number, daysInMonth: number) => {
  const columns: Handsontable.ColumnSettings[] = [{data: 'time', title: 'Time', width: 100, readOnly: true}];
  const columnWidth = Math.max(55, Math.floor(1200 / daysInMonth));
  const daysCount = numberOfDays(dayRange, daysInMonth);

  for (let day = 1; day <= daysCount; day++) {
    columns.push({data: `${tableIndex}-${day}`, title: ``, width: columnWidth, readOnly: false});
  }
  return columns;
};

const generateRows = (viewDate: ViewDate, dayRange: string, tableIndex: number, shift: ShiftData, interval: number, isExpanded: boolean) => {
  const rows: any[] = [];
  const daysInMonth = moment().month(viewDate.month - 1).daysInMonth();
  const {firstDate} = getWeekFirstDate(viewDate);
  const daysCount = numberOfDays(dayRange, daysInMonth);
  const firstDay = dayRange === 'weekly' ?
    new LocalDate(firstDate.year, firstDate.month, firstDate.day, 0, 0) : dayRange === 'daily' ?
      new LocalDate(viewDate.year, viewDate.month, viewDate.day, 0, 0) : new LocalDate(viewDate.year, viewDate.month, 1, 0, 0);

  if (shift) {
    let displayEndTime = '';
    if (shift.defaultShift.endTime === '24:00')
      displayEndTime = '00:00'
    else
      displayEndTime = shift.defaultShift.endTime
    const headerRow: any = {id: 'header', time: `${shift.defaultShift.startTime} - ${displayEndTime}`};
    let nextDate = firstDay;

    for (let day = 1; day <= daysCount; day++) {
      const dayAssignments = shift.assignments.filter(assignment => assignment.startTime.day === nextDate.day && assignment.startTime.year === nextDate.year && assignment.startTime.month === nextDate.month);
      const staffNumbers = dayAssignments.map(assignment => assignment.staffNumber);
      const minStaffNumber = Math.min(...staffNumbers);
      const maxStaffNumber = Math.max(...staffNumbers);
      headerRow[`${tableIndex}-${day}`] = `${minStaffNumber} - ${maxStaffNumber}`;
      nextDate = nextDate.addDays(1);
    }
    rows.push(headerRow);

    if (isExpanded) {
      const [startHour, startMinute] = shift.defaultShift.startTime.split(':').map(Number);
      const [endHour, endMinute] = shift.defaultShift.endTime.split(':').map(Number);
      const startTime: LocalDate = new LocalDate(firstDay.year, firstDay.month, firstDay.day, startHour, startMinute);

      const isShiftEndAfterMidNight = endHour < startHour || (endHour == startHour && endMinute < startMinute)
      let endDate  = new LocalDate(firstDay.year, firstDay.month, firstDay.day, endHour, endMinute);
      if (isShiftEndAfterMidNight) {
        // const nDate = moment({ year: endDate.year, month: endDate.month - 1, day: endDate.day, hour: endDate.hour, minute: endDate.minute });
        // const d = nDate.add(1, 'day');
        // endDate = new LocalDate(d.year(), d.month() + 1, d.date(), endHour, endMinute);
        // console.log('inside new end date',new LocalDate(d.year(), d.month() + 1, d.date(), endHour, endMinute), 'nDate', nDate , 'startTime',startTime , 'endDate', endDate)
        endDate = endDate.addDays(1)
        console.log('new end date',endDate.addDays(1), 'end date', endDate , 'start date', startTime)
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
        const row: any = {time: `${currentTime.hour.toString().padStart(2, '0')}:${currentTime.minute.toString().padStart(2, '0')} - ${nextTimeHourDisplay.toString().padStart(2, '0')}:${nextTime.minute.toString().padStart(2, '0')}`};
        let nextDay = firstDay;
        for (let day = 1; day <= daysCount; day++) {
          const dayAssignments = shift.assignments.filter(assignment => assignment.startTime.year === nextDay.year && assignment.startTime.month === nextDay.month
            && assignment.startTime.day === nextDay.day && assignment.startTime.hour === currentTime.hour && assignment.startTime.minute === currentTime.minute);
          row[`${tableIndex}-${day}`] = dayAssignments.length > 0 ? dayAssignments[0].staffNumber : '';
          nextDay = nextDay.addDays(1);
        }
        rows.push(row);
        currentTime = nextTime;
      }
    }
    return rows;
  }

}

export interface ShiftHotTableViewProps {
  interval: number;
  dayRange: string;
  viewDate: ViewDate;
  initialShifts: ShiftData[];
  handleSaveChanges: (shifts: ShiftData[], changedAssignments: ShiftAssignment[]) => void;
}

export const ShiftHotTableView: React.FC<ShiftHotTableViewProps> = ({
                                                                      interval,
                                                                      dayRange,
                                                                      viewDate,
                                                                      initialShifts,
                                                                      handleSaveChanges
                                                                    }) => {
  registerAllModules();

  const daysInMonth = moment().month(viewDate.month - 1).daysInMonth();
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const toggleRowExpansion = (shiftType: string) => {
    setExpandedRows(prev => ({...prev, [shiftType]: !prev[shiftType]}));
  };

  const cellRenderer = function (this: any, instance: Handsontable, td: HTMLTableCellElement, row: number, col: number, prop: string | number, value: any, cellProperties: Handsontable.CellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
    td.style.border = '1px solid #ccc';
    td.style.borderSpacing = '0';
    td.style.padding = '0';
  };

  const handleAfterChange = (changes: Handsontable.CellChange[] | null, source: string) => {
    if (changes && source !== 'loadData') {
      const newShifts = [...initialShifts];
      const changedAssignments: ShiftAssignment[] = [];
      changes.forEach(([row, tableColumn, oldValue, newValue]) => {
        if (typeof tableColumn === 'string') {
          const [tableIndex, columnIndex] = tableColumn.split('-').map(Number);
          const shiftIndex = newShifts.findIndex(shift => shift.index === tableIndex);
          if (shiftIndex !== -1) {
            if (columnIndex) {
              const assignmentIndex = newShifts[shiftIndex].assignments.findIndex(assignment => assignment.row === row && assignment.column === columnIndex);

              if (assignmentIndex !== -1) {
                newShifts[shiftIndex].assignments[assignmentIndex].staffNumber = parseInt(newValue, 10);
                changedAssignments.push(newShifts[shiftIndex].assignments[assignmentIndex]);
              }
            } else if (tableColumn === 'time') {
              const [startTime, endTime] = newValue.split(' - ');
              newShifts[shiftIndex].defaultShift.startTime = startTime;
              newShifts[shiftIndex].defaultShift.endTime = endTime;
            }
          }
        }
      });
      handleSaveChanges(newShifts, changedAssignments);
    }
  };

  return (
    <ThemeProvider theme={drtTheme}>
      {initialShifts.map((shift, index) => {
        const isExpanded = expandedRows[shift.defaultShift.name] || false;
        const rows = generateRows(viewDate, dayRange, index, shift, interval, isExpanded);
        let tableHeight = 84;
        if(rows) tableHeight = rows.length * 24 + 60;

        return (
          <Box key={index} sx={{marginBottom: 4}}>
            <Box display="flex" alignItems="center">
              <Typography variant="h6" gutterBottom>{shift.defaultShift.name}</Typography>
              <IconButton onClick={() => toggleRowExpansion(shift.defaultShift.name)}>
                {isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
              </IconButton>
            </Box>
            <HotTable
              id={`hot-table-${index}`}
              className={`shift-hot-table-${index}`}
              data={rows}
              colHeaders={generateColumnHeaders(viewDate, dayRange, daysInMonth)}
              columns={generateColumns(dayRange, index, daysInMonth)}
              style={{borderSpacing: '0', height: `${tableHeight}px`}}
              cells={(row, col) => ({
                renderer: cellRenderer
              })}
              afterChange={handleAfterChange}
            />
          </Box>
        );
      })}
    </ThemeProvider>
  );
};