import { Rating, RatingSize } from '@fluentui/react';
import React, { useMemo } from 'react';
import { usePickerState } from 'renderer/containers/picker-state';
import styles from './styles.module.scss';

interface Props {
  score: number;
}

const DEMO_RATING_SCORE = 5;
const DEFAULT_RATING_SCORE = 1;
const MAX_RATING_SCORE = 5;

const Score: React.FC<Props> = ({ score }) => {
  const [state] = usePickerState();
  const rating = useMemo(() => {
    switch (true) {
      case state.ratio >= 13:
        return 5;

      case state.ratio >= 7:
        return 4;

      case state.ratio >= 4.5:
        return 3;

      case state.ratio >= 3:
        return 2;

      default:
      case state.ratio >= 1:
        return 1;
    }
  }, [state]);
  return (
    <div className={styles.score}>
      <div className={styles.score__container}>
        <span className={styles.score__letters}>Aa</span>
        <h2
          className={styles.score__ratio}
          aria-live="polite"
          aria-atomic="false"
        >
          <span className="sr-only">Colour combination has a ratio of</span>
          <span>{score}</span>
          <span className="sr-only">to 1</span>
        </h2>
      </div>
      <Rating
        className={styles.score__rating}
        max={MAX_RATING_SCORE}
        size={RatingSize.Large}
        rating={rating}
        defaultRating={DEFAULT_RATING_SCORE}
        ariaLabel={`Colour combination has a rating of ${rating} out of ${MAX_RATING_SCORE} stars`}
        ariaLabelFormat="{0} of {1} stars"
        disabled
      />
    </div>
  );
};

export default Score;
