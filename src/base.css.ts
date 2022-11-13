import { fontFace, globalStyle as g } from '@vanilla-extract/css'

export const fontPlexSansMedium = fontFace({
	src: `local("IBM Plex Sans"), url("/fonts/IBMPlexSans-Medium.woff2") format("woff2")`,
	fontWeight: 500,
})

export const fontPlexMonoRegular = fontFace({
	src: `local("IBM Plex Sans"), url("/fonts/IBMPlexMono-Regular.woff2") format("woff2")`,
	fontWeight: 400,
})

export const fontPlexMonoBold = fontFace({
	src: `local("IBM Plex Sans"), url("/fonts/IBMPlexMono-Bold.woff2") format("woff2")`,
	fontWeight: 700,
})

g('html', {
	height: '100%',
})

g('body', {
	margin: 0,
	height: '100%',
	// Fixes bold looking fonts on macOS in Chrome & Safari
	WebkitFontSmoothing: 'antialiased',
	// Fixes bold looking fonts on macOS in Firefox
	MozOsxFontSmoothing: 'grayscale',
	lineHeight: 1.4,
	fontFamily: 'inherit',
})

g('blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre', {
	margin: 0,
})

g('ol, ul', {
	listStyle: 'none',
	margin: 0,
	padding: 0,
})

g('h1, h2, h3, h4, h5, h6', {
	fontSize: 'inherit',
	fontWeight: 'inherit',
})

g('a', {
	color: 'inherit',
	textDecoration: 'inherit',
})

g('input', {
	fontFamily: 'inherit',
	fontSize: 'inherit',
	color: 'inherit',
})

g('input::-webkit-input-placeholder', {
	color: 'inherit',
})

g('input::placeholder', {
	color: 'inherit',
	opacity: 'inherit',
})

g('input::-ms-clear', {
	display: 'none',
	width: 0,
	height: 0,
})

// Clears the 'X' from Chrome
g(
	'input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-results-button, input[type="search"]::-webkit-search-results-decoration',
	{
		display: 'none',
	},
)

g('button, textarea, input, select, a', {
	WebkitTapHighlightColor: ['rgba(0, 0, 0, 0)', 'transparent'],
})

g('button', {
	display: 'inline-flex',
	color: 'inherit',
	background: 'none',
	border: 'none',
	fontFamily: 'inherit',
	textAlign: 'inherit',
	fontSize: 'inherit',
	letterSpacing: 'inherit',
	lineHeight: 'inherit',
	padding: 0,
})

g('button:focus', {
	outline: 'none',
})

g('button:enabled', {
	cursor: 'pointer',
})

g('button:disabled', {
	cursor: 'not-allowed',
})

g('img, svg, video, canvas, audio, iframe, embed, object', {
	maxWidth: '100%',
	display: 'block',
	verticalAlign: 'middle',
})

g('svg', {
	fill: 'currentColor',
})