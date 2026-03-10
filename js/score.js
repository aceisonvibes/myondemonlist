export function score(rank, percent = 100, minPercent = 1) {
    if (rank > 150) return 0;
    if (rank > 75 && percent < 100) return 0;

    // Ensure numeric values
    percent = Math.max(0, percent);
    minPercent = Math.max(1, minPercent);

    // Fixed Top 1
    if (rank === 1) return 500000;

    const exponent = 0.4;
    const top1 = 500000;
    const bottom = 1;

    // Scale k so rank 150 = bottom
    const k = (top1 - bottom) / Math.pow(149, exponent);

    // Base score
    let scoreValue = -k * Math.pow(rank - 1, exponent) + top1;

    // Only adjust if percent >= minPercent
    if (percent >= minPercent) {
        scoreValue *= (percent - (minPercent - 1)) / (100 - (minPercent - 1));
        if (percent !== 100) {
            scoreValue = Math.max(scoreValue - scoreValue / 3, 1);
        }
    } else {
        scoreValue = 0; // didn’t meet minimum requirement
    }

    // Clamp and round
    return Math.round(Math.max(scoreValue, 1));
}
