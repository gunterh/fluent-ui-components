import {
  Button,
  makeStyles,
  Text,
  tokens,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Input,
  useId,
} from "@fluentui/react-components";
import { bundleIcon, DeleteFilled, DeleteRegular } from "@fluentui/react-icons";
import { Fragment, useEffect, useRef, useState } from "react";

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
    display: "grid",
    gap: tokens.spacingVerticalM,
    position: "sticky",
    top: 0,
    padding: tokens.spacingVerticalM,
    width: "100%",
    zIndex: 1,
    justifyContent: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr auto",
    alignItems: "center",
    gap: tokens.spacingVerticalL,
  },
  input: {
    width: "50px",
  },
  inputPrice: {
    width: "100px",
  },
});

interface ListItem {
  name: string;
  price?: number;
  quantity: number;
}

// Icons
const DeleteIcon = bundleIcon(DeleteFilled, DeleteRegular);

export const ShoppingList = () => {
  const [items, setItems] = useState<ListItem[]>(() => {
    const items = localStorage.getItem("items");
    return items ? JSON.parse(items) : [];
  });
  const beforeLabelId = useId("before-label");

  useEffect(() => {
    saveItemsInLocalStorage(items);
  }, [items]);

  const classes = useStyles();
  const total = items.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  const handleDeleteItem = (name: string) => {
    setItems((_items) => _items.filter((item) => item.name !== name));
  };

  const handleAddItem = (name: string) => {
    if (!name) return;
    setItems((_items) => [..._items, { name, quantity: 1 }]);
  };

  const handleUpdateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const quantity = parseInt(e.target.value);
    if (quantity > 99) return;
    setItems((_items) =>
      _items.map((item) => (item.name === name ? { ...item, quantity } : item))
    );
  };

  const handleUpdatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const price = parseFloat(e.target.value);
    if (price > 9999) return;
    setItems((_items) =>
      _items.map((item) => (item.name === name ? { ...item, price } : item))
    );
  };

  const saveItemsInLocalStorage = (value: ListItem[]) => {
    localStorage.setItem("items", JSON.stringify(value));
  };

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
        <AddItem onAddItem={handleAddItem} />
      </div>

      <div className={classes.grid}>
        {items.map((item) => (
          <Fragment key={item.name}>
            <Text size={400}>{item.name}</Text>
            <Input
              type="number"
              name={item.name}
              value={item.quantity.toString()}
              className={classes.input}
              onChange={handleUpdateQuantity}
              contentBefore={
                <Text size={400} id={beforeLabelId}>
                  x
                </Text>
              }
            />
            <Input
              type="number"
              name={item.name}
              value={item.price ? item.price.toString() : ""}
              className={classes.inputPrice}
              onChange={handleUpdatePrice}
              contentBefore={
                <Text size={400} id={beforeLabelId}>
                  $
                </Text>
              }
            />
            <Button
              icon={<DeleteIcon />}
              appearance="transparent"
              onClick={() => handleDeleteItem(item.name)}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const AddItem = ({
  onAddItem,
}: {
  onAddItem: (name: string) => void;
}) => {
  const inputId = useId("input");
  const styles = useStyles();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Dialog modalType="modal">
      <DialogTrigger disableButtonEnhancement>
        <Button>Add Item</Button>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <DialogBody>
          <DialogTitle>Add new item</DialogTitle>
          <DialogContent>
            <div className={styles.root}>
              <Input ref={ref} id={inputId} />
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                onClick={() => onAddItem(ref.current?.value || "")}
              >
                Add
              </Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
