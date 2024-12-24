export function getRatioAsString(score: number | string, maxScore: number) {
  const PRE_SCORE = "Colour combination has a ratio of";
  const POST_SCORE = `to ${maxScore}`;

  return {
    label: `${PRE_SCORE} ${score} ${POST_SCORE}`,
    pre: PRE_SCORE,
    post: POST_SCORE,
  };
}

type ComplianceLevel = "AA+" | "AA" | "AAA+" | "AAA";
type ComplianceState = Record<ComplianceLevel, boolean>;

/**
 * Calculates the compliance state of the current ratio.
 */
export function getComplianceState(ratio: number): ComplianceState {
  const thresholds: [ComplianceLevel[], number][] = [
    [["AA+", "AA", "AAA+", "AAA"], 7],
    [["AA+", "AA", "AAA+"], 4.5],
    [["AA+"], 3],
  ];

  const compliantLevels =
    thresholds.find(([_, threshold]) => ratio > threshold)?.[0] ?? [];

  return {
    "AA+": compliantLevels.includes("AA+"),
    AA: compliantLevels.includes("AA"),
    "AAA+": compliantLevels.includes("AAA+"),
    AAA: compliantLevels.includes("AAA"),
  };
}
