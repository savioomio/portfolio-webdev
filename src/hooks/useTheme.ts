import { useContext } from "react";
import { ThemeContext } from "@/app/themeContext";

export function useTheme() {
  return useContext(ThemeContext);
}
