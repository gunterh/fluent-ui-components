import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import {
  bundleIcon,
  WeatherMoonFilled,
  WeatherMoonRegular,
  WeatherSunnyFilled,
  WeatherSunnyRegular,
} from "@fluentui/react-icons";
import { useState } from "react";
import { ApplyToBody } from "./components/ApplyToBody";
import { ThemeSelector } from "./components/ThemeSelector";
import { ShoppingList } from "./components/ShoppingList";

// Icons
const lightThemeIcon = bundleIcon(WeatherSunnyFilled, WeatherSunnyRegular);
const darkThemeIcon = bundleIcon(WeatherMoonFilled, WeatherMoonRegular);

// App
export const App = () => {
  const [theme, setTheme] = useState(webDarkTheme);

  const toggleTheme = () => {
    setTheme((t) => (t === webDarkTheme ? webLightTheme : webDarkTheme));
  };

  const Icon = theme === webDarkTheme ? darkThemeIcon : lightThemeIcon;
  return (
    <FluentProvider theme={theme}>
      <ApplyToBody />
      <ThemeSelector Icon={Icon} onToggleTheme={toggleTheme} />

      <ShoppingList />
    </FluentProvider>
  );
};
