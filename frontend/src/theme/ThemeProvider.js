import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const StyleThemeProvider = (props) => {
  const useTheme = createTheme({
    palette: {
      type: "light",
      // primary: {
      //   // main: "#1f4e5f",
      //   light: "#79a8a9",
      // },
      secondary: {
        main: "#aacfd0",
      },
    },
    typography: {
      fontFamily: "Poppins",
      fontWeightRegular: 400,
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
