import React from "react";
import { Box, Chip  } from "@mui/material";
import TungstenIcon from '@mui/icons-material/Tungsten';
import CustomHighlightIcon from './icon-highlight-pax.svg'
import { themePrimatives } from "../../theme/primatives";

export interface IFlightHighlightChip {
  text: string
}

const HighlightIcon = () => {
  return <Box sx={{marginLeft: '4px', minWidth: '25px'}} ><CustomHighlightIcon/></Box>
}

export const FlightHighlightChip = ({text}: IFlightHighlightChip) => {
  return <Chip
          label={ text }
          sx={{
            backgroundColor: '#ffe5cc',
            borderBottom: '2px solid #ffb266',
            fontWeight: 'bold',
            color: '#111224',
            margin: '2px 2px 2px 0px',
            borderRadius: 0,
            minHeight: '32px',
            height: 'auto',
            '> .MuiChip-label': {
              paddingTop: '2px',
              paddingBottom: '2px',
              overflow: 'visible',
              textOverflow: 'inherit',
              whiteSpace: 'nowrap',
              fontSize: '16px',
              [themePrimatives.breakpoints.up("md")]: {
                fontSize: '19px',
              },
            }
          }} />

}
