/**
 * Numbers of decimal digits to round to
 */
const scale = 0; // whole numbers

export function score(rank, percent, minPercent) {
    if (rank > 150) return 0;
    if (rank > 75 && percent < 100) return 0;

    // Fixed Top 1
    if (rank === 1) return 500000;

    // Parameters
    const exponent = 0.4;
    const top1 = 500000;
    const bottom = 1;

    // Correctly scaled k
    const k = (top1 - bottom) / Math.pow(149, exponent);

    // Base score
    let scoreValue = -k * Math.pow(rank - 1, exponent) + top1;

    // Adjust for percent completed
    scoreValue *= (percent - (minPercent - 1)) / (100 - (minPercent - 1));
    scoreValue = Math.max(scoreValue, 1);

    // Penalize partial completions
    if (percent !== 100) {
        scoreValue = Math.max(scoreValue - scoreValue / 3, 1);
    }

    return Math.round(scoreValue);
}
