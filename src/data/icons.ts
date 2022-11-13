export type ViewBox = [number, number, number, number]

export type Icon = {
	viewBox: ViewBox
	content: string
}

function createIcon(icon: Icon): Icon {
	return icon
}

export default {
	logoLacy: createIcon({
		viewBox: [0, 0, 222.67, 76.9],
		content:
			'<path d="M42.2 52.6h-19v-46h7.5V0H0v6.6h7v46.6H0v6.6h53.8V39.2H42.2v13.4zm64-28.6c0-5.67-1.73-10.03-5.2-13.1-3.47-3.13-8.83-4.7-16.1-4.7-3.6 0-6.8.37-9.6 1.1-2.73.73-5.03 1.7-6.9 2.9a12.63 12.63 0 0 0-4.2 4.2 8.93 8.93 0 0 0-1.4 4.7c0 2.13.67 3.9 2 5.3s3 2.1 5 2.1c2.53 0 4.43-.67 5.7-2a7.33 7.33 0 0 0 1.9-5.1 5.6 5.6 0 0 0-1-3.5 5.3 5.3 0 0 0-1.9-1.8v-.5c.83-.36 1.7-.63 2.6-.8 1-.2 2.2-.3 3.6-.3 3.8 0 6.47 1.03 8 3.1s2.3 5.13 2.3 9.2v5.7h-7c-15.27 0-22.9 5.17-22.9 15.5 0 4.73 1.27 8.43 3.8 11.1 2.6 2.6 6.73 3.9 12.4 3.9 2.27 0 4.2-.27 5.8-.8a12.6 12.6 0 0 0 6.7-5 17.8 17.8 0 0 0 1.8-3.3h.6v.2c0 2.53.73 4.67 2.2 6.4 1.53 1.67 4.13 2.5 7.8 2.5 1.93 0 3.8-.2 5.6-.6a13.4 13.4 0 0 0 4.4-1.5v-5.7h-6V24zM91 44.4c0 2.8-.73 4.77-2.2 5.9-1.4 1.13-3.33 1.7-5.8 1.7-2.07 0-3.73-.5-5-1.5s-1.9-2.57-1.9-4.7v-1.6c0-2.47.77-4.37 2.3-5.7 1.6-1.33 4-2 7.2-2H91v7.9zm71.37 1.5-5.6-3.3c-1 2.42-2.62 4.52-4.7 6.1-2.2 1.73-5.17 2.6-8.9 2.6-3.67 0-6.54-1.13-8.6-3.4-2.07-2.33-3.1-5.7-3.1-10.1V27.4c0-4.8 1.13-8.47 3.4-11 2.26-2.6 5.43-3.9 9.5-3.9 1.53 0 2.73.1 3.6.3.93.2 1.73.4 2.4.6v.6a9.01 9.01 0 0 0-3.1 2.5 6.87 6.87 0 0 0-1.3 4.3 7 7 0 0 0 2 5.2c1.33 1.27 3.23 1.9 5.7 1.9 2.46 0 4.4-.73 5.8-2.2 1.4-1.53 2.1-3.57 2.1-6.1 0-3.87-1.67-7.07-5-9.6-3.27-2.53-7.97-3.8-14.1-3.8-3.8 0-7.37.6-10.7 1.8a24.83 24.83 0 0 0-8.6 5.3c-2.4 2.33-4.3 5.2-5.7 8.6-1.4 3.33-2.1 7.2-2.1 11.6 0 3.93.53 7.57 1.6 10.9a25.86 25.86 0 0 0 4.9 8.7c2.2 2.47 4.86 4.4 8 5.8 3.2 1.4 6.9 2.1 11.1 2.1 3.2 0 6-.47 8.4-1.4s4.46-2.13 6.2-3.6a19.37 19.37 0 0 0 4.2-4.9c1.13-1.8 2-3.53 2.6-5.2z" /><path d="M204.27 7.4V14h5.6l-10.71 21.07h-.6L188.16 14h5.6V7.4h-26.3V14h4.8l18.4 37.07-4.15 8.5c-4.24 8.3-8.67 12.21-13.3 11.73l-1.54-.16c-.4-.05-.78-.18-1.13-.38l.06-.51a5.27 5.27 0 0 0 2.02-2 6.13 6.13 0 0 0 1.25-3.25 7.78 7.78 0 0 0-1.49-5.74c-1.13-1.58-2.9-2.5-5.3-2.75-2.56-.27-4.65.25-6.26 1.55-1.53 1.4-2.43 3.43-2.71 6.09-.33 3.17.55 5.94 2.64 8.33 2.18 2.39 5.58 3.82 10.2 4.3 2.84.3 5.37.04 7.62-.77 2.23-.72 4.3-1.87 6.07-3.4a22.56 22.56 0 0 0 4.19-4.27l.01.01c5.92-6.2 28.71-52.4 29.13-54.35h4.7V7.4h-18.4z" />',
	}),
	i18n: createIcon({
		viewBox: [0, 0, 24, 24],
		content:
			'<path d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path>',
	}),
	palette: createIcon({
		viewBox: [0, 0, 24, 24],
		content:
			'<path d="M12 2c5.522 0 10 3.978 10 8.889a5.558 5.558 0 0 1-5.556 5.555h-1.966c-.922 0-1.667.745-1.667 1.667 0 .422.167.811.422 1.1.267.3.434.689.434 1.122C13.667 21.256 12.9 22 12 22 6.478 22 2 17.522 2 12S6.478 2 12 2zm-1.189 16.111a3.664 3.664 0 0 1 3.667-3.667h1.966A3.558 3.558 0 0 0 20 10.89C20 7.139 16.468 4 12 4a8 8 0 0 0-.676 15.972 3.648 3.648 0 0 1-.513-1.86zM7.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>',
	}),
	close: createIcon({
		viewBox: [0, 0, 24, 24],
		content:
			'<path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>',
	}),
	add: createIcon({
		viewBox: [0, 0, 24, 24],
		content: '<path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>',
	}),
}