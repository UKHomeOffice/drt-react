import React from "react";
import { ListItemText,  MenuItem, FormControl, Select, SelectProps } from "@mui/material";
import { styled } from '@mui/material/styles';
import { SelectChangeEvent } from "@mui/material";
import { MenuItem as MenuItemType } from "./Header";

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  minWidth: '205px',
  width: '100%',
  outline: 0,
  marginRight: theme.spacing(1),
  ':after, :before': {
    borderBottom: 'none !important'
  },
  '& .MuiSelect-select': {
    borderWidth: '0 !important',
    display: 'flex',
    padding: `5px 40px 5px 5px !important`,
    backgroundColor: 'transparent',
    height: '1.25em !important',
    '& >*': {
      display: 'flex',  
      alignItems: 'center',
      minWidth: 0,
    },
    '& .MuiListItemIcon-root': {
      marginRight: theme.spacing(2),
      '& svg': {
        fontSize: '1rem',
        fill: '#000'
      }
    }
  },
  '& .MuiListItemText-root': {
    fontSize: '0.875rem !important',
    marginTop: '6px !important',
  },
  '& .MuiTypography-root': {
    marginTop: 0,
    fontWeight: 'bold !important',
  }
}));


export interface IPortSelector {
  handleChangePort: (path: string) => void,
  options: MenuItemType[],
  selectedOption: string,
}

const PortSelector = ({handleChangePort, options, selectedOption}: IPortSelector) => {
  const [selected, setSelected] = React.useState<string>(selectedOption);

  const onChange = (event: SelectChangeEvent<any>) => {
    handleChangePort(event.target.value);
    setSelected(event.target.value);
  }
 
  return (
    <FormControl sx={{width: '100%'}}>     
      <StyledSelect
        displayEmpty
        data-testid={`port-selector-trigger`}
        value={selected}
        label="Select a port..."
        variant="standard" 
        onChange={onChange}>
          <MenuItem value={""} disabled>
            <ListItemText>Select a location...</ListItemText>
          </MenuItem> 
        {options?.map((option) => {
          return (
            <MenuItem 
              key={`port-selector-${option.link}`} 
              data-testid={`port-selector-${option.link}`} 
              value={option.link}>
              <ListItemText><strong>{ option.label }</strong></ListItemText>
            </MenuItem>  
          )
        })}
      </StyledSelect>
    </FormControl>
  )
}
export default PortSelector
