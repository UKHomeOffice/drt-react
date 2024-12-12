import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridCellEditCommitParams } from '@mui/x-data-grid';
import moment from 'moment';

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

const generateColumns = (daysInMonth: number): GridColDef[] => {
  const columns: GridColDef[] = [{ field: 'time', headerName: 'Time', width: 100 }];
  const columnWidth = Math.max(55, Math.floor(1200 / daysInMonth));

  for (let i = 1; i <= daysInMonth; i++) {
    const date = moment().date(i).format('D');
    const day = moment().date(i).format('ddd');
    const dstring = `${date}${day}`;
    columns.push({ field: `day${i}`, headerName: dstring, width: columnWidth, editable: true });
  }
  return columns;
};

const generateRows = (data: Day[], shiftType: string, interval: number) => {
  const rows: any[] = [];
  const shift = data[0].shifts.find(s => s.name === shiftType);
  if (shift) {
    const start = moment(shift.startTime, 'HH:mm');
    const end = moment(shift.endTime, 'HH:mm');
    while (start <= end) {
      const row: any = { id: start.format('HH:mm'), time: start.format('HH:mm') };
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
  return rows;
};

export const ShiftView: React.FC<{ month: number, interval: number }> = ({ month, interval }) => {
  const daysInMonth = moment().month(month - 1).daysInMonth();

  const [data, setData] = useState(() => {
    return Array.from({ length: daysInMonth }, (_, i) => ({
      id: i,
      date: `${i + 1} ${moment().month(month - 1).date(i + 1).format('ddd')}`,
      shifts: [
        { id: 1, name: 'Early shift', defaultStaffNumber: 12, startTime: '06:30', endTime: '16:30' },
        { id: 2, name: 'Mid shift', defaultStaffNumber: 12, startTime: '12:00', endTime: '22:30' },
        { id: 3, name: 'Late shift', defaultStaffNumber: 12, startTime: '13:00', endTime: '23:00' },
        { id: 4, name: 'Night shift', defaultStaffNumber: 12, startTime: '21:30', endTime: '07:00' }
      ]
    }));
  });

  const handleCellEditCommit = (params: GridCellEditCommitParams) => {
    const updatedData = data.map(day => {
      if (day.id === params.id) {
        const shift = day.shifts.find(s => s.name === params.field);
        if (shift) {
          shift.defaultStaffNumber = params.value as number;
        }
      }
      return day;
    });
    setData(updatedData);
  };

  const shiftTypes = [
    { name: 'Early shift', startTime: '06:30', endTime: '16:30' },
    { name: 'Mid shift', startTime: '12:00', endTime: '22:30' },
    { name: 'Late shift', startTime: '13:00', endTime: '23:00' },
    { name: 'Night shift', startTime: '21:30', endTime: '07:00' }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>{moment().month(month - 1).format('MMMM YYYY')}</Typography>
      {shiftTypes.map((shiftType, index) => {
        const rows = generateRows(data, shiftType.name, interval);
        return (
          <Box key={index} sx={{ marginBottom: 4 }}>
            <Typography variant="h6" gutterBottom>{shiftType.name}</Typography>
            <DataGrid
              rows={rows}
              columns={generateColumns(daysInMonth)}
              autoHeight
              onCellEditCommit={handleCellEditCommit}
              disableSelectionOnClick
              isCellEditable={(params) => params.field !== 'time'}
            />
          </Box>
        );
      })}
    </Box>
  );
};
