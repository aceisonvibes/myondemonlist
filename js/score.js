export function score(rank, percent = 100, minPercent = 1) {
    rank = Number(rank) || 1;
    percent = Number(percent) || 100;
    minPercent = Number(minPercent) || 1;

    if (rank > 150) return 0;
    if (rank > 75 && percent < 100) return 0;
    if (rank === 1) return 500000;

    const top1 = 500000;
    const bottom = 1;

    // Adjusted exponent and scaling for smoother top
    const exponent = 0.45; // slightly steeper top decay
    const scaleFactor = 1.8; // controls top drop

    // Smooth decay using power-law
    let scoreValue = top1 - (top1 - bottom) * Math.pow((rank - 1) / 149, exponent) * scaleFactor;

    scoreValue *= Math.max((percent - (minPercent - 1)) / (100 - (minPercent - 1)), 0);

    if (percent !== 100) {
        scoreValue = Math.max(scoreValue - scoreValue / 3, 1);
    }

    return Math.round(Math.max(scoreValue, 1));
}
