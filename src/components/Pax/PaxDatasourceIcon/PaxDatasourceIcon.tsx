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
    <Tooltip title={`${content.statusText}`} sx={{cursor: 'pointer'}}>
      <Box sx={{maxWidth: '33px', maxHeight: '24px', position: 'relative', marginTop: '-1px' }}>
        <DatasourceIcon width={'20px'} />
        { content.iconBg && <Box sx={{position: 'absolute', top: 3, left: 10}}>
          { content.iconBg }
        </Box>}
        <Box sx={{position: 'absolute', top: 3, left: 10, textAlign: 'center'}}>
          { content.icon }
        </Box>
      </Box>
    </Tooltip>
  )
}
