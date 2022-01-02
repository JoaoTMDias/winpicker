import { useId } from "@fluentui/react-hooks";
import {
  ITooltipHostProps,
  ITooltipHostStyles,
  TooltipHost
} from "@fluentui/react/lib/Tooltip";
import { FC } from "react";

const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};

interface Props extends ITooltipHostProps {
  id: string;
  description: string;
}

const Tooltip: FC<Props> = ({ id, description, delay, children }) => {
  const tooltipId = useId(id);

  return (
    <TooltipHost
      content={description}
      id={tooltipId}
      calloutProps={calloutProps}
      styles={hostStyles}
      delay={delay}
    >
      {children}
    </TooltipHost>
  );
};

export default Tooltip;
