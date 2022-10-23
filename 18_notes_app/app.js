class Note {
	constructor(title, content, color, id) {
		this._title = title;
		this._content = content;
		this._color = color;
		this._id = id;
	}
}

function rgbToHex(color) {
	color = '' + color;
	if (!color || color.indexOf('rgb') < 0) {
		return;
	}

	if (color.charAt(0) == '#') {
		return color;
	}

	let nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
		r = parseInt(nums[2], 10).toString(16),
		g = parseInt(nums[3], 10).toString(16),
		b = parseInt(nums[4], 10).toString(16);

	return (
		'#' +
		((r.length == 1 ? '0' + r : r) +
			(g.length == 1 ? '0' + g : g) +
			(b.length == 1 ? '0' + b : b))
	);
}

let notes = [];

const notesContainer = document.querySelector('.container');

function addToUI(noteToAdd) {
	let newDiv = document.createElement('div');
	newDiv.classList.add('note');
	newDiv.setAttribute('id', noteToAdd._id);
	let newBorder = document.createElement('div');
	newBorder.classList.add('upper-color');
	newBorder.style.backgroundColor = noteToAdd._color;
	newDiv.appendChild(newBorder);
	let newTitle = document.createElement('h2');
	newTitle.classList.add('UI-note-title');
	newTitle.innerText = noteToAdd._title;
	newDiv.appendChild(newTitle);
	let newFlex = document.createElement('div');
	newFlex.classList.add('p-flex');
	let newContent = document.createElement('p');
	newContent.classList.add('content');
	newContent.innerText = noteToAdd._content;
	newFlex.appendChild(newContent);
	let newOptions = document.createElement('div');
	newOptions.classList.add('options');
	let newDelete = document.createElement('i');
	newDelete.classList.add('fas');
	newDelete.classList.add('fa-trash-alt');
	newOptions.appendChild(newDelete);
	let newCheck = document.createElement('i');
	newCheck.classList.add('far');
	newCheck.classList.add('fa-eye');
	newOptions.appendChild(newCheck);
	newFlex.appendChild(newOptions);
	newDiv.appendChild(newFlex);
	notesContainer.appendChild(newDiv);
}

const addBtn = document.querySelector('.fa-plus-square');
const promptDiv = document.querySelector('.input-prompt');
const backtThing = document.querySelector('.back-thing');
const body = document.querySelector('body');

let isSelected = false;
let selectedColor = '';

// Show Input Prompt
addBtn.addEventListener('click', onAddNote);
function onAddNote() {
	if (promptDiv.style.display === 'none') {
		promptDiv.style.display = 'block';
	}
	if (backtThing.style.display === 'none') {
		backtThing.style.display = 'block';
	}
}

const titleInput = document.querySelector('#note-title-q');
const textArea = document.querySelector('#note-text');
const hexInput = document.querySelector('#hex-color');

const colorsDiv = document.querySelector('.colors');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const choose = document.querySelector('.choose');

// Color Picker
function selectHexInput() {
	hexInput.removeAttribute('readonly');
	hexInput.select();
	if (hexInput.value == '') hexInput.value = '#';
	selectedColor = 'choose';
}

hexInput.addEventListener('click', onHexClick);
function onHexClick() {
	for (let i = 0; i < colorsDiv.children.length; i++) {
		colorsDiv.children[i].classList.remove('selected');
		isSelected = true;
	}
	choose.classList.add('selected');
	selectHexInput();
}

colorsDiv.addEventListener('click', onSelectColor);
function onSelectColor(e) {
	if (e.target.classList.contains('color')) {
		for (let i = 0; i < colorsDiv.children.length; i++) {
			colorsDiv.children[i].classList.remove('selected');
			isSelected = true;
		}
		e.target.classList.add('selected');

		if (e.target.classList.contains('choose')) {
			selectHexInput();
		} else {
			hexInput.setAttribute('readonly', 'true');
			hexInput.value = '';
			selectedColor = e.target.style.backgroundColor;
		}
	}
}

const createBtn = document.querySelector('.submit-btn');
const cancelBtn = document.querySelector('.cancel-btn');

let hexWithThree = /^#[0-9a-fA-F]{3}/;
let hexWithSix = /^#[0-9a-fA-F]{6}/;

