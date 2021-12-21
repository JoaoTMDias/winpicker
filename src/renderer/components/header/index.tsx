import { useMemo } from 'react';
import { usePickerState } from 'renderer/containers/picker-state';
import Grade from './grades/grade';
import Score from './score';
import styles from './styles.module.scss';

const Header = () => {
  const [state] = usePickerState();
  const compliance = useMemo(() => {
    const contrast = state.ratio;

    if (contrast > 7) {
      return { 'AA+': true, AA: true, 'AAA+': true, AAA: true };
    }
    if (contrast > 4.5) {
      return { 'AA+': true, AA: true, 'AAA+': true, AAA: false };
    }
    if (contrast > 3) {
      return { 'AA+': true, AA: false, 'AAA+': false, AAA: false };
    }

    return { 'AA+': false, AA: false, 'AAA+': false, AAA: false };
  }, [state]);

  return (
    <header className={styles.wrapper} aria-label="Score and Grade results">
      <Score score={state.ratio} />
      <ul className={styles.grades} aria-label="Grade results">
        <Grade compliant={compliance.AA} level="AA" />
        <Grade compliant={compliance['AA+']} level="AA+" />
        <Grade compliant={compliance.AAA} level="AAA" />
        <Grade compliant={compliance['AAA+']} level="AAA+" />
      </ul>
    </header>
  );
};

export default Header;
