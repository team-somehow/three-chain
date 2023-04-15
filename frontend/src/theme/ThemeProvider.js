import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const StyleThemeProvider = (props) => {
  const useTheme = createTheme({
    palette: {
      primary: {
        main: "#4fa0fe",
        contrastText: "#fcfdfe",
      },
      text: {
        primary: "#474C59",
      },
    },

    typography: {
      fontFamily: ["Poppins", "Nunito", "Roboto", "Arial", "sans-serif"].join(
        ","
      ),
    },
  });

  return (
    <ThemeProvider theme={useTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default StyleThemeProvider;
