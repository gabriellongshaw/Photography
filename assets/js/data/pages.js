const pathArray = window.location.pathname.split('/');
const base = pathArray.slice(0, 3).join('/') + '/'; 

export const pages = [
  { name: 'Home', href: base },
  { name: 'Aperture', href: `${base}aperture/` },
  { name: 'Shutter Speed', href: `${base}shutter-speed/` },
  { name: 'ISO', href: `${base}iso/` },
];