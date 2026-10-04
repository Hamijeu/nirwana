const normalizeBase = base => base === '/' ? '' : base.replace(/\/$/, '');

export function routeHref(path, base = '/') {
  const prefix = normalizeBase(base);
  return prefix ? `${prefix}/#${path}` : path;
}

export function currentRoute(location, base = '/') {
  if (normalizeBase(base)) return location.hash.startsWith('#/') ? location.hash.slice(1).split('?')[0] : '/';
  return location.pathname || '/';
}

export function currentSearch(location, base = '/') {
  if (normalizeBase(base)) return new URLSearchParams(location.hash.split('?')[1] || '');
  return new URLSearchParams(location.search || '');
}
