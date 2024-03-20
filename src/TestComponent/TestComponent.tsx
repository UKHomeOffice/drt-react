import * as React from 'react';
import { Alert, AlertColor } from '@mui/material';

export interface ITestComponent {
  severity?: string,
  content?: string,
  onClose?: () => void,
}

const defaultCloseHandler = () => {
  console.log('Default close handler fired')
}

export const TestComponent = ({
  content = 'Default content',
  severity = 'info',
  onClose = defaultCloseHandler,
}: ITestComponent) : React.ReactElement<ITestComponent> => {
  return (
    <Alert severity={severity as AlertColor} onClose={onClose}>
      { content }
    </Alert>
  )
}
