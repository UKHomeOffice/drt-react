import { typographyTheme } from "./typography";

export const listTheme = {
    styleOverrides: {
      root: {
        '&.inline-disc-items': {
          listStyleType: 'disc', 
          marginLeft: '20px',
          padding: 0,
          marginBottom: '1em',
          '> li': {
            display: 'list-item',
            paddingLeft: 0,
            ...typographyTheme.body1,
            marginBottom: `0 !important`,
          },
        }
      },
    }
};

export const listItemTheme = {
    styleOverrides: {
      root: {
        paddingTop: 0,
      }
    }
};

export const listItemTextTheme = {
    styleOverrides: {
      primary: {
        marginBottom: 0,
      },
      secondary: {
        marginBottom: 0,
      },
    }
};
