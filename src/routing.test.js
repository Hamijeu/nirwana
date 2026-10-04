import test from 'node:test';
import assert from 'node:assert/strict';
import {routeHref, currentRoute, currentSearch} from './routing.js';

test('local development keeps readable history routes', () => {
  assert.equal(routeHref('/client/dashboard', '/'), '/client/dashboard');
  assert.equal(currentRoute({pathname:'/client/dashboard',hash:''}, '/'), '/client/dashboard');
});

test('GitHub Pages routes remain under the repository path after refresh', () => {
  assert.equal(routeHref('/client/dashboard', '/nirwana/'), '/nirwana/#/client/dashboard');
  assert.equal(currentRoute({pathname:'/nirwana/',hash:'#/client/dashboard'}, '/nirwana/'), '/client/dashboard');
  assert.equal(currentRoute({pathname:'/nirwana/',hash:''}, '/nirwana/'), '/');
});

test('query parameters survive GitHub Pages hash routing', () => {
  const url = routeHref('/login?next=%2Fclient%2Ftickets%2Fcreate', '/nirwana/');
  assert.equal(url, '/nirwana/#/login?next=%2Fclient%2Ftickets%2Fcreate');
  const location = {pathname:'/nirwana/',hash:'#/login?next=%2Fclient%2Ftickets%2Fcreate',search:''};
  assert.equal(currentRoute(location, '/nirwana/'), '/login');
  assert.equal(currentSearch(location, '/nirwana/').get('next'), '/client/tickets/create');
});
