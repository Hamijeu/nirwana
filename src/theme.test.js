import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveTheme, readTheme, persistTheme} from './theme.js';

test('saved preference takes precedence over the device theme', () => {
  assert.equal(resolveTheme('light', true), 'light');
  assert.equal(resolveTheme('dark', false), 'dark');
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme('invalid', false), 'light');
});

test('blocked storage does not prevent switching themes', () => {
  const storage = {getItem(){throw new Error('blocked')},setItem(){throw new Error('blocked')}};
  assert.equal(readTheme(storage, true), 'dark');
  assert.doesNotThrow(() => persistTheme(storage, 'light'));
});

test('preference is restored on the next visit', () => {
  const values = new Map();
  const storage = {getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value)};
  persistTheme(storage, 'dark');
  assert.equal(readTheme(storage, false), 'dark');
});
