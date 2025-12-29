import { Components, Theme } from "@mui/material";

const componentsShared: Components<Omit<Theme, "components">> | undefined = {
  MuiInputLabel: {
    styleOverrides: {
      root: {
        textAlign: "right",
        direction: "rtl",
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        textAlign: "right"
      }
    }
  },
  MuiCssBaseline: {
    styleOverrides: {
      '.MuiPickersCalendarHeader-labelContainer': {
        marginRight: '0px !important',
        marginLeft: 'auto',
      },
      '.MuiButton-startIcon': {
        marginRight: '0px !important',
        marginLeft: '5px !important'
      },
      '.MuiOutlinedInput-root': {
        paddingRight: '9px !important',
      }
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        textAlign: "right",
        direction: "rtl",
      },
      inputRoot: {
        '& .MuiAutocomplete-endAdornment': {
          left: 5,
          right: 'auto',
        },
      },
      popper: {
        right: 'auto',
        left: '0',
      },
    }
  },  
  MuiStepLabel: {
    styleOverrides: {
      iconContainer: {
        paddingRight: 0,
        paddingLeft: 8
      }
    }
  }
};

export default componentsShared;
