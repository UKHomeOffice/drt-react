import React, {LegacyRef, RefObject, createRef, useState} from "react";
import { Dispatch, SetStateAction, } from "react";
import { Tooltip, useTheme, Popover, PopoverProps, Box } from "@mui/material";
import { Instance } from '@popperjs/core';
import './PortMap.css';

export interface IPortMap {
  handlePortClick: (portCode: string) => void,
  handlePortHover: Dispatch<SetStateAction<string>>,
  selectedPort: string,
  hoveredPort: string,
}

type PortPin = {
  x: string;
  y: string;
  portCode: string;
  region: string;
}


const PortMap = ({handlePortClick, handlePortHover, hoveredPort, selectedPort}: IPortMap) => {
  const theme = useTheme();
  const areaRef = React.useRef<HTMLDivElement>(null);
  const mapBgColor = theme.palette.divider;

  const isHovered = (portCode: string, region: string) => {
    return (portCode == hoveredPort)|| (region == hoveredPort) 
  }

  const isSelected= (portCode: string, region: string) => {
    return (portCode == selectedPort) || (region == selectedPort) 
  }

  const ports = [
    { x: "242.378", y: "383.200", portCode: "BHX", region: "central" },
    { x: "256.338", y: "357.642", portCode: "EMA", region: "central" },
    { x: "283.670", y: "421.495", portCode: "LCY", region: "central" },
    { x: "324.924", y: "408.769", portCode: "SEN", region: "central" },
    { x: "311.127", y: "395.999", portCode: "STN", region: "central" },
    { x: "269.818", y: "395.993", portCode: "LTN", region: "central" },
    { x: "324.694", y: "370.412", portCode: "NWI", region: "central" },
    { x: "228.680", y: "447.085", portCode: "BOH", region: "south" },
    { x: "215.021", y: "409.242", portCode: "BRS", region: "south" },
    { x: "187.549", y: "408.827", portCode: "CWL", region: "south" },
    { x: "201.331", y: "447.079", portCode: "EXT", region: "south" },
    { x: "283.523", y: "434.320", portCode: "LGW", region: "south" },
    { x: "160.014", y: "459.847", portCode: "NQY", region: "south" },
    { x: "242.442", y: "447.111", portCode: "SOU", region: "south" },
    { x: "256.017", y: "421.476", portCode: 'LHR', region: "heathrow" },
    { x: "228.472", y: "165.852", portCode: "ABZ", region: "north" },
    { x: "132.673", y: "294.091", portCode: "BFS", region: "north" },
    { x: "119.057", y: "280.923", portCode: "BHD", region: "north" },
    { x: "201.325", y: "229.801", portCode: "EDI", region: "north" },
    { x: "160.186", y: "229.808", portCode: "GLA", region: "north" },
    { x: "160.063", y: "255.311", portCode: "PIK", region: "north" },
    { x: "283.562", y: "319.208", portCode: "HUY", region: "north" },
    { x: "173.810", y: "153.050", portCode: "INV", region: "north" },
    { x: "256.578", y: "306.429", portCode: "LBA", region: "north" },
    { x: "214.962", y: "332.008", portCode: "LPL", region: "north" },
    { x: "242.448", y: "332.073", portCode: "MAN", region: "north" },
    { x: "242.586", y: "280.851", portCode: "MME", region: "north" },
    { x: "242.427", y: "255.312", portCode: "NCL", region: "north" },
  ]

  const handleMouseEnterPort = (event: React.MouseEvent, portCode : string) => {
    handlePortHover(portCode);
  }

  const handleMouseLeavePort = (event: React.MouseEvent, portCode : string) => {
    handlePortHover('')
  }

  const renderTooltip = (id: string, _x: string, _y: string, portCode: string, color: string) => {
    const x = Number(_x);
    const y = Number(_y);
    return <g id={id}>
      <rect x={x - 14} width={38} height={20} rx={2} y={y - 30} fill={color}></rect>
      <polygon  fill={color} points={`
          ${x},${y-10} 
          ${x + 10},${y-10} 
          ${x + 5},${y-3} 
        `}></polygon>
      <text 
        className="tooltip-text" 
        x={x + 5} 
        y={y - 16} 
        width={50} 
        fill={theme.palette.common.white} 
        letterSpacing={1}
        textAnchor="middle">
          {portCode}
        </text>
    </g>
  }

  const renderPort = (port: PortPin, index: number) => {
    const color = isSelected(port.portCode, port.region) ? theme.palette.primary.light : 
        isHovered(port.portCode, port.region) ? theme.palette.primary.light : theme.palette.grey[500]

    return ( <g key={index}>
      { port.portCode == hoveredPort && port.portCode != selectedPort && renderTooltip('tooltip-hovered', port.x, port.y, port.portCode, color) }
      { port.portCode == selectedPort && renderTooltip('tooltip-selected', port.x, port.y, port.portCode, color) }
      <rect 
            x={port.x} 
            y={port.y} 
            width="10.654" 
            height="9.934" 
            onClick={(event) => handlePortClick(port.portCode)}
            onMouseEnter={(event) => handleMouseEnterPort(event, port.portCode)}
            onMouseLeave={(event) => handleMouseLeavePort(event, port.portCode)}
            fill={color} />
    </g>)
  }

  return (
    <Box ref={areaRef} style={{width: '90%', maxWidth: '485px'}}>
      <svg id="port-map" viewBox="0 62.175 361.491 450" style={{width: '100%'}}  xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet">
        <style>
          { `.tooltip-text { font-size: 0.7em; letter-spacing: 1.5; }`}
        </style>
        <g>
          <rect x="201.266" y="76.384" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="89.163" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="101.943" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="101.943" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="114.72" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="114.72" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="114.72" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="114.72" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="114.72" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="127.5" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="146.435" y="127.5" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="127.5" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="127.5" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="127.5" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="140.279" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="132.727" y="140.279" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="146.435" y="140.279" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="140.279" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="140.279" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="153.058" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="153.058" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="132.727" y="153.058" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="146.435" y="153.058" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="153.058" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="153.058" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="153.058" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="153.058" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="153.058" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="153.058" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="165.837" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="165.837" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="132.727" y="165.837" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="146.435" y="165.837" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="165.837" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="165.837" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="165.837" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="165.837" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="165.837" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="178.616" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="132.727" y="178.616" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="146.435" y="178.616" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="178.616" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="178.616" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="178.616" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="178.616" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="178.616" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="178.616" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="191.395" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="132.727" y="191.395" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="146.435" y="191.395" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="191.395" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="191.395" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="191.395" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="191.395" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="191.395" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="204.229" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="132.727" y="204.229" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="146.435" y="204.229" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="204.229" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="204.229" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="204.229" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="204.229" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="204.229" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="146.435" y="217.008" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="217.008" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="217.008" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="217.008" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="217.008" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="217.008" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="229.788" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="146.435" y="229.788" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="229.788" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="229.788" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="229.788" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="229.788" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="242.566" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="132.727" y="242.566" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="146.435" y="242.566" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="242.566" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="242.566" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="242.566" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="242.566" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="242.566" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="242.566" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="242.566" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="255.345" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="132.727" y="255.345" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="255.345" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="255.345" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="255.345" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="255.345" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="255.345" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="77.837" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="268.124" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="280.903" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="77.837" y="280.903" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="280.903" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="280.903" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="132.727" y="280.903" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="280.903" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="280.903" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="280.903" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="280.903" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="293.681" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="77.837" y="293.681" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="293.681" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="293.681" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="293.681" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="132.727" y="306.537" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="293.681" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="293.681" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="293.681" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="293.681" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="293.681" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="293.681" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="23.005" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="36.713" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="50.421" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="77.837" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="283.572" y="306.461" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="23.005" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="36.713" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="50.421" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="77.837" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="319.24" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="23.005" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="36.713" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="50.421" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="77.837" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="283.572" y="332.019" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="23.005" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="36.713" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="50.421" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="77.837" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="283.572" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="297.279" y="344.853" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="36.713" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="50.421" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="77.837" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="283.572" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="297.279" y="357.633" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="36.713" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="50.421" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="77.837" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="283.572" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="297.279" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="310.987" y="357.741" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="324.694" y="357.741" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="338.403" y="370.412" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="23.005" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="36.713" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="50.421" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="77.837" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="105.312" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="283.572" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="297.279" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="310.987" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="324.694" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="338.403" y="383.19" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="9.298" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="23.005" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="36.713" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="50.421" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="77.837" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="91.603" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="283.572" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="297.279" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="324.694" y="395.969" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="23.005" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="36.713" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="50.421" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="64.129" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="283.572" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="297.279" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="310.987" y="408.749" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="23.005" y="421.527" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="36.713" y="421.527" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="421.527" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="421.527" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="421.527" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="421.527" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="421.527" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="297.279" y="421.527" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="434.306" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="434.306" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="201.266" y="434.306" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="434.306" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="228.68" y="434.306" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="242.449" y="434.306" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="434.306" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="434.306" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="297.279" y="434.306" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="310.987" y="434.306" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="324.694" y="434.306" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="447.085" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="447.085" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="214.973" y="447.085" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="447.085" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="269.864" y="447.085" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="283.572" y="447.085" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="297.279" y="447.085" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="310.987" y="447.085" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="173.851" y="459.864" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="459.864" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="256.156" y="459.864" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="146.435" y="472.698" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="160.142" y="472.698" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="187.558" y="472.698" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="119.019" y="485.478" fill={mapBgColor} width="10.654" height="9.934" />
          <rect x="310.987" y="370.412" fill={mapBgColor} width="10.654" height="9.934" /> 
        </g>
        <g id="ports">
          { ports.map(renderPort) }
        </g>
        <use id="use" xlinkHref="#tooltip-selected" />
        <use id="use" xlinkHref="#tooltip-hovered" />
      </svg>
    </Box>
 )
}
export default PortMap
