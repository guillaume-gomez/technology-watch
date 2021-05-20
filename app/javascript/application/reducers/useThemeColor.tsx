import { useState } from "react";
import { createContainer } from "unstated-next";
// simple reducer to store theme
function useThemeMode(initialState : "dark"| "light" = "light") {
  const [themeMode, setThemeColor] = useState<"dark"| "light">(initialState)
  
  function toggleColor() {
    setThemeColor(themeMode === "dark" ? "light": "dark");
  }

  function invertedColor(color: "dark" | "light") {
    return color === "light" ? "dark" : "light";
  } 

  return { themeMode, setThemeColor, toggleColor, invertedColor }
}

export default createContainer(useThemeMode)