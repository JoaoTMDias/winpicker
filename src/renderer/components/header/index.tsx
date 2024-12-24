import { useMemo } from "react";
import { usePicker } from "@/renderer/containers";
import Grade from "./grades/grade";
import Score from "./score";
import styles from "./styles.module.scss";
import { getComplianceState } from "@/renderer/helpers";

function Header() {
  const { ratio } = usePicker();
  const compliance = useMemo(() => {
    return getComplianceState(ratio);
  }, [ratio]);

  return (
    <header className={styles.wrapper} aria-label="Score and Grade results">
      <Score score={ratio} />
      <h2 className="sr-only" data-testid="header-grade-results-title">
        Grade Results
      </h2>
      <div
        className={styles.grades}
        role="list"
        data-testid="header-grade-results-list"
      >
        <Grade
          compliant={compliance.AA}
          level="AA"
          data-testid="header-grade-results-item-aa"
        />
        <Grade
          compliant={compliance["AA+"]}
          level="AA+"
          data-testid="header-grade-results-item-aa-plus"
        />
        <Grade
          compliant={compliance.AAA}
          level="AAA"
          data-testid="header-grade-results-item-aaa"
        />
        <Grade
          compliant={compliance["AAA+"]}
          level="AAA+"
          data-testid="header-grade-results-item-aaa-plus"
        />
      </div>
    </header>
  );
}

export default Header;
