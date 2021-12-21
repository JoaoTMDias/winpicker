import { Rating, RatingSize } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { ITooltipHostStyles, TooltipHost } from '@fluentui/react/lib/Tooltip';
import React, { useMemo } from 'react';
import { usePickerState } from 'renderer/containers/picker-state';
import styles from './styles.module.scss';

interface Props {
  score: number;
}

const calloutProps = { gapSpace: 0 };
// The TooltipHost root uses display: inline by default.
// If that's causing sizing issues or tooltip positioning issues, try overriding to inline-block.
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: 'inline-block' },
};

const DEFAULT_RATING_SCORE = 1;
const MAX_RATING_SCORE = 5;

const Score: React.FC<Props> = ({ score }) => {
  const [state] = usePickerState();
  const tooltipId = useId('score');
  const description = `Contrast Ratio is ${score} to 1`;

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

  const ariaLabel = `Colour combination has a rating of ${rating} out of ${MAX_RATING_SCORE} stars`;

  return (
    <div className={styles.score}>
      <TooltipHost
        content={description}
        id={tooltipId}
        calloutProps={calloutProps}
        styles={hostStyles}
      >
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
      </TooltipHost>
      <Rating
        className={styles.score__rating}
        max={MAX_RATING_SCORE}
        size={RatingSize.Large}
        rating={rating}
        defaultRating={DEFAULT_RATING_SCORE}
        ariaLabel={ariaLabel}
        ariaLabelFormat="{0} of {1} stars"
        disabled
      />
    </div>
  );
};

export default Score;
