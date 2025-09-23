import { themePrimatives } from "./primatives";

export const autocompleteTheme = {
    styleOverrides: {
      root: {
        position: 'relative',
        '.MuiOutlinedInput-root': {
          padding: 0,
          zIndex: 1,
        }
      },
      endAdornment: {
        zIndex: 2,
        backgroundColor: 'transparent',
        top: themePrimatives.spacing(4),
        right: 0,
      },
      inputRoot: {
        padding: `0 !important`,
      },
      hasClearIcon: {
        padding: `0 !important`,
        '& .MuiInputBase-input': {
          position: 'absolute',
          width: '100% !important',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          zIndex: 1,
        }
      },
      tag: {
        maxHeight: themePrimatives.spacing(5),
        position: 'relative',
        top: '4px',
        left: themePrimatives.spacing(1),
        zIndex: 3,
        '& + input': {
        }
      }
    }
};
