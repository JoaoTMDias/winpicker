import { Rating, RatingSize } from '@fluentui/react';
import React from 'react';
import styles from './styles.module.scss';

interface Props {
  score: number;
}

const DEMO_RATING_SCORE = 5;
const DEFAULT_RATING_SCORE = 1;
const MAX_RATING_SCORE = 5;

const Score: React.FC<Props> = ({ score }) => {
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
        max={MAX_RATING_SCORE}
        size={RatingSize.Large}
        rating={DEMO_RATING_SCORE}
        defaultRating={DEFAULT_RATING_SCORE}
        ariaLabel={`Colour combination has a rating of ${DEMO_RATING_SCORE} out of ${MAX_RATING_SCORE} stars`}
        ariaLabelFormat="{0} of {1} stars"
        disabled
      />
    </div>
  );
};

export default Score;
