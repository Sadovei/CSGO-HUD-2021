const eqSVGs = require.context("!@svgr/webpack!../assets/icons/equipment", true, /\.svg$/);

export const SVGMap = eqSVGs.keys().reduce((images, path) => {
  const key = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
  images[key] = eqSVGs(path).default;
  return images;
}, {});

export const weaponPrimary = ['Shotgun', 'Machine Gun', 'Submachine Gun', 'Rifle', 'SniperRifle']

export const redisIP = '10.99.4.20'


