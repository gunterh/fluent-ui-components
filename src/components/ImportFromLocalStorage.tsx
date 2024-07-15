import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  makeStyles,
  Textarea,
} from "@fluentui/react-components";
import {
  bundleIcon,
  ClipboardPasteFilled,
  ClipboardPasteRegular,
} from "@fluentui/react-icons";
import { ListItem } from "./ShoppingList";
import { useRef } from "react";

// Styles
const useStyles = makeStyles({
  floatingButton: {
    position: "fixed",
    left: "1rem",
    top: "1rem",
    zIndex: 9,
  },
});

const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);

export const ImportFromLocalStorage = (props: {
  onImport: (items: ListItem[]) => void;
}) => {
  const classes = useStyles();
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <Dialog modalType="modal">
      <DialogTrigger disableButtonEnhancement>
        <Button
          className={classes.floatingButton}
          appearance="transparent"
          icon={<PasteIcon />}
        />
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <DialogBody>
          <DialogTitle>Import from Localstorage</DialogTitle>
          <DialogContent>
            <div>
              <Field>
                <Textarea ref={ref} />
              </Field>
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                onClick={() => {
                  const items = JSON.parse(
                    ref.current?.value || "[]"
                  ) as ListItem[];

                  props.onImport(items);
                }}
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
