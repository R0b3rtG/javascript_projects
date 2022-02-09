const grid = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];

const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';

cells.forEach((cell) => {
	cell.addEventListener('click', (e) => {
		if (e.target.classList.contains('cell')) {
			if (e.target.innerHTML == '') {
				if (currentPlayer == 'X') doTurn('X', e.target);
				else doTurn('O', e.target);
			}
		}
	});
});

function doTurn(current, cell) {
	cell.innerHTML = `<span class="${current}">${current}</span>`;
	const line = cell.id[0];
	const column = cell.id[2];
	grid[line][column] = current;
	currentPlayer = current == 'X' ? 'O' : 'X';
	if (checkWin()) alert('you won');
}

function checkWin() {
	let win = false;
	if (grid[0][0] == grid[0][1] && grid[0][1] == grid[0][2] && grid[0][0] != '')
		win = true;
	if (grid[1][0] == grid[1][1] && grid[1][1] == grid[1][2] && grid[1][0] != '')
		win = true;
	if (grid[2][0] == grid[2][1] && grid[2][1] == grid[2][2] && grid[2][0] != '')
		win = true;
	if (grid[0][0] == grid[1][0] && grid[1][0] == grid[2][0] && grid[0][0] != '')
		win = true;
	if (grid[0][1] == grid[1][1] && grid[1][1] == grid[2][1] && grid[0][1] != '')
		win = true;
	if (grid[0][2] == grid[1][2] && grid[1][2] == grid[2][2] && grid[0][2] != '')
		win = true;
	if (grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] && grid[0][0] != '')
		win = true;
	if (grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0] && grid[0][2] != '')
		win = true;
	return win;
}
