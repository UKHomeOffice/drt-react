import React from "react";
import { Chip  } from "@mui/material";
import TungstenIcon from '@mui/icons-material/Tungsten';
import CustomHighlightIcon from './icon-highlight-pax.svg'

export interface IFlightHighlightChip {
  text: string
}

const HighlightIcon = () => {
  return <CustomHighlightIcon width={24} style={{marginLeft: '4px'}} />
}

export const FlightHighlightChip = ({text}: IFlightHighlightChip) => {
  return <Chip
          label={ text }
          icon={<HighlightIcon/>}
          sx={{
            backgroundColor: '#C2D9FF',
            fontWeight: 'bold',
            color: '#111224',
            margin: '2px 2px 2px 0px',
            borderRadius: 0,
            '> span': {
              paddingLeft: '5px'
            }
          }} />

}
