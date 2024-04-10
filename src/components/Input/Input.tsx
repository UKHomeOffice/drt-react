import React from "react";
import "./Input.scss";
import { Input, InputProps } from "@mui/material";

export interface InputTextProps extends InputProps {
    /**
     * 
     */
}

const InputText:React.FC<InputTextProps> = (props: InputTextProps) => {
  return <Input type="text" {...props} />;
};

export default InputText;