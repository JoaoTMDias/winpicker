import { Rating, RatingSize } from "@fluentui/react";
import { FC, useMemo } from "react";
import { usePicker } from "@/renderer/containers";
import { Tooltip } from "@/renderer/components";
import { getRatioAsString } from "@/renderer/helpers";
import styles from "./styles.module.scss";

interface Props {
  score: number;
}

const MAX_RATING_SCORE = 5;

const Score: FC<Props> = ({ score }) => {
  const { ratio } = usePicker();
  const description = `Contrast Ratio is ${score} to 1`;

  const rating = useMemo(() => {
    switch (true) {
      case ratio >= 13:
        return 5;

      case ratio >= 7:
        return 4;

      case ratio >= 4.5:
        return 3;

      case ratio >= 3:
        return 2;

      default:
      case ratio >= 1:
        return 1;
    }
  }, [ratio]);

  const RATING_LABEL = `Colour combination has a rating of ${rating} out of ${MAX_RATING_SCORE} stars`;
  const RATIO_LABEL = getRatioAsString(score, 1);

  return (
    <div className={styles.score}>
      <div className={styles.score__container}>
        <span className={styles.score__letters} data-testid="header-logo">
          Aa
        </span>
        <Tooltip
          id="a0123bde-0525-453e-aa62-b2a34d9ce8a0"
          description={description}
        >
          <h2
            className={styles.score__ratio}
            aria-live="polite"
            aria-atomic="false"
            data-testid="header-ratio"
          >
            <span className="sr-only">{RATIO_LABEL.pre}</span>
            <span>&nbsp;{score}&nbsp;</span>
            <span className="sr-only">{RATIO_LABEL.post}</span>
          </h2>
        </Tooltip>
      </div>
      <div data-testid="header-rating">
        <Tooltip
          id="769c99ec-5f77-4ce8-b613-45690d1ae9a5"
          description={RATING_LABEL}
        >
          <Rating
            className={styles.score__rating}
            max={MAX_RATING_SCORE}
            size={RatingSize.Large}
            rating={rating}
            ariaLabel={RATING_LABEL}
            ariaLabelFormat="{0} of {1} stars"
            disabled
            readOnly
            getAriaLabel={(rating: number, max: number) => {
              return `${rating} out of ${max} stars`;
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Score;
