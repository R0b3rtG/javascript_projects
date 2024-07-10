const game = document.querySelector('.game-body');
const minesNum = 10;
let firstTry = true;

let mines = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let i = 0;
while (i < minesNum) {
	let row = Math.floor(Math.random() * 10);
	let col = Math.floor(Math.random() * 10);

	if (mines[row][col] == 0) {
		mines[row][col] = 1;
		i++;
	}
}
console.log(mines);

for (let i = 0; i < 10; i++) {
	const rowEl = document.createElement('div');
	rowEl.classList.add('row');
	for (let j = 0; j < 10; j++) {
		const tile = document.createElement('div');
		tile.setAttribute('data-state', 'hidden');
		tile.setAttribute('data-flag', ' ');
		tile.setAttribute('data-x', `${j}`);
		tile.setAttribute('data-y', `${i}`);
		tile.classList.add('tile');
		rowEl.append(tile);
	}
	game.append(rowEl);
}

function getValue(row, col) {
	let val = 0;

	if (row > 0) val += mines[row - 1][col];
	if (col > 0) val += mines[row][col - 1];
	if (row < 9) val += mines[row + 1][col];
	if (col < 9) val += mines[row][col + 1];
	if (row > 0 && col > 0) val += mines[row - 1][col - 1];
	if (row > 0 && col < 9) val += mines[row - 1][col + 1];
	if (row < 9 && col > 0) val += mines[row + 1][col - 1];
	if (row < 9 && col < 9) val += mines[row + 1][col + 1];

	if (val != 0) return `${val}`;
	else return ' ';
}

const tiles = document.querySelectorAll('.tile');

tiles.forEach((tile) => {
	tile.oncontextmenu = (e) => {
		e.preventDefault();
	};

	tile.onmouseup = (e) => {
		if (e.which == 1) {
			const rowClicked = parseInt(e.target.getAttribute('data-y'));
			const colClicked = parseInt(e.target.getAttribute('data-x'));
			revealTile(rowClicked, colClicked);
		} else {
			if (tile.getAttribute('data-flag') == '`')
				tile.setAttribute('data-flag', ' ');
			else tile.setAttribute('data-flag', '`');
			e.preventDefault();
		}
	};
});

function revealTile(i, j) {
	const rows = [...game.childNodes];
	const row = rows[i + 1];
	const tile = [...row.childNodes][j];

	if (tile.getAttribute('data-flag') != '`') {
		if (firstTry && mines[i][j] == 1) {
			mines[i][j] = 0;

			let newI = Math.floor(Math.random() * 10);
			let newJ = Math.floor(Math.random() * 10);
			while ((newI == i && newJ == j) || mines[newI][newJ] == 1) {
				newI = Math.floor(Math.random() * 10);
				newJ = Math.floor(Math.random() * 10);
			}
			mines[newI][newJ] = 1;
			console.log(mines);
		}

		if (tile.getAttribute('data-state') == 'hidden') {
			tile.style.border = '1px solid #808080';
			tile.setAttribute('data-state', 'opened');
			let val = getValue(i, j);

			if (mines[i][j] == 1) {
				val = '*';
				tile.style.background = '#ff0000';
			}
			tile.setAttribute('data-value', val);

			if (val == ' ') {
				if (i > 0) revealTile(i - 1, j);
				if (j > 0) revealTile(i, j - 1);
				if (i < 9) revealTile(i + 1, j);
				if (j < 9) revealTile(i, j + 1);
				if (i > 0 && j > 0) revealTile(i - 1, j - 1);
				if (i > 0 && j < 9) revealTile(i - 1, j + 1);
				if (i < 9 && j > 0) revealTile(i + 1, j - 1);
				if (i < 9 && j < 9) revealTile(i + 1, j + 1);
			}
		}
		firstTry = false;
	}
}
