
import { themePrimatives } from "./primatives";

export const typographyTheme = {
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontSize: 19,
  h1: { //govuk-heading-xl
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: themePrimatives.spacing(7),
    marginBottom: themePrimatives.spacing(7),
    [themePrimatives.breakpoints.up("md")]: {
      fontSize: '48px',
      lineHeight: themePrimatives.spacing(10),
      marginBottom: themePrimatives.spacing(10),
    }
  },
  h2: { //govuk-heading-l
    fontWeight: 'bold',
    fontSize: '27px',
    lineHeight: themePrimatives.spacing(6),
    marginBottom: themePrimatives.spacing(6),
    [themePrimatives.breakpoints.up("md")]: {
      fontSize: '36px',
      lineHeight: themePrimatives.spacing(8),
      marginBottom: themePrimatives.spacing(8),
    }
  },
  h3: { //govuk-heading-m
    fontWeight: 'bold',
    fontSize: '21px',
    lineHeight: themePrimatives.spacing(5),
    marginBottom: themePrimatives.spacing(5),
    [themePrimatives.breakpoints.up("md")]: {
      fontSize: '24px',
      lineHeight: themePrimatives.spacing(6),
      marginBottom: themePrimatives.spacing(6),
    }
  },
  h4: { //govuk-heading-s
    fontWeight: 'bold',
    fontSize: '19px',
    lineHeight: themePrimatives.spacing(5),
    marginBottom: themePrimatives.spacing(5),
  },
  h5: { // govuk-body-s
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: themePrimatives.spacing(4),
    marginBottom: themePrimatives.spacing(4),
  },
  h6: { //govuk-body-s sized no bold
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: themePrimatives.spacing(4),
    marginBottom: themePrimatives.spacing(4),
  },
  subtitle1: { //govuk-body-sized
    fontSize: "16px",
    lineHeight: '25px',
    fontStyle: 'italic',
    fontWeight: 'normal'
  },
  subtitle2: { //govuk-body-s-sized
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: "16px",
    lineHeight: themePrimatives.spacing(5),
  },
  body1: { //'govuk-body
    fontSize: "16px",
    lineHeight: themePrimatives.spacing(4),
    marginBottom: themePrimatives.spacing(3),
    [themePrimatives.breakpoints.up("md")]: {
      fontSize: "19px",
      lineHeight: themePrimatives.spacing(5),
      marginBottom: themePrimatives.spacing(4),
    }
  },
  body2: { //govuk-body-s
    fontSize: "16px",
    lineHeight: themePrimatives.spacing(4),
    marginBottom: themePrimatives.spacing(3),
  },
  caption: {
    fontSize: "16px",
    lineHeight: themePrimatives.spacing(4),
  },
  button: {
    fontSize: '16px',
    lineHeight: themePrimatives.spacing(5),
    fontWeight: "bold",
    textTransform: 'none',
  },
  portCode: {
    fontSize: '0.7em',
    letterSpacing: 1.2,
    minWidth: '30px',
    textAlign: 'center',
    display: 'inline-block'
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'lighter',
    [themePrimatives.breakpoints.up("sm")]: {
      fontSize: 36
    }
  },
  logoTitle: {
    fontSize: '1.6em'
  },
  xlarge: { //hods-xlarge
    fontSize: '48px',
    lineHeight: themePrimatives.spacing(10),
    marginBottom: themePrimatives.spacing(6),
  },
  large: { //hods-large
    fontSize: '46px',
    lineHeight: themePrimatives.spacing(8),
    marginBottom: themePrimatives.spacing(4),
  },
  medium: { //hods-mods
    fontSize: '24px',
    lineHeight: themePrimatives.spacing(6),
    marginBottom: themePrimatives.spacing(3),
  },
  small: { //hods-mods
    fontSize: '19px',
    lineHeight: themePrimatives.spacing(5),
    marginBottom: themePrimatives.spacing(3),
  }
};

export const typographyComponentTheme = {
  styleOverrides: {
    root: {
    }
  }
}

export const linkTheme = {
  styleOverrides: {
    root: {
      color: '#1d70b8',
      '&:hover': {
        color: '#003078'
      },
      '&:visited': {
        color: '#4c2c92'
      },
      '&:active': {
        color: '#0b0c0c'
      },
      '&:focus': {
        backgroundColor: '#fd0',
        color: `${themePrimatives.palette.common.black} !important`,
        textDecorationColor: `${themePrimatives.palette.common.black} !important`,
        boxShadow: `0 -2px #fd0,0 4px #0b0c0c`,
        textDecoration: 'none'
      }
    }
  }

}
