// Inspired by https://github.com/organicmaps/organicmaps/blob/4838d57a63a8448bc5e829a5f2ec48b168ab7753/ge0/url_generator.cpp

const MAX_POINT_BYTES = 10;
const MAX_COORD_BITS = MAX_POINT_BYTES * 3;

export function genUrlCode(latitude, longitude, zoom) {
  const zoomI = zoom <= 4 ? 0 : zoom >= 19.75 ? 63 : Math.round((zoom - 4) * 4);
  return `${base64Char(zoomI)}${latLonToString(latitude, longitude, 9)}`;
}

function base64Char(x) {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[x];
}

// Map latitude: [-90, 90] -> [0, maxValue]
function latToInt(lat, maxValue) {
  const x = ((lat + 90.0) / 180.0) * maxValue;
  return x < 0 ? 0 : x > maxValue ? maxValue : Math.round(x + 0.5);
}

// Make lon in [-180, 180)
function lonIn180180(lon) {
  if (lon >= 0) {
    return ((lon + 180.0) % 360.0) - 180.0;
  }

  // Handle the case of l = -180
  const l = ((lon - 180.0) % 360.0) + 180.0;
  return l < 180.0 ? l : l - 360.0;
}

// Map longitude: [-180, 180) -> [0, maxValue]
function lonToInt(lon, maxValue) {
  const x = ((lonIn180180(lon) + 180.0) / 360.0) * (maxValue + 1.0) + 0.5;
  return x <= 0 || x >= maxValue + 1 ? 0 : Math.round(x);
}

function latLonToString(lat, lon, nBytes) {
  if (nBytes > MAX_POINT_BYTES) {
    nBytes = MAX_POINT_BYTES;
  }

  const latI = latToInt(lat, (1 << MAX_COORD_BITS) - 1);
  const lonI = lonToInt(lon, (1 << MAX_COORD_BITS) - 1);

  let i;
  let shift;
  let str = "";
  for (i = 0, shift = MAX_COORD_BITS - 3; i < nBytes; ++i, shift -= 3) {
    const latBits = (latI >> shift) & 7;
    const lonBits = (lonI >> shift) & 7;

    const nextByte =
      (((latBits >> 2) & 1) << 5) |
      (((lonBits >> 2) & 1) << 4) |
      (((latBits >> 1) & 1) << 3) |
      (((lonBits >> 1) & 1) << 2) |
      ((latBits & 1) << 1) |
      (lonBits & 1);

    str += base64Char(nextByte);
  }

  return str;
}
