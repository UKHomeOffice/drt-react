import * as React from 'react';
import { Typography as MuiTypography } from "@mui/material";

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiTypography> = {
    title: "DRT Components/MUI Components/Typography",
    component: MuiTypography,
};

export default meta;
type Story = StoryObj<typeof MuiTypography>;

export const TitleTypography: Story = {
    render: (storyContext) => {
        return <>
            <MuiTypography variant="h1" >H1. The quick brown fox jumps over the lazy dog</MuiTypography>
            <MuiTypography variant="h2" >H2. The quick brown fox jumps over the lazy dog</MuiTypography>
            <MuiTypography variant="h3" >H3. The quick brown fox jumps over the lazy dog</MuiTypography>
            <MuiTypography variant="h4" >H4. The quick brown fox jumps over the lazy dog</MuiTypography>
            <MuiTypography variant="h5" >H5. The quick brown fox jumps over the lazy dog</MuiTypography>
            <MuiTypography variant="h6" >H6. The quick brown fox jumps over the lazy dog</MuiTypography>
        </>
    }
};
