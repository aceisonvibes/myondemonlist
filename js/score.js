export function score(rank, percent = 100, minPercent = 1) {
    if (rank > 150) return 0;
    if (rank > 75 && percent < 100) return 0;

    percent = Number(percent) || 0;
    minPercent = Number(minPercent) || 1;

    if (rank === 1) return 500000;

    const exponent = 0.4;
    const top1 = 500000;
    const bottom = 1;

    const k = (top1 - bottom) / Math.pow(149, exponent);
    let scoreValue = -k * Math.pow(rank - 1, exponent) + top1;

    scoreValue *= Math.max((percent - (minPercent - 1)) / (100 - (minPercent - 1)), 0);

    if (percent !== 100) {
        scoreValue = Math.max(scoreValue - scoreValue / 3, 1);
    }

    return Math.round(Math.max(scoreValue, 1));
}
