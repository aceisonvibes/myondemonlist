/**
 * Numbers of decimal digits to round to
 */
const scale = 0; // no decimals, whole numbers

/**
 * Calculate the score awarded for a given rank
 * @param {Number} rank Position on the list (1 = Top 1)
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank > 150) return 0; // outside leaderboard
    if (rank > 75 && percent < 100) return 0; // low percent past rank 75

    // Fixed top 1
    if (rank === 1) return 500000;

    // Power-law decay parameters (fits the numbers you gave)
    const exponent = 0.4;
    const top1 = 500000;
    const bottom = 1;

    // Calculate scaling factor k
    const k = top1 - bottom;

    // Base score for full completion
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

/**
 * Optional rounding function if needed elsewhere
 */
export function round(num) {
    return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
}
