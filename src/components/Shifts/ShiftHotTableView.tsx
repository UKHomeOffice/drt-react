import React, {useState} from 'react';
import {Box, Typography, IconButton} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Handsontable from 'handsontable';
import {HotTable} from '@handsontable/react';
import moment from 'moment';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

interface Shift {
  id: number;
  name: string;
  defaultStaffNumber: number;
  startTime: string;
  endTime: string;
}

interface Day {
  id: number;
  date: string;
  shifts: Shift[];
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

const generateColumns = (daysInMonth: number) => {
  const columns: Handsontable.ColumnSettings[] = [{data: 'time', title: 'Time', width: 100}];
  const columnWidth = Math.max(55, Math.floor(1200 / daysInMonth));

  for (let i = 1; i <= daysInMonth; i++) {
    columns.push({data: `day${i}`, title: '', width: columnWidth});
  }
  return columns;
};

const generateRows = (data: Day[], shiftType: string, interval: number, isExpanded: boolean) => {
  const rows: any[] = [];
  const shift = data[0].shifts.find(s => s.name === shiftType);
  if (shift) {
    const start = moment(shift.startTime, 'HH:mm');
    const end = moment(shift.endTime, 'HH:mm');
    const headerRow: any = {time: `${shift.startTime} - ${shift.endTime}`};
    data.forEach((day, index) => {
      headerRow[`day${index + 1}`] = shift.defaultStaffNumber;
    });
    rows.push(headerRow);

    if (isExpanded) {
      while (start <= end) {
        const row: any = {time: start.format('HH:mm')};
        data.forEach(day => {
          const shift = day.shifts.find(s => s.name === shiftType);
          if (shift) {
            row[`day${day.id + 1}`] = shift.defaultStaffNumber;
          }
        });
        rows.push(row);
        start.add(interval, 'minutes');
      }
    }
  }
  return rows;
};

export const ShiftHotTableView: React.FC<{ month: number, interval: number }> = ({month, interval}) => {
  registerAllModules();

  const daysInMonth = moment().month(month - 1).daysInMonth();
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const [data, setData] = useState(() => {
    return Array.from({length: daysInMonth}, (_, i) => ({
      id: i,
      date: `${i + 1} ${moment().month(month - 1).date(i + 1).format('ddd')}`,
      shifts: [
        {id: 1, name: 'Early shift', defaultStaffNumber: 12, startTime: '06:30', endTime: '16:30'},
        {id: 2, name: 'Mid shift', defaultStaffNumber: 12, startTime: '12:00', endTime: '22:30'},
        {id: 3, name: 'Late shift', defaultStaffNumber: 12, startTime: '13:00', endTime: '23:00'},
        {id: 4, name: 'Night shift', defaultStaffNumber: 12, startTime: '21:30', endTime: '23:30'}
      ]
    }));
  });

  const shiftTypes = [
    {name: 'Early shift', startTime: '06:30', endTime: '16:30'},
    {name: 'Mid shift', startTime: '12:00', endTime: '22:30'},
    {name: 'Late shift', startTime: '13:00', endTime: '23:00'},
    {name: 'Night shift', startTime: '21:30', endTime: '23:30'}
  ];

  const handleAfterChange = (changes: Handsontable.CellChange[] | null, source: string) => {
    if (changes && source !== 'loadData') {
      const newData = [...data];
      changes.forEach(([row, prop, oldValue, newValue]) => {
        if (typeof prop === 'string') {
          const [dayIndex, shiftIndex] = prop.match(/\d+/g)!.map(Number);
          newData[dayIndex - 1].shifts[shiftIndex - 1].defaultStaffNumber = newValue;
        }
      });
      setData(newData);
    }
  };

  const toggleRowExpansion = (shiftType: string) => {
    setExpandedRows(prev => ({...prev, [shiftType]: !prev[shiftType]}));
  };

 const cellRenderer = function(this: any, instance: Handsontable, td: HTMLTableCellElement, row: number, col: number, prop: string | number, value: any, cellProperties: Handsontable.CellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
  td.style.border = '1px solid #ccc';
  td.style.borderSpacing = '0';
  td.style.padding = '0';
};

  return (
    <Box sx={{width: '100%'}}>
      <Typography variant="h4" gutterBottom>{moment().month(month - 1).format('MMMM YYYY')}</Typography>
      {shiftTypes.map((shiftType, index) => {
        const isExpanded = expandedRows[shiftType.name] || false;
        const rows = generateRows(data, shiftType.name, interval, isExpanded);
        return (
          <Box key={index} sx={{marginBottom: 4}}>
            <Box display="flex" alignItems="center">
              <Typography variant="h6" gutterBottom>{shiftType.name}</Typography>
              <IconButton onClick={() => toggleRowExpansion(shiftType.name)}>
                {isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
              </IconButton>
            </Box>
            <HotTable
              data={rows}
              colHeaders={generateColumnHeaders(daysInMonth)}
              columns={generateColumns(daysInMonth)}
              style={{border: '1px solid #ccc',borderSpacing: '0' }} // Apply border to the table
              cell={{className: 'htCenter htMiddle', renderer: 'text'}}
              dropdownMenu={false}
              hiddenColumns={{
                indicators: true,
              }}
              contextMenu={false}
              multiColumnSorting={true}
              filters={true}
              rowHeaders={false}
              autoWrapCol={true}
              autoWrapRow={true}
              manualRowMove={true}
              licenseKey="non-commercial-and-evaluation"
              preventOverflow="horizontal"
              selectionMode="mutliple"
              cells={(row, col) => {
              return {
                renderer: cellRenderer
              };
            }}

            />
            <style>
              {
                `.htFocusCatcher {
                    display: none !important;
                  }`
              }
            </style>
          </Box>
        );
      })}
    </Box>
  );
};