import React from "react";
import DatasourceIcon from './DatasourceIcon.svg';
import { Tooltip, Box } from "@mui/material";

import { DatasourceStatus, getPaxContent } from "../PaxUtils";

export interface IPaxDatasource {
  status: DatasourceStatus,
} 

export const PaxDatasource = ({status}: IPaxDatasource) => {
  
  const content = getPaxContent(status);

  return (
    <Tooltip title={`${status}: ${content.statusText}`} sx={{cursor: 'pointer'}}>
      <Box sx={{maxWidth: '25px', position: 'relative'}}>
        <DatasourceIcon />
        <Box sx={{position: 'absolute', bottom: -8, right: -12}}>{ content.icon }</Box>
      </Box>
    </Tooltip>
  )
}