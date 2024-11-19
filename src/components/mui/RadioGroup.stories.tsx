import * as React from 'react';
import { RadioGroup as MuiRadioGroup, Radio, FormControl,FormControlLabel, FormLabel } from "./storybookExports/FormFields.component";

import { useArgs } from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiRadioGroup>  = {
    title: "DRT Components/MUI Components/Forms/Radio Group",
    component: MuiRadioGroup,
    args: {
      value: "Radio option 1",
    },
    argTypes: {
      value: {
        options: [ "Radio option 1", "Radio option 2", "Radio option 3"],
        control: {
          type: 'radio'
        }
      }
    },
};

export default meta;
type Story = StoryObj<typeof MuiRadioGroup>;

export const RadioGroup: Story = {
  render: (storyContext) => {
    const [args, updateArgs] = useArgs();

    const handleChange = (event: React.ChangeEvent<HTMLElement>, newValue: string | null) => {
      updateArgs({
        ...args,
        value: newValue
      });
    };

    return (
      <FormControl>
        <FormLabel>Radio Group</FormLabel>
        <MuiRadioGroup
          {...args}
          onChange={handleChange}
        >
          { meta.argTypes?.value?.options?.map((option) => {
            return <FormControlLabel key={option} value={option} checked={storyContext.value == option} control={<Radio />} label={option}  />
          })} 
        </MuiRadioGroup>
      </FormControl>
    )
  }
};