// Create and Cancle Buttons
createBtn.addEventListener('click', onCreateNote);
function onCreateNote(e) {
	let hexCode = hexInput.value;
	let noteTitle = titleInput.value;
	let noteText = textArea.value;
	hexInput.style.border = '1px solid #aaa';
	titleInput.style.border = '1px solid #aaa';
	textArea.style.border = '1px solid #aaa';

	if (noteTitle != '' && noteText != '') {
		if (isSelected == true) {
			if (selectedColor == 'choose') {
				if (
					(hexWithThree.test(hexCode) && hexCode.length === 4) ||
					hexWithSix.test(hexCode)
				) {
					selectedColor = hexCode;
					createNote(selectedColor, noteTitle, noteText);
				} else {
					hexInput.style.border = '2px solid #f00';
				}
			} else {
				createNote(selectedColor, noteTitle, noteText);
			}
		} else {
			flashColors();
		}
	} else {
		if (noteTitle == '') {
			titleInput.style.border = '2px solid #f00';
		}
		if (noteText == '') {
			textArea.style.border = '2px solid #f00';
		}
	}

	e.preventDefault();
}

cancelBtn.addEventListener('click', onCancelCreate);
function onCancelCreate(e) {
	reset();
	promptDiv.style.display = 'none';
	backtThing.style.display = 'none';

	e.preventDefault();
}

function flashColors() {
	setTimeout(() => {
		flashCycle();
		setTimeout(() => {
			flashCycle();
			setTimeout(() => {
				flashCycle();
				setTimeout(() => {
					flashCycle();
				}, 200);
			}, 200);
		}, 200);
	}, 200);

	function flashCycle() {
		red.classList.toggle('selected');
		blue.classList.toggle('selected');
		green.classList.toggle('selected');
		yellow.classList.toggle('selected');
		choose.classList.toggle('selected');
	}
}

function reset() {
	titleInput.value = '';
	hexInput.value = '';
	textArea.value = '';
	hexInput.setAttribute('readonly', 'true');
	red.classList.remove('selected');
	blue.classList.remove('selected');
	green.classList.remove('selected');
	yellow.classList.remove('selected');
	choose.classList.remove('selected');
	hexInput.style.border = '1px solid #aaa';
	titleInput.style.border = '1px solid #aaa';
	textArea.style.border = '1px solid #aaa';
	isSelected = false;
	selectedColor = '';
}

(function () {
	reset();
	getNotes();
	if (localStorage.getItem('notes') == null) {
		notes = [];
	} else {
		notes = JSON.parse(localStorage.getItem('notes'));
	}
})();

function createNote(selectedColor, noteTitle, noteText) {
	let lastIndexHere;
	lastIndexHere = notes.length === 0 ? 0 : notes[notes.length - 1]._id + 1;
	let gen = generateId(lastIndexHere);
	let newNote = new Note(noteTitle, noteText, selectedColor, gen.next().value);
	pushToLocalStorage(newNote);
	addToUI(newNote);

	reset();
	promptDiv.style.display = 'none';
	backtThing.style.display = 'none';
}

function pushToLocalStorage(newNote) {
	if (localStorage.getItem('notes') == null) {
		notes = [];
		notes.push(newNote);
		localStorage.setItem('notes', JSON.stringify(notes));
	} else {
		notes = JSON.parse(localStorage.getItem('notes'));
		notes.push(newNote);
		localStorage.setItem('notes', JSON.stringify(notes));
	}
}

function getNotes() {
	if (localStorage.getItem('notes') != null) {
		let arr = JSON.parse(localStorage.getItem('notes'));
		arr.forEach((currNote) => {
			addToUI(currNote);
		});
	}
}

function* generateId(lastIndex) {
	let i = lastIndex;
	while (true) {
		yield i++;
	}
}

const deleteBackground = document.querySelector('.back-thing-delete');
const deletePrompt = document.querySelector('.delete-prompt');

const deletePromptButtons = document.querySelector('.delete-prompt-buttons');

notesContainer.addEventListener('click', onDeleteNote);
function onDeleteNote(e) {
	if (e.target.classList.contains('fa-trash-alt')) {
		let noteToDelete = e.target.parentElement.parentElement.parentElement;
		let noteToDeleteId = parseInt(noteToDelete.id);

		deleteBackground.style.display = 'block';
		deletePromptButtons.addEventListener('click', onCancelOrConfirmDelete, {
			once: true,
		});
		function onCancelOrConfirmDelete(e) {
			if (e.target.classList.contains('cancel-delete-btn')) {
				cancelDelete();
				return;
			}

			if (e.target.classList.contains('confirm-delete-btn')) {
				confirmDelete(e);
				return;
			}

			deletePromptButtons.addEventListener('click', onCancelOrConfirmDelete, {
				once: true,
			});
		}

		function cancelDelete() {
			deleteBackground.style.display = 'none';
		}

		function confirmDelete() {
			noteToDelete.remove();
			if (localStorage.getItem('notes') == null) {
				notes = [];
			} else {
				notes = JSON.parse(localStorage.getItem('notes'));
			}
			for (let i = 0; i < notes.length; i++) {
				if (notes[i]._id == noteToDeleteId) {
					notes.splice(i, 1);
				}
			}
			localStorage.setItem('notes', JSON.stringify(notes));
			deleteBackground.style.display = 'none';
		}
	}
}

