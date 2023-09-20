/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: '#10100e',
				glyph: '#ffffe3',
				'glyph-muted': '#c0c0ab',
				'glyph-more-muted': '#606055',
			},
			fontFamily: {
				comfortaa: ['Comfortaa', 'cursive'],
				lato: ['Lato', 'sans-serif'],
				'roboto-slab': ['Roboto Slab', 'serif']
			}
		}
	},

	plugins: []
};

module.exports = config;
