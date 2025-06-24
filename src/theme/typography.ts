
import { themePrimatives } from "./primatives";

export const typographyTheme = {
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontSize: 19,
  h1: { //govuk-heading-xl
    fontSize: '32px',
    lineHeight: '35px',
    fontWeight: 'bold',
  },
  h2: { //govuk-heading-l
    fontSize: '27px',
    lineHeight: '30px',
    fontWeight: 'bold',
  },
  h3: { //govuk-heading-m
    fontSize: "21px",
    lineHeight: '25px',
    fontWeight: "bold",
  },
  h4: { //govuk-heading-s
    fontSize: "16px",
    lineHeight: '25px',
    fontWeight: "bold",
  },
  h5: { // govuk-body-s sized
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: "bold",
  },
  h6: { //govuk-body-s sized no bold
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: "normal",
  },
  subtitle1: { //govuk-body-sized
    fontSize: "16px",
    lineHeight: '25px',
    fontStyle: 'italic',
    fontWeight: 'normal'
  },
  subtitle2: { //govuk-body-s-sized
    fontSize: "16px",
    lineHeight: '20px',
    fontStyle: 'italic',
    fontWeight: 'normal'
  },
  body1: { //'govuk-body
    fontSize: "16px",
    lineHeight: '25px',
  },
  body2: { //govuk-body-s
    fontSize: "16px",
    lineHeight: '20px',
  },
  caption: {
    fontSize: "16px",
    lineHeight: '20px',
  },
  button: {
    fontSize: '16px',
    lineHeight: '25px',
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
};

export const typographyComponentTheme = {
  styleOverrides: {
    root: {
      marginBottom: 0
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
