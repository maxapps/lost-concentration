// Provides an object with methods for creating a limited number of dynamic SVG elements.

const NS = 'http://www.w3.org/2000/svg';

const _shapes = {
	gear: {
		d: 'M 136.198 109.747 L '
				+ '151.802 109.747 L 155.247 132.359 A 42.169 42.169 0 0 1 164.785 136.309 L 183.21 122.757 L 194.243 133.79 '
				+ 'L 180.691 152.215 A 42.169 42.169 0 0 1 184.641 161.753 L 207.253 165.198 L 207.253 180.802 L 184.641 '
				+ '184.247 A 42.169 42.169 0 0 1 180.691 193.785 L 194.243 212.21 L 183.21 223.243 L 164.785 209.691 A '
				+ '42.169 42.169 0 0 1 155.247 213.641 L 151.802 236.253 L 136.198 236.253 L 132.753 213.641 A 42.169 42.169 '
				+ '0 0 1 123.215 209.691 L 104.79 223.243 L 93.757 212.21 L 107.309 193.785 A 42.169 42.169 0 0 1 103.359 '
				+ '184.247 L 80.747 180.802 L 80.747 165.198 L 103.359 161.753 A 42.169 42.169 0 0 1 107.309 152.215 L '
				+ '93.757 133.79 L 104.79 122.757 L 123.215 136.309 A 42.169 42.169 0 0 1 132.753 132.359 Z M 144 151.916 A '
				+ '21.084 21.084 0 0 0 144 194.084 A 21.084 21.084 0 0 0 144 151.916',
		transform: 'matrix(-0.462766, 0.462766, -0.462766, -0.462766, 196.696823, 63.420219)'
	},
	octagon: {
		d: 'M 49.41 12.154 L 80.402 24.992 L 93.24 55.984 L 80.402 86.976 L 49.41 99.814 L 18.418 86.976 L 5.58 55.984 L 18.418 24.992 Z', 
		transform: 'matrix(0.922818, 0.385236, -0.385236, 0.922818, 25.380696, -19.949075)'
	},
	pacman: {
		d: 'M 210 159 A 64.56 64.56 0 1 1 148 112.44 L 148 177 Z',
		transform: 'matrix(0.439285, 0.485113, -0.485113, 0.439285, 72.589096, -99.157387)'
	},
	pentagon: {
		d: 'M 49.41 12.154 L 91.095 42.44 L 75.173 91.443 L 23.647 91.443 L 7.725 42.44 Z'
	},
	reuleaux: {
		d: 'M -49.985 -46.231 Q -21.681 -95.254 6.622 -46.231 L 9.104 -41.933 Q 37.407 7.09 -19.2 7.09 L -24.163 7.09 Q '
				+ '-80.77 7.09 -52.467 -41.933 Z',
		transform: 'matrix(0.999916, -0.012961, -0.012961, -0.999916, 71.650629, 20.080654)'
	},
	ring: {
		d: 'M 148 170 m -45.812 0 a 45.812 45.812 0 1 0 91.624 0 a 45.812 45.812 0 1 0 -91.624 0 Z M 148 170 m -27.487 0 a '
				+ '27.487 27.487 0 0 1 54.974 0 a 27.487 27.487 0 0 1 -54.974 0 Z',
		transform: 'matrix(-0.8, 0.6, -0.6, -0.8, 270.138219, 97.011538)'
	},
	star: {
		d: 'M 144 117.438 L 155.418 150.285 L 190.185 150.994 L 162.474 172.003 L 172.544 205.287 '
			+ 'L 144 185.425 L 115.456 205.287 L 125.526 172.003 L 97.815 150.994 L 132.582 150.285 Z',
		transform: 'matrix(-0.809017, 0.587785, -0.587785, -0.809017, 263.962712, 105.066304)'
	},
	starburst: {
		d: 'M 143 128.566 L 147.837 161.113 L 170.881 137.625 L 155.664 166.799 L 188.112 161.342 L 158.653 176 L 188.112 '
			+ '190.658 L 155.664 185.201 L 170.881 214.375 L 147.837 190.887 L 143 223.434 L 138.163 190.887 L 115.119 '
			+ '214.375 L 130.336 185.201 L 97.888 190.658 L 127.347 176 L 97.888 161.342 L 130.336 166.799 L 115.119 137.625 '
			+ 'L 138.163 161.113 Z',
		transform: 'matrix(-0.999691, 0.024851, -0.024851, -0.999691, 197.639141, 222.989208)'
	},
	triangleDown: {
		d: 'M 94.896 68.713 L 134.007 136.456 L 55.784 136.456 L 94.896 68.713 Z',
		transform: 'matrix(0.512497, 0.858689, -0.858689, 0.512497, 99.925731, -98.45789)'
	},
	triangleUp: {
		d: 'M 94.896 68.713 L 134.007 136.456 L 55.784 136.456 L 94.896 68.713 Z',
		transform: 'matrix(-0.503513, 0.863988, -0.863987, -0.503513, 195.575187, 37.988825)'
	}
}


// _hexToRgb(sColor)
function _hexToRgb(sColor) {
	let iColor = parseInt(sColor, 16);
	let iR = (iColor >> 16) & 255;
	let iG = (iColor >> 8) & 255;
	let iB = iColor & 255;

	return `rgb(${iR}, ${iG}, ${iB})`;
}


// _createSvg(sTag, oAttr)
function _createSvg(sTag, oAttr) {
	let dRet = document.createElementNS(NS, sTag);

	Object.keys(oAttr).forEach(sAttr => dRet.setAttribute(sAttr, oAttr[sAttr]));

	return dRet;
}

export default {

	// shape(sShape, sColor)
	// Creates an HTML SVG element for the specified shape.
	// 		sShape	- String with one of ?? predefined shapes:
	// 							('gear|octagon|pacman|pentagon|reuleaux|ring|star|starburst|triangleDown|triangleUp').
	// 		sColor	- Color for the shape in hex format (i.e. '#FFFFFF').
	// Returns an SVG element.
	shape(sShape, sColor) {
		let dRet = _createSvg('svg', {viewBox:'0 0 100 100'});
		let sRgb = _hexToRgb(sColor.substr(1));
		let oAttr = _shapes[sShape];

		oAttr.style = `fill: ${sRgb};`;
		dRet.appendChild(_createSvg('path', oAttr));

		return dRet;
	}


}