export function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}


const eqSVGs = require.context("!@svgr/webpack!../assets/icons/equipment", true, /\.svg$/);
export const SVGMap = eqSVGs.keys().reduce((images, path) => {
  const key = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
  images[key] = eqSVGs(path).default;
  return images;
}, {});


export const weaponPrimary = ['Shotgun', 'Machine Gun', 'Submachine Gun', 'Rifle', 'SniperRifle']

export const grenadesCost = {
  weapon_smokegrenade: 300,
  weapon_hegrenade: 300,
  weapon_incgrenade: 600,
  weapon_molotov: 400,
  weapon_flashbang: 200
}

export function CostGrenades(utilities, team) {
  let total = 0

  Object.keys(utilities).forEach(grenade => {
    let costGrenade = grenadesCost[grenade] * utilities[grenade]
    total += costGrenade
  })

  if (team === 'CT') {
    if (total < 2301)
      return 'Low'
    else if (total < 4601)
      return 'Medium'
    else
      return 'High'
  } else {
    if (total < 2001)
      return 'Low'
    else if (total < 4001)
      return 'Medium'
    else
      return 'High'
  }
}
