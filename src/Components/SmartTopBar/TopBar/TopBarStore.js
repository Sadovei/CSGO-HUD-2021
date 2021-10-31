export function calcDefusePerc(hasDefuse, countdown) {
    countdown = parseFloat(countdown);
    const defTime = hasDefuse === true ? 5 : 10;
    const perc = countdown * 100 / defTime;
    return perc * 92 / 100;
}

// export function calcBombPerc(countdown) {
//     countdown = parseFloat(countdown);
//     const bombTime = 40;
//     const perc = countdown * 100 / bombTime;
//     return perc * 92 / 100;
// }