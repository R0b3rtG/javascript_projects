const grid = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];

const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';

const startGameModal = document.querySelector('.start-game-modal');
const game = document.querySelector('.game');
const endGameModal = document.querySelector('.end-game-modal');

const scoreP1Name = document.querySelector('.score-p1-name');
const scoreP2Name = document.querySelector('.score-p2-name');
const scoreP1Value = document.querySelector('.score-p1-value');
const scoreP2Value = document.querySelector('.score-p2-value');

const p1Input = document.querySelector('.p1-input');
const p2Input = document.querySelector('.p2-input');

const playBtn = document.querySelector('.play-btn');

let player1Name;
let player2Name;

playBtn.addEventListener('click', (e) => {
	e.preventDefault();

	player1Name = `${p1Input.value} (X)`;
	player2Name = `${p2Input.value} (O)`;
	startGame();
});

const currentPlayerDisplay = document.querySelector('.current-player');

function startGame() {
	let p1Score = 0;
	let p2Score = 0;
	const checkBox = document.querySelector('.rotation-toggle input');
	const root = document.documentElement;
	if (checkBox.checked) {
		root.style.setProperty('--rotation-degrees', '180deg');
	} else {
		root.style.setProperty('--rotation-degrees', '0');
	}
	scoreP1Value.textContent = p1Score;
	scoreP2Value.textContent = p2Score;
	let currentPlayerName = player1Name;
	currentPlayerDisplay.textContent = player1Name;
	currentPlayerDisplay.classList.add('display-x-color');
	scoreP1Name.textContent = player1Name;
	scoreP2Name.textContent = player2Name;
	startGameModal.classList.add('hidden');
	game.classList.remove('hidden');

	let cellsOccupied = 0;
	cells.forEach((cell) => {
		cell.addEventListener('click', (e) => {
			if (e.target.classList.contains('cell')) {
				if (e.target.innerHTML == '') {
					e.target.classList.add('occupied');
					cellsOccupied++;
					doTurn(currentPlayer, e.target, cellsOccupied);
				}
			}
		});
	});

	function doTurn(current, cell, cellsOccupied) {
		document.body.classList.toggle('rotate');
		currentPlayerName = current == 'X' ? player2Name : player1Name;
		currentPlayerDisplay.textContent = currentPlayerName;
		currentPlayerDisplay.classList.toggle('display-x-color');
		const sign = document.createElement('span');
		sign.classList.add(current);
		sign.textContent = current;
		cell.append(sign);
		const line = cell.id[0];
		const column = cell.id[2];
		grid[line][column] = current;
		currentPlayer = current == 'X' ? 'O' : 'X';
		const gameState = checkWin(cellsOccupied).gameState;
		const winner = checkWin(cellsOccupied).winner;
		if (gameState == 'won') {
			document.body.classList.remove('rotate');
			updateScore(winner);
			formatEndScreen(gameState, winner);
			endGameModal.classList.remove('hidden');
			const soundEffect = new Audio('./sounds/success.mp3');
			soundEffect.volume = 0.2;
			soundEffect.play();
		} else if (gameState == 'tie') {
			document.body.classList.remove('rotate');
			formatEndScreen(gameState, winner);
			endGameModal.classList.remove('hidden');
			const soundEffect = new Audio('./sounds/wah-wah.mp3');
			soundEffect.playbackRate = 1.6;
			soundEffect.volume = 0.2;
			soundEffect.play();
		}
	}

	function updateScore(winner) {
		if (winner == 'X') {
			p1Score++;
			scoreP1Value.textContent = p1Score;
		} else if (winner == 'O') {
			p2Score++;
			scoreP2Value.textContent = p2Score;
		}
	}

	function formatEndScreen(gameState, winner) {
		const title = document.createElement('h2');
		title.classList.add('title');
		if (gameState == 'won') {
			let endMessage = `<span class="winner-${winner}">${
				winner == 'X' ? player1Name : player2Name
			}</span><br> won the game!`;
			title.innerHTML = endMessage;
		} else {
			title.textContent = "It's a tie!";
		}
		endGameModal.append(title);

		const replayBtn = document.createElement('button');
		replayBtn.classList.add('end-btn');
		replayBtn.classList.add('replay-btn');
		replayBtn.textContent = 'Replay';

		const resetBtn = document.createElement('button');
		resetBtn.classList.add('end-btn');
		resetBtn.classList.add('reset-btn');
		resetBtn.textContent = 'Reset';

		const endButtons = document.createElement('div');
		endButtons.classList.add('end-buttons');
		endButtons.append(replayBtn);
		endButtons.append(resetBtn);
		endGameModal.append(endButtons);

		const replayBtnForEvent = document.querySelector('.replay-btn');
		replayBtnForEvent.addEventListener('click', () => {
			endGameModal.classList.add('hidden');
			restartGame();
		});

		const resetBtnForEvent = document.querySelector('.reset-btn');
		resetBtnForEvent.addEventListener('click', () => {
			endGameModal.classList.add('hidden');
			game.classList.add('hidden');
			startGameModal.classList.remove('hidden');
			restartGame();
			p1Input.value = 'Player1';
			p2Input.value = 'Player2';
			p1Score = 0;
			p2Score = 0;
			scoreP1Value.textContent = p1Score;
			scoreP2Value.textContent = p2Score;
		});

		function restartGame() {
			for (let i = 0; i < grid.length; i++) {
				for (let j = 0; j < grid[i].length; j++) {
					grid[i][j] = '';
				}
			}
			cells.forEach((cell) => {
				cell.textContent = '';
			});
			cellsOccupied = 0;
			currentPlayer = 'X';
			currentPlayerDisplay.textContent = player1Name;
			currentPlayerDisplay.classList.add('display-x-color');
			endGameModal.textContent = '';
		}
	}

	function checkWin(cellsOccupied) {
		if (
			grid[0][0] == grid[0][1] &&
			grid[0][1] == grid[0][2] &&
			grid[0][0] != ''
		) {
			return { gameState: 'won', winner: grid[0][0] == 'X' ? 'X' : 'O' };
		}
		if (
			grid[1][0] == grid[1][1] &&
			grid[1][1] == grid[1][2] &&
			grid[1][0] != ''
		) {
			return { gameState: 'won', winner: grid[1][0] == 'X' ? 'X' : 'O' };
		}
		if (
			grid[2][0] == grid[2][1] &&
			grid[2][1] == grid[2][2] &&
			grid[2][0] != ''
		) {
			return { gameState: 'won', winner: grid[2][0] == 'X' ? 'X' : 'O' };
		}
		if (
			grid[0][0] == grid[1][0] &&
			grid[1][0] == grid[2][0] &&
			grid[0][0] != ''
		) {
			return { gameState: 'won', winner: grid[0][0] == 'X' ? 'X' : 'O' };
		}
		if (
			grid[0][1] == grid[1][1] &&
			grid[1][1] == grid[2][1] &&
			grid[0][1] != ''
		) {
			return { gameState: 'won', winner: grid[0][1] == 'X' ? 'X' : 'O' };
		}
		if (
			grid[0][2] == grid[1][2] &&
			grid[1][2] == grid[2][2] &&
			grid[0][2] != ''
		) {
			return { gameState: 'won', winner: grid[0][2] == 'X' ? 'X' : 'O' };
		}
		if (
			grid[0][0] == grid[1][1] &&
			grid[1][1] == grid[2][2] &&
			grid[0][0] != ''
		) {
			return { gameState: 'won', winner: grid[0][0] == 'X' ? 'X' : 'O' };
		}
		if (
			grid[0][2] == grid[1][1] &&
			grid[1][1] == grid[2][0] &&
			grid[0][2] != ''
		) {
			return { gameState: 'won', winner: grid[0][2] == 'X' ? 'X' : 'O' };
		}
		if (cellsOccupied == 9) {
			return { gameState: 'tie', winner: null };
		}

		return { gameState: null, winner: null };
	}
}
