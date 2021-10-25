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


