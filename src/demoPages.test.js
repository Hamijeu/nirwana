import test from 'node:test';
import assert from 'node:assert/strict';

const {demoPages = [], isDemoPageActive = () => false} = await import('./demoPages.js').catch(() => ({}));

test('mode demo exposes main company page and an independent beta comparison', () => {
  assert.equal(demoPages.find(page => page.label === 'Company Profile')?.path, '/');
  assert.equal(demoPages.find(page => page.label === 'Company Profile Beta Page')?.path, '/company-profile-beta');
  assert.equal(new Set(demoPages.map(page => page.path)).size, demoPages.length);
});

test('demo selection highlights only the current public page and retains workspace selection', () => {
  assert.equal(isDemoPageActive('/', '/'), true);
  assert.equal(isDemoPageActive('/company-profile-beta', '/'), false);
  assert.equal(isDemoPageActive('/company-profile-beta', '/company-profile-beta'), true);
  assert.equal(isDemoPageActive('/admin/customers', '/admin/dashboard'), true);
  assert.equal(isDemoPageActive('/officer/tickets', '/admin/dashboard'), false);
});
