import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { Fragment, useState } from "react";

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
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingVerticalL,
  },
});

interface ListItem {
  name: string;
  price: number;
}

export const ShoppingList = () => {
  const [items] = useState<ListItem[]>([
    { name: "Apples", price: 0.5 },
    { name: "Oranges", price: 0.4 },
    { name: "Bananas", price: 0.3 },
    { name: "Tomatoes", price: 0.6 },
    { name: "Carrots", price: 0.2 },
    { name: "Lettuce", price: 0.4 },
    { name: "Spinach", price: 0.5 },
    { name: "Chicken", price: 3.5 },
    { name: "Beef", price: 5.0 },
    { name: "Pork", price: 4.0 },
    { name: "Salmon", price: 6.0 },
    { name: "Shrimp", price: 8.0 },
    { name: "Crab", price: 10.0 },
    { name: "Lobster", price: 12.0 },
    { name: "Butter", price: 2.0 },
    { name: "Flour", price: 1.0 },
    { name: "Sugar", price: 1.0 },
    { name: "Eggs", price: 2.0 },
    { name: "Milk", price: 3.0 },
    { name: "Cheese", price: 4.0 },
    { name: "Yogurt", price: 2.0 },
    { name: "Ice Cream", price: 5.0 },
    { name: "Chocolate", price: 3.0 },
    { name: "Coffee", price: 6.0 },
    { name: "Tea", price: 4.0 },
    { name: "Wine", price: 10.0 },
    { name: "Beer", price: 5.0 },
    { name: "Whiskey", price: 20.0 },
    { name: "Vodka", price: 15.0 },
    { name: "Rum", price: 10.0 },
    { name: "Tequila", price: 12.0 },
    { name: "Brandy", price: 8.0 },
    { name: "Gin", price: 10.0 },
    { name: "Champagne", price: 15.0 },
  ]);
  const classes = useStyles();
  const total = items.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Text block size={800}>
          Shopping List
        </Text>
        <Text block align="center" size={800} weight="bold">
          {total.toLocaleString("en-AU", {
            style: "currency",
            currency: "AUD",
          })}
        </Text>
      </div>

      <div className={classes.grid}>
        {items.map((item) => (
          <Fragment key={item.name}>
            <div key={item.name}>{item.name}</div>
            <div>
              {item.price.toLocaleString("en-AU", {
                style: "currency",
                currency: "AUD",
              })}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
