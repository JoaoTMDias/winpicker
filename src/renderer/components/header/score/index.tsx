import { Rating, RatingSize } from "@fluentui/react";
import { FC, useMemo } from "react";
import { usePickerState } from "../../../containers/picker-state";
import { Tooltip } from "../../common";
import styles from "./styles.module.scss";
import { getRatioAsString } from "../../../helpers";

interface Props {
  score: number;
}

const DEFAULT_RATING_SCORE = 1;
const MAX_RATING_SCORE = 5;

const Score: FC<Props> = ({ score }) => {
  const [state] = usePickerState();
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

  const ratingLabel = `Colour combination has a rating of ${rating} out of ${MAX_RATING_SCORE} stars`;
  const ratioLabel = getRatioAsString(score, 1);

  return (
    <div className={styles.score}>
      <div className={styles.score__container}>
        <span className={styles.score__letters}>Aa</span>
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
            <span className="sr-only">{ratioLabel.pre}</span>
            <span>&nbsp;{score}&nbsp;</span>
            <span className="sr-only">{ratioLabel.post}</span>
          </h2>
        </Tooltip>
      </div>
      <Rating
        className={styles.score__rating}
        max={MAX_RATING_SCORE}
        size={RatingSize.Large}
        rating={rating}
        defaultRating={DEFAULT_RATING_SCORE}
        ariaLabel={ratingLabel}
        ariaLabelFormat="{0} of {1} stars"
        disabled
        readOnly
      />
    </div>
  );
};

export default Score;
