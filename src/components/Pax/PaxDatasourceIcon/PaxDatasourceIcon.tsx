import React from "react";
import DatasourceIcon from './DatasourceIcon.svg';
import DatasourceIconGreen from './DatasourceIcon-green.svg';
import DatasourceIconRed from './DatasourceIcon-red.svg';
import DatasourceIconYellow from './DatasourceIcon-yellow.svg';
import DatasourceIconBlack from './DatasourceIcon-black.svg';
import { Tooltip, Box } from "@mui/material";

import { DatasourceStatus, getPaxContent } from "../PaxUtils";

export interface IPaxDatasource {
  status: DatasourceStatus,
  width?: string,
} 

export const PaxDatasource = ({status, width}: IPaxDatasource) => {
  
  const content = getPaxContent(status);

  let icon;
  switch(status) {
    case DatasourceStatus.Estimate:
      icon = <DatasourceIconRed />;
      break;
    case DatasourceStatus.PortForecast:
      icon = <DatasourceIconYellow />;
      break;
    case DatasourceStatus.DRTForecast:
      icon = <DatasourceIconBlack />;
      break;
    case DatasourceStatus.PortLiveData:
      icon = <DatasourceIconGreen />;
      break;
    case DatasourceStatus.CarrierData:
      icon = <DatasourceIconBlack />;
      break;
    case DatasourceStatus.TerminalAverageData:
      icon = <DatasourceIconRed />;
      break;
    case DatasourceStatus.PastCarrierData:
      icon = <DatasourceIconYellow />;
      break;
    case DatasourceStatus.VerifiedCarrierData:
      icon = <DatasourceIconGreen />;
      break;
    default:
      icon = <DatasourceIcon />;
      break;
  }

  return (
    <Tooltip title={`${content.statusText}`}>
      <Box sx={{width: width || '30px', cursor: 'pointer'}}>
        { icon }
      </Box>
    </Tooltip>
  )
}
