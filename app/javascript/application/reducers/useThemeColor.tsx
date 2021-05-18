import { useState } from "react";
import { createContainer } from "unstated-next";
// simple reducer to store theme
function useThemeMode(initialState : "dark"| "light" = "dark") {
  let [themeMode, setThemeColor] = useState<"dark"| "light">(initialState)
  let toggleColor = () => setThemeColor(themeMode === "dark" ? "light": "dark")

  return { themeMode, toggleColor }
}

export default createContainer(useThemeMode)