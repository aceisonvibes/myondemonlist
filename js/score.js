/**
 * Numbers of decimal digits to round to
 */
const scale = 0; // whole numbers, no decimals

/**
 * Calculate the score for a rank on the demonlist
 * @param {Number} rank Rank in the list (1 = Top 1)
 * @param {Number} percent Percentage completed on the level
 * @param {Number} minPercent Minimum percent to qualify
 * @returns {Number}
 */
export function score(rank, percent = 100, minPercent = 1) {
    // Ensure numeric values
    rank = Number(rank) || 1;
    percent = Number(percent) || 100;
    minPercent = Number(minPercent) || 1;

    // Clamp rank and percent
    if (rank > 150) return 0;
    if (rank > 75 && percent < 100) return 0;

    // Fixed Top 1
    if (rank === 1) return 500;

    // Parameters for the curve
    const exponent = 0.4;       // controls steepness
    const top1 = 500;        // top score
    const bottom = 1;           // rank 150 score

    // Scale factor so rank 150 = bottom
    const k = (top1 - bottom) / Math.pow(149, exponent);

    // Base score
    let scoreValue = -k * Math.pow(rank - 1, exponent) + top1;

    // Adjust for percent completed (partial progress)
    scoreValue *= Math.max((percent - (minPercent - 1)) / (100 - (minPercent - 1)), 0);

    // Penalize partial completions
    if (percent !== 100) {
        scoreValue = Math.max(scoreValue - scoreValue / 3, 1);
    }

    // Round and clamp
    return Math.round(Math.max(scoreValue, 1));
}

/**
 * Optional rounding function if needed
 */
export function round(num) {
    return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
}
