/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: '#1C1C1C',
				darkBlue: '#0A2E33',
				darkGreen: '#12492F'
			},
			fontFamily: {
				cairo: ['cairo', 'sans-serif']
			}
		}
	},
	plugins: []
};
