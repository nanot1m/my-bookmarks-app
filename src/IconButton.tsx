import { IconButton as ChakraIconButton, Tooltip } from "@chakra-ui/react";
import { MouseEventHandler, ReactElement, ReactNode } from "react";

export function IconButton(props: {
  "aria-label": string;
  title?: ReactNode;
  icon: ReactElement;
  onClick?: MouseEventHandler;
}) {
  return (
    <Tooltip label={props.title} placement="top">
      <ChakraIconButton
        aria-label={props["aria-label"]}
        icon={props.icon}
        onClick={props.onClick}
      />
    </Tooltip>
  );
}
