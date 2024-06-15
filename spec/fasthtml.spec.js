import { $, $$, $E } from '../fasthtml.js';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><body>
  <div class="test-class">Test Element 1</div>
  <div class="test-class">Test Element 2</div>
</body>`);

global.document = dom.window.document;

describe('fasthtml library tests', () => {
    it('$ should find the first matching element', () => {
        expect($('.test-class').textContent).toBe('Test Element 1');
        expect($('.non-existent-class')).toBeNull();
    });

    it('$$ should find all matching team elements', () => {
        expect($$('.test-class').length).toBe(2);
        expect($$('.non-existent-class').length).toBe(0);
    });

    it('$E should create an element with properties and children', () => {
        const newElement = $E('div', { id: 'new-div', className: 'new-class', dataset: { example: 'data' } }, [
            document.createTextNode('This is a new element')
        ]);
        expect(newElement.id).toBe('new-div');
        expect(newElement.className).toBe('new-class');
        expect(newElement.dataset.example).toBe('data');
        expect(newElement.textContent).toBe('This is a new element');
    });

    it('$E should handle edge cases', () => {
        const emptyElement = $E();
        expect(emptyElement.tagName.toLowerCase()).toBe('div');
        expect(emptyElement.children.length).toBe(0);
        expect(Object.keys(emptyElement.dataset).length).toBe(0);
        const elementWithPropsOnly = $E('span', { id: 'span-id' });
        expect(elementWithPropsOnly.tagName.toLowerCase()).toBe('span');
        expect(elementWithPropsOnly.id).toBe('span-id');
        expect(elementWithPropsOnly.children.length).toBe(0);
    });
});

