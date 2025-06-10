import * as React from 'react';
import { Typography as MuiTypography } from "./storybookExports/Typography.component";

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiTypography> = {
    title: "DRT Components/MUI Components/Typography/Component",
    component: MuiTypography,
    args: {
        variant: 'body1',
        color: 'textPrimary',
        children: 'Sphinx of black quartz, hear my vow!',
    },
    argTypes: {
        children: {
            name: 'text',
        },
    }
};

export default meta;
type Story = StoryObj<typeof MuiTypography>;

export const Component : Story = {
    render: ({children, ...rest}) => {
        return <MuiTypography {...rest}>{children}</MuiTypography>
    }
}

