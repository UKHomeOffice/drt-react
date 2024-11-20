import React from "react";
import { Highlight } from "../../ui/Highlight/Highlight";
import { DatasourceStatus, getPaxContent } from "../PaxUtils";

export interface IPaxHighlight {
  status: DatasourceStatus
}

export const PaxHighlight = ({status}: IPaxHighlight) => {
  
  const content = getPaxContent(status);

  return (
    <Highlight color={content.paxColor} text={status} tooltipText={content.statusText} />
  )
}
