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
  SearchBox,
} from "@fluentui/react-components";
import {
  ArrowDownFilled,
  ArrowDownRegular,
  ArrowUpFilled,
  ArrowUpRegular,
  bundleIcon,
  DeleteFilled,
  DeleteRegular,
} from "@fluentui/react-icons";
import { Fragment, useEffect, useRef, useState } from "react";
import { CopyLocalStorage } from "./CopyLocalStorage";
import { ImportFromLocalStorage } from "./ImportFromLocalStorage";
import Decimal from "decimal.js-light";
import { getItemsFromJsonString, getJsonStringFromItems } from "../lib/utils";

// Styles
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingVerticalL,
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
  gridButtons: {
    display: "grid",
    gap: tokens.spacingVerticalM,
  },
  grid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto 1fr 1fr",
    alignItems: "center",
    gap: tokens.spacingVerticalL,
  },
  gridSorting: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto auto",
    alignItems: "center",
    gap: tokens.spacingVerticalL,
  },
  input: {
    width: "70px",
    fontSize: "0.8rem",
  },
  inputPrice: {
    width: "80px",
    fontSize: "0.8rem",
  },
});

export interface ListItem {
  name: string;
  price?: Decimal;
  quantity: number;
}

// Icons
const DeleteIcon = bundleIcon(DeleteFilled, DeleteRegular);
const ArrowUpIcon = bundleIcon(ArrowUpFilled, ArrowUpRegular);
const ArrowDownIcon = bundleIcon(ArrowDownFilled, ArrowDownRegular);

export const ShoppingList = () => {
  const [items, setItems] = useState<ListItem[]>(() => {
    const items = localStorage.getItem("items");
    return items ? getItemsFromJsonString(items) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const beforeLabelId = useId("before-label");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    saveItemsInLocalStorage(items);
  }, [items]);

  const classes = useStyles();
  const total = items.reduce((acc, item) => {
    const newAcc = acc.add(item.price ? item.price.times(item.quantity) : 0);
    return newAcc;
  }, new Decimal(0));

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
      _items.map((item) =>
        item.name === name ? { ...item, price: new Decimal(price) } : item
      )
    );
  };

  const saveItemsInLocalStorage = (value: ListItem[]) => {
    localStorage.setItem("items", getJsonStringFromItems(value));
  };

  const moveItemUp = (index: number) => {
    if (index === 0) return;
    setItems((_items) => {
      const items = [..._items];
      const temp = items[index - 1];
      items[index - 1] = items[index];
      items[index] = temp;
      return items;
    });
  };

  const moveItemDown = (index: number) => {
    if (index === items.length - 1) return;
    setItems((_items) => {
      const items = [..._items];
      const temp = items[index + 1];
      items[index + 1] = items[index];
      items[index] = temp;
      return items;
    });
  };

  return (
    <>
      {isEditing ? (
        <ImportFromLocalStorage
          onImport={(items) => {
            setItems(items);
          }}
        />
      ) : (
        <CopyLocalStorage />
      )}

      <div className={classes.root}>
        <div className={classes.gridButtons}>
          <AddItem onAddItem={handleAddItem} />
          <Button
            appearance="primary"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Done" : "Edit"}
          </Button>
        </div>
        <div className={classes.header}>
          <Text block align="center" size={600} weight="bold">
            {total.toNumber().toLocaleString("en-AU", {
              style: "currency",
              currency: "AUD",
            })}
          </Text>
          <SearchBox
            placeholder="Search"
            value={searchString}
            onChange={(_, data) => setSearchString(data.value)}
          />
        </div>
        <div className={isEditing ? classes.gridSorting : classes.grid}>
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchString.toLowerCase())
            )
            .map((item, index) => (
              <Fragment key={item.name}>
                <Text block size={200}>
                  {item.name}
                </Text>
                {isEditing ? (
                  <Button
                    icon={<ArrowUpIcon />}
                    appearance="transparent"
                    onClick={() => moveItemUp(index)}
                  />
                ) : (
                  <Input
                    type="number"
                    name={item.name}
                    value={item.quantity.toString()}
                    className={classes.input}
                    onChange={handleUpdateQuantity}
                    contentBefore={
                      <Text size={200} id={beforeLabelId}>
                        x
                      </Text>
                    }
                  />
                )}
                {isEditing ? (
                  <Button
                    icon={<ArrowDownIcon />}
                    appearance="transparent"
                    onClick={() => moveItemDown(index)}
                  />
                ) : (
                  <Input
                    type="number"
                    name={item.name}
                    value={item.price ? item.price.toString() : ""}
                    className={classes.inputPrice}
                    onChange={handleUpdatePrice}
                    contentBefore={
                      <Text size={100} id={beforeLabelId}>
                        $
                      </Text>
                    }
                  />
                )}
                {isEditing && (
                  <Button
                    icon={<DeleteIcon />}
                    size="small"
                    appearance="transparent"
                    onClick={() => handleDeleteItem(item.name)}
                  />
                )}
              </Fragment>
            ))}
        </div>
      </div>
    </>
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
