import React from "react";
import { Chip  } from "@mui/material";
import TungstenIcon from '@mui/icons-material/Tungsten';

export interface IFlightHighlightChip {
  text: string
}

export const FlightHighlightChip = ({text}: IFlightHighlightChip) => {
  return <Chip
          label={ text }
          icon={<TungstenIcon/>}
          sx={{
            backgroundColor: '#C2D9FF',
            fontWeight: 'bold',
            color: '#111224',
            margin: '2px 2px 2px 0px',
            borderRadius: 0,
          }} />

}
