import * as React from 'react';
import { Typography as MuiTypography } from "./storybookExports/Typography.component";

import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof MuiTypography> = {
    tags: ['!dev'],
    title: "DRT Components/MUI Components/Typography",
    component: MuiTypography,
    args: {
        children: 'The quick brown fox jumps over the lazy dog'
    },
    argTypes: {
        variant: {
            options: ['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2'],
            control: {type: 'select'}
        },
        color: {
          options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
          control: {type: 'radio'}
        }
    }
};

export default meta;
type Story = StoryObj<typeof MuiTypography>;

export const Title: Story = {
    render: (args) => {
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

export const Subtitle1: Story = {
    render: (args) => {
        return <MuiTypography variant="subtitle1" >subtitle1: The quick brown dog jumps over the lazy fox</MuiTypography>
    }
};
export const Subtitle2: Story = {
    render: (args) => {
        return <MuiTypography variant="subtitle2" >subtitle2: The quick brown dog jumps over the lazy fox</MuiTypography>
    }
};

export const Body1: Story = {
    render: (args) => {
        return <MuiTypography variant="body1" >body1: Lorem ipsum dolor sit amet, adipiscing elit. Vestibulum suscipit feugiat ultricies. Morbi porta justo sit amet nunc luctus, at luctus sapien tempus. Aenean sollicitudin consectetur mauris sed fringilla.</MuiTypography>
    }
};

export const Body2: Story = {
    render: (args) => {
        return <MuiTypography variant="body2" >body2: Fusce eu arcu in risus mattis congue vel sed mi. Aenean nibh leo, imperdiet ut accumsan sit amet, iaculis ac diam. Vestibulum finibus ornare nisl, id ullamcorper magna placerat vel. Aliquam id blanditligula. Curabitur suscipit eget nisi quis vestibulum. Donec bibendum lacus vitae lacus varius convallis.</MuiTypography>
    }
};

export const Button: Story = {
    render: (args) => {
        return <MuiTypography variant="button" >button: Click me!</MuiTypography>
    }
};

export const Caption: Story = {
    render: (args) => {
        return <MuiTypography variant="caption" >caption: Lorem ipsum dolor sit amet</MuiTypography>
    }
};

export const Overline: Story = {
    render: (storyContext) => {
        return <MuiTypography variant="overline" >overline: The quick brown dog jumps over the lazy fox.</MuiTypography>
    }
};

