import Grade from './grades/grade';
import Score from './score';
import styles from './styles.module.scss';

const DEMO_SCORE = 8.59;

const Header = () => {
  return (
    <header className={styles.wrapper} aria-label="Score and Grade results">
      <Score score={DEMO_SCORE} />
      <ul className={styles.grades} aria-label="Grade results">
        <Grade compliant level="AA" />
        <Grade compliant level="AA+" />
        <Grade compliant level="AAA" />
        <Grade level="AAA+" />
      </ul>
    </header>
  );
};

export default Header;
