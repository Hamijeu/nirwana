export const THEME_KEY = 'nirwana-theme';

export function resolveTheme(saved, prefersDark) {
  return saved === 'dark' || saved === 'light' ? saved : prefersDark ? 'dark' : 'light';
}

export function readTheme(storage, prefersDark) {
  try { return resolveTheme(storage.getItem(THEME_KEY), prefersDark); }
  catch { return resolveTheme(null, prefersDark); }
}

export function persistTheme(storage, theme) {
  try { storage.setItem(THEME_KEY, theme); } catch { /* Theme still works without storage. */ }
}