const viewTitle = document.querySelector('#note-title-q-view');
const viewContent = document.querySelector('#note-text-view');
const backThingView = document.querySelector('.back-thing-view');
const viewEdit = document.querySelector('.view-edit');

let titleToShow;
let contentToShow;
let colorToShow;
let idToUse;

const buttonsView = document.querySelector('.buttons-view');
const buttonsEdit = document.querySelector('.buttons-edit');

const colorsTitle = document.querySelector('.colors-label');
const colorsList = document.querySelector('.colors-view');
const hexCodeView = document.querySelector('#hex-color-view');

const viewColorsDiv = document.querySelector('.colors-view');
const redView = document.querySelector('.red-view');
const blueView = document.querySelector('.blue-view');
const greenView = document.querySelector('.green-view');
const yellowView = document.querySelector('.yellow-view');
const chooseView = document.querySelector('.choose-view');

let noteToShow;
notesContainer.addEventListener('click', onViewNote);
function onViewNote(e) {
	if (e.target.classList.contains('fa-eye')) {
		redView.classList.remove('selected');
		blueView.classList.remove('selected');
		greenView.classList.remove('selected');
		yellowView.classList.remove('selected');
		chooseView.classList.remove('selected');
		hexCodeView.value = '';
		noteToShow = e.target.parentElement.parentElement.parentElement;
		if (localStorage.getItem('notes') == null) {
			notes = [];
		} else {
			notes = JSON.parse(localStorage.getItem('notes'));
		}
		for (let i = 0; i < notes.length; i++) {
			if (notes[i]._id == noteToShow.id) {
				titleToShow = notes[i]._title;
				contentToShow = notes[i]._content;
				colorToShow = notes[i]._color;
				idToUse = notes[i]._id;
			}
		}
		viewTitle.value = titleToShow;
		viewContent.value = contentToShow;
		viewEdit.style.borderColor = colorToShow;
		backThingView.style.display = 'block';
		viewEdit.style.display = 'block';
		viewEdit.classList.add('nice-view');

		buttonsView.addEventListener('click', onEditOrBack, { once: true });
		function onEditOrBack(e) {
			if (e.target.classList.contains('back-btn')) {
				closeViewNote(e);
				return;
			}

			if (
				e.target.classList.contains('edit-btn') ||
				e.target.parentElement.classList.contains('edit-btn')
			) {
				openEditPrompt(e);
				return;
			}

			buttonsView.addEventListener('click', onEditOrBack, { once: true });
		}

		function closeViewNote(e) {
			viewEdit.classList.remove('nice-view');
			backThingView.style.display = 'none';
			viewEdit.style.display = 'none';
			colorsTitle.style.display = 'none';
			colorsList.style.display = 'none';
			hexCodeView.style.display = 'none';

			e.preventDefault();
		}

		function openEditPrompt(e) {
			viewEdit.classList.remove('nice-view');
			let colorCode = notes[noteToShow.id]._color;
			let rgbColor = rgbToHex(colorCode);
			for (let j = 0; j < viewColorsDiv.children.length; j++) {
				viewColorsDiv.children[j].classList.remove('selected');
				isSelected = true;
			}
			if (rgbColor == undefined) {
				hexCodeView.value = colorCode;
				viewColorsDiv.children[4].classList.add('selected');
			} else {
				for (let j = 0; j < viewColorsDiv.children.length; j++) {
					if (viewColorsDiv.children[j].style.backgroundColor == colorCode)
						viewColorsDiv.children[j].classList.add('selected');
				}
			}

			buttonsView.style.display = 'none';
			buttonsEdit.style.display = 'grid';
			viewTitle.removeAttribute('readonly');
			viewContent.removeAttribute('readonly');
			colorsTitle.style.display = 'block';
			colorsList.style.display = 'flex';
			hexCodeView.style.display = 'block';

			buttonsEdit.addEventListener('click', onSaveOrCancelEdit, { once: true });
			function onSaveOrCancelEdit(e) {
				if (e.target.classList.contains('save-btn')) saveEdit(e);

				if (e.target.classList.contains('cancel-edit-btn')) cancelEdit(e);
			}

			function cancelEdit(e) {
				buttonsView.addEventListener('click', onEditOrBack, { once: true });
				viewEdit.classList.add('nice-view');

				viewTitle.setAttribute('readonly', 'true');
				viewContent.setAttribute('readonly', 'true');
				colorsTitle.style.display = 'none';
				colorsList.style.display = 'none';
				hexCodeView.style.display = 'none';
				buttonsView.style.display = 'grid';
				buttonsEdit.style.display = 'none';
				isSelected = false;
				selectedColor = '';
				viewTitle.style.border = '1px solid #aaa';
				hexCodeView.style.border = '1px solid #aaa';
				viewContent.style.border = '1px solid #aaa';
				redView.classList.remove('selected');
				blueView.classList.remove('selected');
				greenView.classList.remove('selected');
				yellowView.classList.remove('selected');
				chooseView.classList.remove('selected');
				hexCodeView.value = '';

				if (localStorage.getItem('notes') == null) {
					notes = [];
				} else {
					notes = JSON.parse(localStorage.getItem('notes'));
				}
				for (let index = 0; index < notes.length; index++) {
					if (notes[index]._id == noteToShow.id) {
						titleToShow = notes[index]._title;
						contentToShow = notes[index]._content;
						colorToShow = notes[index]._color;
						idToUse = notes[index]._id;
					}
				}
				viewTitle.value = titleToShow;
				viewContent.value = contentToShow;

				e.preventDefault();
			}

			function saveEdit(e) {
				viewTitle.style.border = '1px solid #aaa';
				hexCodeView.style.border = '1px solid #aaa';
				viewContent.style.border = '1px solid #aaa';

				let ok = true;

				if (titleToShow != viewTitle.value) {
					if (viewTitle.value == '') {
						viewTitle.style.border = '2px solid #f00';
						ok = false;
					} else {
						titleToShow = viewTitle.value;
					}
				}
				if (contentToShow != viewContent.value) {
					if (viewContent.value == '') {
						viewContent.style.border = '2px solid #f00';
						ok = false;
					} else {
						contentToShow = viewContent.value;
					}
				}
				if (isSelected == true) {
					if (selectedColor == 'choose') {
						if (
							(hexWithThree.test(hexCodeView.value) &&
								hexCodeView.value.length === 4) ||
							re2.test(hexCodeView.value)
						) {
							selectedColor = hexCodeView.value;
						} else {
							hexCodeView.style.border = '2px solid #f00';
							ok = false;
						}
					}
					if (colorToShow != selectedColor) {
						if (selectedColor != '') {
							colorToShow = selectedColor;
						}
					}
				}
				if (localStorage.getItem('notes') == null) {
					notes = [];
				} else {
					notes = JSON.parse(localStorage.getItem('notes'));
				}
				for (let i = 0; i < notes.length; i++) {
					if (idToUse == notes[i]._id) {
						notes[i]._title = titleToShow;
						notes[i]._content = contentToShow;
						notes[i]._color = colorToShow;
					}
				}
				if (ok) {
					localStorage.setItem('notes', JSON.stringify(notes));
					notesContainer.innerHTML = '';
					backThingView.style.display = 'none';
					hexCodeView.value = '';
					hexCodeView.setAttribute('readonly', 'true');
					hexCodeView.style.display = 'none';
					colorsList.style.display = 'none';
					colorsTitle.style.display = 'none';
					viewTitle.setAttribute('readonly', 'true');
					viewContent.setAttribute('readonly', 'true');
					buttonsView.style.display = 'grid';
					buttonsEdit.style.display = 'none';
					redView.classList.remove('selected');
					blueView.classList.remove('selected');
					greenView.classList.remove('selected');
					yellowView.classList.remove('selected');
					chooseView.classList.remove('selected');
					getNotes();
				} else {
					buttonsEdit.addEventListener('click', onSaveOrCancelEdit, {
						once: true,
					});
				}

				e.preventDefault();
			}

			e.preventDefault();
		}
	}
}

function selectHexCodeViewInput() {
	hexCodeView.removeAttribute('readonly');
	hexCodeView.select();
	if (hexCodeView.value == '') hexCodeView.value = '#';
	selectedColor = 'choose';
}

hexCodeView.addEventListener('click', onHexViewClick);
function onHexViewClick() {
	if (selectedColor != 'choose') {
		for (let i = 0; i < colorsList.children.length; i++) {
			colorsList.children[i].classList.remove('selected');
			isSelected = true;
		}
		chooseView.classList.add('selected');
		selectHexCodeViewInput();
	}
}

viewColorsDiv.addEventListener('click', onSelectViewColor);
function onSelectViewColor(e) {
	if (e.target.classList.contains('color-view')) {
		for (let i = 0; i < viewColorsDiv.children.length; i++) {
			viewColorsDiv.children[i].classList.remove('selected');
			isSelected = true;
		}
		e.target.classList.add('selected');

		if (e.target.classList.contains('choose-view')) {
			selectHexCodeViewInput();
		} else {
			hexCodeView.setAttribute('readonly', 'true');
			hexCodeView.value = '';
			selectedColor = e.target.style.backgroundColor;
		}
	}
}
