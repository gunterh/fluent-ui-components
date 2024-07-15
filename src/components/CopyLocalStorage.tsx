import { Button, makeStyles } from "@fluentui/react-components";
import { bundleIcon, CopyFilled, CopyRegular } from "@fluentui/react-icons";

// Styles
const useStyles = makeStyles({
  floatingButton: {
    position: "fixed",
    left: "1rem",
    top: "1rem",
    zIndex: 9,
  },
});

const CopyIcon = bundleIcon(CopyFilled, CopyRegular);

export const CopyLocalStorage = () => {
  const classes = useStyles();

  const copyLocalStorageToClipboard = () => {
    navigator.clipboard.writeText(localStorage.getItem("items") || "");
  };

  return (
    <Button
      className={classes.floatingButton}
      appearance="transparent"
      icon={<CopyIcon />}
      onClick={copyLocalStorageToClipboard}
    />
  );
};
