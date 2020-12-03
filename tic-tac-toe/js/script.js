
let model = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let s = true;
let win = false;
let count = 0;
let winX = 0;
let winO = 0;


popupOpen(document.getElementById('popup-5'));// on page load, command selection

/**
 *  x - set 50 in model
 *  o - set 70 in model
 *  0 - free field in model
 */
function draw() {
	for (let i = 0; i < 3; i++) {
		for (let k = 0; k < 3; k++) {
			if (model[i][k] === 50) {
				document.querySelector(`.block[data-i="${i}"][data-k="${k}"]`).innerHTML = '<span class="icon-close"></span>';
			}
			if (model[i][k] === 70) {
				document.querySelector(`.block[data-i="${i}"][data-k="${k}"]`).innerHTML = '<span class="icon-circle-o"></span>';
			}
			if (model[i][k] === 0) {
				document.querySelector(`.block[data-i="${i}"][data-k="${k}"]`).innerHTML = '';
			}
		}
	}
	isWinner();
}

function step() {
	// step gamer
	if (!win) {
		let i = this.getAttribute('data-i');
		let k = this.getAttribute('data-k');
		if (!freeField(i, k)) {
			popupOpen(document.getElementById('popup'));
			return false;
		}

		(s) ? model[i][k] = 50 : model[i][k] = 70;
		s = !s;
		draw();
	}
	else {
		return false;
	}
}

function freeField(i, k) {
	/**
 * define whether the field is empty or not
 */
	if (model[i][k] == 0) return true;
	else return false;
}

function isWinner() {
	// define winner
	console.log(model);
	count++;
	if (model[0][0] + model[0][1] + model[0][2] == 150) {
		win = true;
		showWinner('x');
		return false;
	}
	if (model[0][0] + model[0][1] + model[0][2] === 210) {
		win = true;
		showWinner('0');
		return false;
	}
	if (model[1][0] + model[1][1] + model[1][2] === 150) {
		win = true;
		showWinner('x');
		return false;
	}
	if (model[1][0] + model[1][1] + model[1][2] === 210) {
		win = true;
		showWinner('0');
		return false;
	}
	if (model[2][0] + model[2][1] + model[2][2] === 150) {
		win = true;
		showWinner('x');
		return false;
	}
	if (model[2][0] + model[2][1] + model[2][2] === 210) {
		win = true;
		showWinner('0');
		return false;
	}
	if (model[0][0] + model[1][0] + model[2][0] === 150) {
		win = true;
		showWinner('x');
		return false;
	}
	if (model[0][0] + model[1][0] + model[2][0] === 210) {
		win = true;
		showWinner('0');
		return false;
	}
	if (model[0][1] + model[1][1] + model[2][1] === 150) {
		win = true;
		showWinner('x');
		return false;
	}
	if (model[0][1] + model[1][1] + model[2][1] === 210) {
		win = true;
		showWinner('0');
		return false;
	}
	if (model[0][2] + model[1][2] + model[2][2] === 150) {
		win = true;
		showWinner('x');
		return false;
	}
	if (model[0][2] + model[1][2] + model[2][2] === 210) {
		win = true;
		showWinner('0');
		return false;
	}
	if (model[0][0] + model[1][1] + model[2][2] === 150) {
		win = true;
		showWinner('x');
		return false;
	}
	if (model[0][0] + model[1][1] + model[2][2] === 210) {
		win = true;
		showWinner('0');
		return false;
	}
	if (model[0][2] + model[1][1] + model[2][0] === 150) {
		win = true;
		showWinner('x');
		return false;
	}
	if (model[0][2] + model[1][1] + model[2][0] === 210) {
		win = true;
		showWinner('0');
		return false;
	}
	if (count == 9) {
		win = true;
		popupOpen(document.getElementById('popup-3'));
		refreshGame();
	}
}

function showWinner(a) {
	if (a === 'x') winX++;
	else if (a === '0') winO++;
	document.querySelector('.winX').innerHTML = 'Wins X:' + winX;
	document.querySelector('.winO').innerHTML = 'Wins O:' + winO;
	document.querySelector('#popup-2 .popup__title').innerHTML = a + ' is winner';
	popupOpen(document.getElementById('popup-2'));
}

function refreshGame() {
	model = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	count = 0;
	win = !win;
	draw();
	popupOpen(document.getElementById('popup-5'));
}

function selectTeams() {
	let dataSelect = this.getAttribute('data-selection');
	if (dataSelect === 'true') {
		s = true;
	}
	else {
		s = false;
	}
	popupClose(document.getElementById('popup-5'), false);
	popupClose(document.getElementById('popup-3'), false);
}

document.querySelectorAll('.block').forEach(elem => {
	elem.onclick = step;
})


document.querySelectorAll('.btn__repeat').forEach(elem => {
	elem.onclick = refreshGame;
});

document.querySelectorAll('.selectionX').forEach(elem => {
	elem.onclick = selectTeams;
})

document.querySelectorAll('.selectionO').forEach(elem => {
	elem.onclick = selectTeams;
})



