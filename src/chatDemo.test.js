import test from 'node:test';
import assert from 'node:assert/strict';
import {getDemoReply} from './chatDemo.js';
import {homePlans, businessPlans, formatPrice} from './plans.js';

test('public pricing replies use the same prices as the package cards', () => {
  const reply = getDemoReply('Berapa harga paket rumah?', 'public');
  for (const plan of homePlans) {
    assert.ok(reply.text.includes(formatPrice(plan.price)));
    assert.ok(reply.text.includes(`${plan.speed} Mbps`));
  }
  assert.equal(reply.action, 'packages');
});

test('business and school questions include a custom offer', () => {
  const reply = getDemoReply('Internet untuk sekolah dan bisnis', 'public');
  assert.match(reply.text, /custom/i);
  assert.ok(reply.text.includes(formatPrice(businessPlans[0].price)));
  assert.equal(businessPlans.at(-1).price, null);
});

test('a package selected from a card receives a matching reply', () => {
  const reply = getDemoReply('Saya tertarik Home Family. Bisa jelaskan paket dan harganya?', 'public');
  assert.match(reply.text, /Home Family/);
  assert.match(reply.text, /100 Mbps/);
  assert.ok(reply.text.includes(formatPrice(homePlans[2].price)));
});

test('client troubleshooting offers a ticket without pretending to diagnose the account', () => {
  const reply = getDemoReply('Internet saya mati, bagaimana?', 'client');
  assert.match(reply.text, /router/i);
  assert.equal(reply.action, 'report');
  assert.doesNotMatch(reply.text, /sudah (memeriksa|memperbaiki|membuat tiket)/i);
});

test('unknown prompts produce a useful local fallback and input cannot become markup', () => {
  const reply = getDemoReply('<script>hello</script>', 'public');
  assert.match(reply.text, /paket|harga/i);
  assert.equal(typeof reply.text, 'string');
  assert.doesNotMatch(reply.text, /<script>/);
});
