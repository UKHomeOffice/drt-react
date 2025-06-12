import { Card, lighten, styled } from "@mui/material";


export const PaxRAGStatusCard = styled(Card)(({theme}) => ({
  '.rag-card-time': {
    color: '#fff',
    fontSize: '1.1em',
    border: 'none'
  },
  '.rag-card-staff-desks': {
    color: '#fff',
    fontSize: '1.1em',
    border: 'none'
  },
  '&.green':{
    backgroundColor: theme.palette.success.main,
    '.rag-card-time': {
      backgroundColor: theme.palette.success.dark,
    },
    '.rag-card-staff-desks': {
      backgroundColor: lighten(theme.palette.success.dark, 0.1),
    }
  },
  '&.red':{
    backgroundColor: theme.palette.error.main,
    '.rag-card-time': {
      backgroundColor: theme.palette.error.dark,
    },
    '.rag-card-staff-desks': {
      backgroundColor: lighten(theme.palette.error.dark, 0.2),
    }
  },
  '&.amber':{
    backgroundColor: theme.palette.warning.main,
    '.rag-card-time': {
      backgroundColor: theme.palette.warning.dark,
    },
    '.rag-card-staff-desks': {
      backgroundColor: lighten(theme.palette.warning.dark, 0.2),
    }
  },
}));