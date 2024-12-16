import { useAutoId } from "@feedzai/js-utilities/hooks";
import {
  ITooltipHostProps,
  ITooltipHostStyles,
  TooltipHost,
} from "@fluentui/react/lib/Tooltip";
import { FC } from "react";

const CALLOUT_PROPS = { gapSpace: 0 };
const HOST_STYLES: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};

interface Props extends ITooltipHostProps {
  id: string;
  description: string;
}

const Tooltip: FC<Props> = ({ id, description, delay, children }) => {
  const tooltipId = useAutoId(id);

  return (
    <TooltipHost
      content={description}
      id={tooltipId}
      calloutProps={CALLOUT_PROPS}
      styles={HOST_STYLES}
      delay={delay}
    >
      {children}
    </TooltipHost>
  );
};

export default Tooltip;
