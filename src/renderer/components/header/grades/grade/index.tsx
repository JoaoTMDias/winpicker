import { Icon } from "@fluentui/react/lib/Icon";
import { FC } from "react";
import { Tooltip } from "../../../common";
import styles from "./styles.module.scss";

interface Props {
  compliant?: boolean;
  level: "AA" | "AA+" | "AAA" | "AAA+";
}

const Grade: FC<Props> = ({ compliant, level = "AA" }) => {
  const tooltipId = `33816320-5c10-4d84-806d-206c0a9a0976-${level}`;
  const iconName = compliant ? "CompletedSolid" : "ErrorBadge";
  const accessibleDescription = `${compliant ? "Passes" : "Fails"
    } the ${level} level.`;

  return (
    <Tooltip id={tooltipId} description={accessibleDescription}>
      <div className={styles.grade} role="listitem">
        <span className="sr-only">{accessibleDescription}</span>
        {compliant}
        <Icon iconName={iconName} />
        <span aria-hidden>{level}</span>
      </div>
    </Tooltip>
  );
};

export default Grade;
