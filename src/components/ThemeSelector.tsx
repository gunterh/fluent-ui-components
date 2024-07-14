import { Button, makeStyles } from "@fluentui/react-components";
import { FluentIcon } from "@fluentui/react-icons";

// Styles
const useStyles = makeStyles({
  floatingButton: {
    position: "fixed",
    right: "1rem",
    top: "1rem",
  },
});

interface ThemeSelectorProps {
  Icon: FluentIcon;
  onToggleTheme: () => void;
}

export const ThemeSelector = ({ Icon, onToggleTheme }: ThemeSelectorProps) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.floatingButton}
      appearance="transparent"
      icon={<Icon />}
      onClick={onToggleTheme}
    />
  );
};
