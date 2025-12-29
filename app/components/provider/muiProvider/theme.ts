"use client";

import { createTheme } from "@mui/material/styles";
import componentsShared from "./componentsShared";
import typography from "./typography";

const theme = createTheme({
  // direction: "rtl",
  typography: typography,
  components: componentsShared,
});

export default theme;
