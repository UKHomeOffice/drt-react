import React, {useState} from 'react';
import {Box, Button, IconButton, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Handsontable from 'handsontable';
import {HotTable} from '@handsontable/react';
import moment from 'moment';
import {registerAllModules} from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import {LocalDate} from './LocalDate';

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
  startTime: LocalDate;
  endTime: LocalDate;
}

export interface ShiftData {
  index: number;
  defaultShift: DefaultShift;
  assignments: ShiftAssignment[];
}

const generateColumnHeaders = (daysInMonth: number) => {
  const headers: string[] = ['Time'];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = moment().date(i).format('D');
    const day = moment().date(i).format('ddd');
    headers.push(`${date}</br>${day}`);
  }
  return headers;
};

const generateColumns = (tableIndex: number, daysInMonth: number) => {
  const columns: Handsontable.ColumnSettings[] = [{data: 'time', title: 'Time', width: 100, readOnly: true}];
  const columnWidth = Math.max(55, Math.floor(1200 / daysInMonth));

  for (let day = 1; day <= daysInMonth; day++) {
    columns.push({data: `${tableIndex}-${day}`, title: ``, width: columnWidth, readOnly: false});
  }
  return columns;
};

const generateRows = (tableIndex: number, shift: ShiftData, month: number, interval: number, isExpanded: boolean) => {
  const rows: any[] = [];
  const daysInMonth = moment().month(month - 1).daysInMonth();

  const headerRow: any = {id: 'header', time: `${shift.defaultShift.startTime} - ${shift.defaultShift.endTime}`};
  for (let day = 1; day <= daysInMonth; day++) {
    const dayAssignments = shift.assignments.filter(assignment => assignment.startTime.day === day);
    const staffNumbers = dayAssignments.map(assignment => assignment.staffNumber);
    const minStaffNumber = Math.min(...staffNumbers);
    const maxStaffNumber = Math.max(...staffNumbers);
    headerRow[`${tableIndex}-${day}`] = `${minStaffNumber} - ${maxStaffNumber}`;
  }
  rows.push(headerRow);

  if (isExpanded) {
    const [startHour, startMinute] = shift.defaultShift.startTime.split(':').map(Number);
    const [endHour, endMinute] = shift.defaultShift.endTime.split(':').map(Number);
    const startTime = new LocalDate(2024, month, 1, startHour, startMinute);
    const endTime = new LocalDate(2024, month, 1, endHour, endMinute);

    let currentTime = startTime;
    while (currentTime.isBefore(endTime)) {
      const nextTime = currentTime.addMinutes(interval);
      const row: any = {time: `${currentTime.hour.toString().padStart(2, '0')}:${currentTime.minute.toString().padStart(2, '0')} - ${nextTime.hour.toString().padStart(2, '0')}:${nextTime.minute.toString().padStart(2, '0')}`};
      for (let day = 1; day <= daysInMonth; day++) {
        const dayAssignments = shift.assignments.filter(assignment => assignment.startTime.day === day && assignment.startTime.hour === currentTime.hour && assignment.startTime.minute === currentTime.minute);
        const staffNumber = dayAssignments.length > 0 ? dayAssignments[0].staffNumber : '';
        row[`${tableIndex}-${day}`] = staffNumber;
      }
      rows.push(row);
      currentTime = currentTime.addMinutes(interval);
    }
  }

  return rows;
};

export interface ShiftHotTableViewProps {
  month: number;
  interval: number;
  initialShifts: ShiftData[];
  handleSaveChanges: (shifts: ShiftData[]) => void;
}

export const ShiftHotTableView: React.FC<{
  month: number,
  interval: number,
  initialShifts: ShiftData[],
  handleSaveChanges: (shifts: ShiftData[]) => void
}> = ({month, interval, initialShifts, handleSaveChanges}: ShiftHotTableViewProps) => {
  registerAllModules();

  const daysInMonth = moment().month(month - 1).daysInMonth();
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});
  const [shifts, setShifts] = useState<ShiftData[]>(initialShifts);

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
      const newShifts = [...shifts];
      changes.forEach(([row, prop, oldValue, newValue]) => {
        if (typeof prop === 'string') {
          const [tableIndex, columnIndex] = prop.split('-').map(Number);
          console.log('tableIndex', tableIndex, 'columnIndex', columnIndex, 'row', row);
          newShifts.forEach(shift => {
            console.log('shift', shift)
          });
          const shiftIndex = newShifts.findIndex(shift => shift.index === tableIndex);
          console.log('shiftIndex', shiftIndex);
          if (shiftIndex !== -1) {
            if (columnIndex) {
              // Handle changes in the column cells
              const assignmentIndex = newShifts[shiftIndex].assignments.findIndex(assignment => assignment.row === row && assignment.column === columnIndex);
              console.log('assignmentIndex', assignmentIndex);
              if (assignmentIndex !== -1) {
                newShifts[shiftIndex].assignments[assignmentIndex].staffNumber = parseInt(newValue, 10);
              }
            } else if (prop === 'time') {
              // Handle changes in the first column
              const [startTime, endTime] = newValue.split(' - ');
              newShifts[shiftIndex].defaultShift.startTime = startTime;
              newShifts[shiftIndex].defaultShift.endTime = endTime;
            }
          }
        }
      });
      setShifts(newShifts);
    }
  };

  return (
    <Box sx={{width: '100%'}}>
      <Typography variant="h4" gutterBottom>{moment().month(month - 1).format('MMMM YYYY')}</Typography>
      {shifts.map((shift, index) => {
        const isExpanded = expandedRows[shift.defaultShift.name] || false;
        const rows = generateRows(index, shift, month, interval, isExpanded);
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
              data={rows}
              colHeaders={generateColumnHeaders(daysInMonth)}
              columns={generateColumns(index, daysInMonth)}
              style={{border: '1px solid #ccc', borderSpacing: '0'}}
              dropdownMenu={false}
              hiddenColumns={{indicators: true}}
              contextMenu={false}
              multiColumnSorting={true}
              filters={true}
              rowHeaders={false}
              autoWrapCol={true}
              autoWrapRow={true}
              manualRowMove={true}
              manualColumnMove={true}
              licenseKey="non-commercial-and-evaluation"
              preventOverflow="horizontal"
              selectionMode="multiple"
              fillHandle={{autoInsertRow: true}}
              cells={(row, col) => ({renderer: cellRenderer})}
              afterChange={handleAfterChange}
            />
            <style>
              {`.htFocusCatcher { display: none !important; }`}
            </style>
          </Box>
        );
      })}
      <Button variant="contained" color="primary" onClick={() => handleSaveChanges(shifts)}>
        Save Changes
      </Button>
    </Box>
  );
};