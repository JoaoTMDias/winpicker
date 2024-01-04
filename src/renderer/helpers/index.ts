export function getRatioAsString(score: number | string, maxScore: number) {
  const PRE_SCORE = "Colour combination has a ratio of";
  const POST_SCORE = `to ${maxScore}`;

  return {
    label: `${PRE_SCORE} ${score} ${POST_SCORE}`,
    pre: PRE_SCORE,
    post: POST_SCORE,
  }
}
