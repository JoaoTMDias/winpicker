import { Icon } from "@fluentui/react/lib/Icon";
import { FC, useMemo } from "react";
import { Tooltip } from "@/renderer/components";
import styles from "./styles.module.scss";

interface Props {
  compliant?: boolean;
  level: "AA" | "AA+" | "AAA" | "AAA+";
}

const Grade: FC<Props> = ({ compliant, level = "AA" }) => {
  const TOOLTIP_ID = `33816320-5c10-4d84-806d-206c0a9a0976-${level}`;
  const ICON_NAME = compliant ? "CompletedSolid" : "ErrorBadge";
  const ACCESSIBLE_DESCRIPTION = `${
    compliant ? "Passes" : "Fails"
  } the ${level} level.`;
  const TEST_IDS = useMemo(() => {
    const wrapper = `header-grade-results-item-${level.toLowerCase()}`;

    return {
      wrapper,
      description: `${wrapper}-description`,
      icon: `${wrapper}-icon`,
      label: `${wrapper}-label`,
    };
  }, [level]);

  return (
    <Tooltip id={TOOLTIP_ID} description={ACCESSIBLE_DESCRIPTION}>
      <div
        className={styles.grade}
        role="listitem"
        data-testid={TEST_IDS.wrapper}
      >
        <span className="sr-only" data-testid={TEST_IDS.description}>
          {ACCESSIBLE_DESCRIPTION}
        </span>
        {compliant}
        <Icon iconName={ICON_NAME} data-testid={TEST_IDS.icon} />
        <span aria-hidden data-testid={TEST_IDS.label}>
          {level}
        </span>
      </div>
    </Tooltip>
  );
};

export default Grade;
