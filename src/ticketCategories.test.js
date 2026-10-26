import test from 'node:test';
import assert from 'node:assert/strict';
import {TICKET_CATEGORIES,categoryLabel,matchesCategory,isTicketCategory} from './ticketCategories.js';
test('category submission accepts supported choices and rejects empty or unknown values',()=>{assert.equal(TICKET_CATEGORIES.length,6);for(const c of TICKET_CATEGORIES)assert.equal(isTicketCategory(c),true);assert.equal(isTicketCategory(''),false);assert.equal(isTicketCategory('invalid'),false)});
test('legacy tickets remain visible without inventing a category',()=>{assert.equal(categoryLabel({}),'Belum dikategorikan');assert.equal(matchesCategory({},'all'),true);assert.equal(matchesCategory({},'uncategorized'),true);assert.equal(matchesCategory({},TICKET_CATEGORIES[0]),false)});
test('category filter distinguishes user selected categories',()=>{const t={category:TICKET_CATEGORIES[0]};assert.equal(matchesCategory(t,t.category),true);assert.equal(matchesCategory(t,TICKET_CATEGORIES[1]),false);assert.equal(categoryLabel(t),t.category)});
