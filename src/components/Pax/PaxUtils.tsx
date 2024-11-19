import * as React from 'react'

import ReportIcon from '@mui/icons-material/Report'; //estimate
import WarningIcon from '@mui/icons-material/Warning'; //port forecast + drtforecast
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; //  carrier data
import BeenhereIcon from '@mui/icons-material/Beenhere'; // port live data

export enum DatasourceStatus {
  Estimate = "Estimate",
  PortForecast = "Port forecast",
  DRTForecast = "DRT forecast",
  PortLiveData = "Port live data",
  CarrierData = "Carrier Data",
  TerminalAverageData = "TerminalAverageData",
  PastCarrierData = "PastCarrierData",
  VerifiedCarrierData = "VerifiedCarrierData",
}

export type PaxStatusContent = {
  paxColor: string,
  statusLabel: string,
  statusText: string,
  icon: React.ReactNode
}

export const getPaxContent = (status: DatasourceStatus) : PaxStatusContent =>  {

  let content: PaxStatusContent = {
    paxColor: '',
    statusLabel: '',
    statusText: '',
    icon: <></>
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
      content.icon = <WarningIcon color={content.paxColor as any}  />
      break;
    case DatasourceStatus.PortLiveData:
      content.paxColor = "success"
      content.statusText = "Live data from the port operator";
      content.icon = <BeenhereIcon color={content.paxColor as any} />
      break;
    case DatasourceStatus.CarrierData:
      content.paxColor = "info"
      content.statusText = "Advance Passenger Information (API) from the carrier";
      content.icon = <CheckCircleIcon color={content.paxColor as any} />
      break;
    case DatasourceStatus.Estimate:
      content.paxColor = "error"
      content.statusText = "Based on an historical average or an estimated load factor";
      content.icon = <ReportIcon color={content.paxColor as any} />
      break;
    case DatasourceStatus.TerminalAverageData:
      content.paxColor = "error"
      content.statusText = "Based on historical average pax splits for this terminal";
      content.icon = <ReportIcon color={content.paxColor as any} />
      break;
    case DatasourceStatus.PastCarrierData:
      content.paxColor = "warning"
      content.statusText = "Based on historical Advance Passenger Information (API) from this flight or route";
      content.icon = <WarningIcon color={content.paxColor as any}  />
      break;
    case DatasourceStatus.VerifiedCarrierData:
      content.paxColor = "success"
      content.statusText = "Advance Passenger Information (API) from the carrier";
      content.icon = <BeenhereIcon color={content.paxColor as any}  />
      break;
  }

  return content
}
