import * as React from 'react'

import ReportIcon from '@mui/icons-material/Report'; //estimate
import WarningIcon from '@mui/icons-material/Warning'; //port forecast + drtforecast
import CircleIcon from '@mui/icons-material/Circle';
import BeenhereIcon from '@mui/icons-material/Beenhere'; // port live data
import CheckIcon from '@mui/icons-material/Check';
import ShieldIcon from '@mui/icons-material/Shield';
import HexagonIcon from '@mui/icons-material/Hexagon';
import { useTheme } from '@emotion/react';

export enum DatasourceStatus {
  Estimate = "Estimate",
  PortForecast = "Port forecast",
  DRTForecast = "DRT forecast",
  PortLiveData = "Port live data",
  CarrierData = "Carrier data",
  TerminalAverageData = "Terminal average data",
  PastCarrierData = "Past carrier data",
  VerifiedCarrierData = "Verified carrier data",
}

export type PaxStatusContent = {
  paxColor: string,
  statusLabel: string,
  statusText: string,
  icon: React.ReactNode,
  iconBg?: React.ReactNode
}

export const getPaxContent = (status: DatasourceStatus) : PaxStatusContent =>  {
  const theme = useTheme();

  const content: PaxStatusContent = {
    paxColor: '',
    statusLabel: '',
    statusText: '',
    icon: <></>,
  }

  switch (status) {
    case DatasourceStatus.PortForecast:
      content.paxColor = "warning"
      content.statusText = "Based on an historical average or an estimated load factor";
      content.icon = <WarningIcon color={content.paxColor as any} />
      break;
    case DatasourceStatus.DRTForecast:
      content.paxColor = "warning"
      content.statusText = "Machine learning from multiple information sources and historical trends";
      content.icon = <CheckIcon style={{color: 'white', width: '60%'}}  />
      content.iconBg = <CircleIcon color='info' />
      break;
    case DatasourceStatus.PortLiveData:
      content.paxColor = "success"
      content.statusText = "Live data from the port operator";
      content.icon = <CheckIcon style={{color: 'white', width: '60%'}}  />
      content.iconBg = <ShieldIcon color='success' />
      break;
    case DatasourceStatus.CarrierData:
      content.paxColor = "info"
      content.statusText = "Advance Passenger Information (API) from the carrier";
      content.icon = <CheckIcon style={{color: 'white', width: '60%'}}  />
      content.iconBg = <CircleIcon color='info' />
      break;
    case DatasourceStatus.Estimate:
      content.paxColor = "error"
      content.statusText = "Based on an historical average or an estimated load factor";
      content.icon = <ReportIcon color={content.paxColor as any} />
      content.iconBg = <HexagonIcon style={{color: 'white'}} />
      break;
    case DatasourceStatus.TerminalAverageData:
      content.paxColor = "error"
      content.statusText = "Based on historical average pax splits for this terminal";
      content.icon = <ReportIcon color={content.paxColor as any} />
      content.iconBg = <HexagonIcon style={{color: 'white'}} />
      break;
    case DatasourceStatus.PastCarrierData:
      content.paxColor = "warning"
      content.statusText = "Based on historical Advance Passenger Information (API) from this flight or route";
      content.icon = <WarningIcon color={content.paxColor as any}  />
      break;
    case DatasourceStatus.VerifiedCarrierData:
      content.paxColor = "success"
      content.statusText = "Advance Passenger Information (API) from the carrier";
      content.icon = <CheckIcon style={{color: 'white', width: '60%'}}  />
      content.iconBg = <ShieldIcon color='success' />
      break;
  }

  return content
}
