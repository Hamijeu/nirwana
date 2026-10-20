import React, {useEffect, useState} from 'react';
import {Moon, Sun} from 'lucide-react';
import {persistTheme, readTheme} from './theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try { return readTheme(window.localStorage, window.matchMedia('(prefers-color-scheme: dark)').matches); }
    catch { return document.documentElement.dataset.theme || 'light'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0c1424' : '#f7f9fc');
  }, [theme]);
  const dark = theme === 'dark';
  function toggle() {
    const next = dark ? 'light' : 'dark';
    setTheme(next);
    try { persistTheme(window.localStorage, next); } catch { /* Storage can be unavailable. */ }
  }
  return <button className="theme-toggle" type="button" onClick={toggle}
    aria-label={dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
    aria-pressed={dark} title={dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}>
    {dark ? <Sun size={17}/> : <Moon size={17}/>}
    <span>{dark ? 'Terang' : 'Gelap'}</span>
  </button>;
}
