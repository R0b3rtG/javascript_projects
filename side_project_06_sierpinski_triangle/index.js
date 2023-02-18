const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

if (innerHeight < innerWidth) {
	canvas.height = innerHeight - 4;
	canvas.width = innerHeight - 4;
} else {
	canvas.height = innerWidth - 4;
	canvas.width = innerWidth - 4;
}

const btn = document.querySelector('.btn');

let points = [
	{ x: canvas.clientWidth / 2, y: canvas.clientHeight / 4 },
	{ x: canvas.clientWidth / 4, y: (canvas.clientHeight * 3) / 4 },
	{ x: (canvas.clientWidth * 3) / 4, y: (canvas.clientHeight * 3) / 4 },
];

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
for (let point of points) {
	ctx.fillStyle = '#fff';
	ctx.fillRect(point.x, point.y, 2, 2);
}

btn.addEventListener('click', () => {
	let distX = (points[0].x - points[1].x) / 2;
	let distY = (points[0].y - points[1].y) / 2;

	let newX = points[0].x - distX;
	let newY = points[0].y - distY;
	let currentPoint = { x: newX, y: newY };

	ctx.fillStyle = '#fff';
	ctx.fillRect(currentPoint.x, currentPoint.y, 1, 1);

	let lastPoint = { ...currentPoint };

	let dotsCount = 10000;

	let myInterval = setInterval(() => {
		dotsCount--;
		if (dotsCount <= 0) clearInterval(myInterval);

		p = Math.floor(Math.random() * 3);

		distX = (points[p].x - lastPoint.x) / 2;
		distY = (points[p].y - lastPoint.y) / 2;

		newX = points[p].x - distX;
		newY = points[p].y - distY;
		currentPoint = { x: newX, y: newY };

		ctx.fillStyle = '#fff';
		ctx.fillRect(lastPoint.x, lastPoint.y, 1, 1);

		lastPoint = { ...currentPoint };
	}, 1);
});
