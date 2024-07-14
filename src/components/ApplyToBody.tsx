import { useThemeClassName } from "@fluentui/react-components";
import { useEffect } from "react";

export function ApplyToBody() {
  const classes = useThemeClassName();

  useEffect(() => {
    const classList = classes.split(" ");
    console.log(classList);
    document.body.classList.add(...classList);

    return () => document.body.classList.remove(...classList);
  }, [classes]);

  return null;
}
