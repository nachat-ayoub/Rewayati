import { browser } from '$app/env';
import { writable } from 'svelte/store';

const defaultValue = '16';
const initialValue = browser
	? window.localStorage.getItem('FontSize') ?? defaultValue
	: defaultValue;

export const FontSize = writable(initialValue);

FontSize.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('FontSize', value);
	}
});

export { FontSize as default };
