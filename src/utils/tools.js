const eqSVGs = require.context("!@svgr/webpack!../assets/icons/equipment", true, /\.svg$/);

export const weaponPrimary = ['Shotgun', 'Machine Gun', 'Submachine Gun', 'Rifle', 'SniperRifle']

export function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export const SVGMap = eqSVGs.keys().reduce((images, path) => {
  const key = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
  images[key] = eqSVGs(path).default;
  return images;
}, {});


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


