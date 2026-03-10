const scale = 0; // whole numbers

export function score(rank, percent = 100, minPercent = 1) {
    rank = Number(rank) || 1;
    percent = Number(percent) || 100;
    minPercent = Number(minPercent) || 1;

    if (rank > 150) return 0;
    if (rank > 75 && percent < 100) return 0;

    // Hardcode Top 1
    if (rank === 1) return 500;

    // Parameters for gentle decay
    const top1 = 500;
    const top2 = 497;
    const top3 = 494;
    const bottom = 1;

    let scoreValue;

    // Use small power-law decay
    if (rank === 2) scoreValue = top2;
    else if (rank === 3) scoreValue = top3;
    else {
        // ranks 4–150
        const exponent = 1.6; // adjusts decay steepness
        const k = (top3 - bottom) / Math.pow(147, exponent); // 147 = 150-3
        scoreValue = Math.round(Math.max(top3 - k * Math.pow(rank - 3, exponent), 1));
    }

    // Adjust for percent completed
    scoreValue *= Math.max((percent - (minPercent - 1)) / (100 - (minPercent - 1)), 0);

    if (percent !== 100) {
        scoreValue = Math.max(scoreValue - scoreValue / 3, 1);
    }

    return Math.round(Math.max(scoreValue, 1));
}

export function round(num) {
    return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
}
