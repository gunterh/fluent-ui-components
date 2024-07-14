import { makeStyles } from "@fluentui/react-components";

// Styles
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const ShoppingList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Shopping List</h1>
      <ul>
        <li>Apples</li>
        <li>Oranges</li>
        <li>Bananas</li>
      </ul>
    </div>
  );
};
