import { makeStyles, Text, tokens } from "@fluentui/react-components";

// Styles
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    background: tokens.colorNeutralBackground1,
    position: "sticky",
    top: 0,
    padding: tokens.spacingVerticalM,
  },
});

export const ShoppingList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Text block size={800}>
          Shopping List
        </Text>
        <Text block align="center" size={600}>
          $0
        </Text>
      </div>

      <ul>
        <li>Apples</li>
        <li>Oranges</li>
        <li>Bananas</li>
        <li>Tomatoes</li>
        <li>Carrots</li>
        <li>Lettuce</li>
        <li>Spinach</li>
        <li>Chicken</li>
        <li>Beef</li>
        <li>Pork</li>
        <li>Salmon</li>
        <li>Shrimp</li>
        <li>Crab</li>
        <li>Lobster</li>
        <li>Butter</li>
        <li>Flour</li>
        <li>Sugar</li>
        <li>Eggs</li>
        <li>Milk</li>
        <li>Cheese</li>
        <li>Yogurt</li>
        <li>Ice Cream</li>
        <li>Chocolate</li>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Wine</li>
        <li>Beer</li>
        <li>Whiskey</li>
        <li>Vodka</li>
        <li>Rum</li>
        <li>Tequila</li>
        <li>Brandy</li>
        <li>Gin</li>
        <li>Champagne</li>
        <li>Prosecco</li>
        <li>Sparkling Water</li>
        <li>Still Water</li>
        <li>Orange Juice</li>
        <li>Apple Juice</li>
        <li>Grape Juice</li>
        <li>Cranberry Juice</li>

        <li>Chips</li>
        <li>Pretzels</li>
      </ul>
    </div>
  );
};
