const eqSVGs = require.context("!@svgr/webpack!../assets/icons/equipment", true, /\.svg$/);

const grenadesCost = {
  weapon_smokegrenade: 300,
  weapon_hegrenade: 300,
  weapon_incgrenade: 600,
  weapon_molotov: 400,
  weapon_flashbang: 200
}

export function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export const SVGMap = eqSVGs.keys().reduce((images, path) => {
  const key = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
  images[key] = eqSVGs(path).default;
  return images;
}, {});

export const redisIP = '10.99.4.20'

export function CostGrenades(utilities, team) {
  let total = 0

  Object.keys(utilities).forEach(grenade => {
    let costGrenade = grenadesCost[grenade] * utilities[grenade]
    total += costGrenade
  })

  if (team === 'CT') {
    if (total === 0)
      return 'NONE'
    else if (total > 0 && total < 2301)
      return 'POOR'
    else if (total >= 2301 && total < 4601)
      return 'MEDIUM'
    else
      return 'HIGH'
  } else {
    if (total === 0)
      return 'NONE'
    else if (total > 0 && total < 2001)
      return 'POOR'
    else if (total >= 2001 && total < 4001)
      return 'MEDIUM'
    else
      return 'HIGH'
  }
}

export function currentMatch(maps, topBar) {
  let keys = Object.keys(maps)
  for (let index = 0; index < keys.length; index++) {
    if (maps[keys[index]][topBar.leftSide.nameKey] === null) {
      return index
    }
  }
}

export function findGetParameter(parameterName) {
  let result = null,
    tmp = [];
  let items = window.location.search.substr(1).split("&");
  for (let index = 0; index < items.length; index++) {
    tmp = items[index].split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

