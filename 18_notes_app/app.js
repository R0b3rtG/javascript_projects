class Note {
	constructor(title, content, color, id) {
		this._title = title;
		this._content = content;
		this._color = color;
		this._id = id;
		this._timeDeleted = null;
	}
}

const createBtn = document.querySelector('.submit-btn');
const cancelBtn = document.querySelector('.cancel-btn');

let hexWithThree = /^#[0-9a-fA-F]{3}/;
let hexWithSix = /^#[0-9a-fA-F]{6}/;

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

const colorPreviewEdit = document.querySelector('.color-preview-edit');
const colorPreviewCreate = document.querySelector('.color-preview-create');
const colorPreviewSectionEdit = document.querySelector(
	'.color-preview-section-edit'
);
const colorPreviewSectionCreate = document.querySelector(
	'.color-preview-section-create'
);

let notes = [];
let trashedNotes = [];

const notesContainer = document.querySelector('.container');

const addOne = document.querySelector('.add-one');
const addBtns = document.querySelectorAll('.fa-file-circle-plus');
const promptDiv = document.querySelector('.input-prompt');
const backtThing = document.querySelector('.back-thing');
const body = document.querySelector('body');

let isSelected = false;
let selectedColor = '';

const titleInput = document.querySelector('#note-title-q');
const textArea = document.querySelector('#note-text');
const hexInput = document.querySelector('#hex-color');

const colorsDiv = document.querySelector('.colors');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const choose = document.querySelector('.choose');

const deleteBackground = document.querySelector('.back-thing-delete');
const deletePrompt = document.querySelector('.delete-prompt');

const deletePromptButtons = document.querySelector('.delete-prompt-buttons');

const viewTitle = document.querySelector('#note-title-q-view');
const viewContent = document.querySelector('#note-text-view');
const backThingView = document.querySelector('.back-thing-view');
const viewEdit = document.querySelector('.view-edit');

let titleToShow;
let contentToShow;
let colorToShow;
let idToUse;

let noteToShow;

let newNotification = null;
let newTopHalf = null;
let newSpan = null;
let newUndoButton = null;
let newTimer = null;

const noNotesDiv = document.querySelector('.no-notes');
const noTrashedNotesDiv = document.querySelector('.no-trashed-notes');

const trashToggleBtn = document.querySelector('.trash-toggle-div > i');
const userLocation = document.querySelector('.location');

const editButton = document.querySelector('.edit-btn');
const deleteAllBtn = document.querySelector('.delete-all-btn');

function switchToTrashedNotes() {
	addBtns[0].classList.add('disabled');
	for (i = 0; i < notesContainer.children.length; i++) {
		if (notesContainer.children[i].classList.contains('note')) {
			notesContainer.children[i].remove();
			i--;
		}
	}
	showTrashedNotes();

	noTrashedNotesDiv.style.display = trashedNotes.length > 0 ? 'none' : 'block';
	userLocation.innerText = 'Trashed Notes';

	getTrashedNotes();
	if (trashedNotes.length > 0) deleteAllBtn.style.display = 'block';

	if (newNotification != null) {
		slideOut(null);
	}
}

function switchToRegularNotes() {
	addBtns[0].classList.remove('disabled');
	for (i = 0; i < notesContainer.children.length; i++) {
		if (notesContainer.children[i].classList.contains('note')) {
			notesContainer.children[i].remove();
			i--;
		}
	}
	showNotes();

	noNotesDiv.style.display = notes.length > 0 ? 'none' : 'flex';
	userLocation.innerText = 'Notes';
	deleteAllBtn.style.display = 'none';
}

trashToggleBtn.addEventListener('click', () => {
	noTrashedNotesDiv.style.display = 'none';
	noNotesDiv.style.display = 'none';

	notesContainer.classList.toggle('padding-2rem');

	if (trashToggleBtn.classList.contains('fa-trash')) switchToTrashedNotes();
	else switchToRegularNotes();

	trashToggleBtn.classList.toggle('fa-trash');
	trashToggleBtn.classList.toggle('fa-solid');
	trashToggleBtn.classList.toggle('fa-note-sticky');
	trashToggleBtn.classList.toggle('fa-regular');
});

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

function formatSpaces(text) {
	let newText = '';
	for (i = 0; i < text.length; i++) {
		if (text[i] == ' ') newText += `&nbsp`;
		if (text[i] == '\n') newText += '<br>';
		newText += text[i];
	}
	return newText;
}

function addToUI(noteToAdd, trashOrNotes) {
	let newDiv = document.createElement('div');
	newDiv.classList.add('note');
	newDiv.setAttribute('id', noteToAdd._id);

	let newBorder = document.createElement('div');
	newBorder.classList.add('upper-color');
	newBorder.style.backgroundColor = noteToAdd._color;
	newDiv.appendChild(newBorder);

	let newTitle = document.createElement('h2');
	newTitle.classList.add('UI-note-title');
	newTitle.innerHTML = formatSpaces(noteToAdd._title);
	newDiv.appendChild(newTitle);

	let newFlex = document.createElement('div');
	newFlex.classList.add('p-flex');

	let newContent = document.createElement('p');
	newContent.classList.add('content');
	newContent.innerHTML = formatSpaces(noteToAdd._content);
	newFlex.appendChild(newContent);

	let newOptions = document.createElement('div');
	newOptions.classList.add('options');

	if (trashOrNotes == 'trash') {
		let newRecover = document.createElement('i');
		newRecover.classList.add('fa-solid');
		newRecover.classList.add('fa-arrow-rotate-left');
		newOptions.appendChild(newRecover);
	} else {
	}
	let newDelete = document.createElement('i');
	newDelete.classList.add('fa-solid');
	newDelete.classList.add('fa-trash-can');
	newOptions.appendChild(newDelete);

	let newCheck = document.createElement('i');
	newCheck.classList.add('far');
	newCheck.classList.add('fa-eye');
	newOptions.appendChild(newCheck);

	newFlex.appendChild(newOptions);
	newDiv.appendChild(newFlex);
	notesContainer.appendChild(newDiv);
}

// Show Input Prompt
addOne.addEventListener('click', onAddNote);
addBtns.forEach((button) => {
	button.addEventListener('click', onAddNote);
});
function onAddNote() {
	if (addBtns[0].classList.contains('disabled')) return;

	if (promptDiv.style.display === 'none') {
		promptDiv.style.display = 'block';
	}
	if (backtThing.style.display === 'none') {
		backtThing.style.display = 'block';
	}
}

// Color Picker
function updateColorPreviewCreate(color) {
	if (
		(hexWithThree.test(color) && color.length === 4) ||
		(hexWithSix.test(color) && color.length === 7)
	) {
		colorPreviewCreate.style.backgroundColor = color;
	} else {
		colorPreviewCreate.style.backgroundColor = 'transparent';
	}
}

function updateColorPreviewEdit(color) {
	if (
		(hexWithThree.test(color) && color.length === 4) ||
		(hexWithSix.test(color) && color.length === 7)
	) {
		colorPreviewEdit.style.backgroundColor = color;
	} else {
		colorPreviewEdit.style.backgroundColor = 'transparent';
	}
}

hexInput.addEventListener('input', () => {
	updateColorPreviewCreate(hexInput.value);
});

hexCodeView.addEventListener('input', () => {
	updateColorPreviewEdit(hexCodeView.value);
});

function selectHexInput() {
	hexInput.removeAttribute('readonly');
	hexInput.select();
	if (hexInput.value == '') hexInput.value = '#';
	selectedColor = 'choose';
	updateColorPreviewCreate(hexInput.value);
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
			colorPreviewCreate.style.backgroundColor = e.target.style.backgroundColor;
		}
	}
}

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
					(hexWithSix.test(hexCode) && hexCode.length === 7)
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
	updateColorPreviewCreate('transparent');
}

(function () {
	reset();

	showNotes();
	getTrashedNotes();

	noNotesDiv.style.display =
		notes.length > 0 && trashToggleBtn.classList.contains('fa-trash')
			? 'none'
			: 'flex';
})();

function getHighestId() {
	getTrashedNotes();
	getNotes();
	let max = 0;

	for (let j = 0; j < trashedNotes.length; j++) {
		if (trashedNotes[j]._id > max) max = trashedNotes[j]._id;
	}

	for (let j = 0; j < notes.length; j++) {
		if (notes[j]._id > max) max = notes[j]._id;
	}

	return max;
}

function createNote(selectedColor, noteTitle, noteText) {
	let lastIndexHere;
	lastIndexHere =
		notes.length === 0 && trashedNotes.length == 0 ? 0 : getHighestId() + 1;
	let gen = generateId(lastIndexHere);
	let newNote = new Note(noteTitle, noteText, selectedColor, gen.next().value);
	pushToLocalStorage(newNote);
	addToUI(newNote, 'notes');

	getNotes();
	noNotesDiv.style.display =
		notes.length > 0 && trashToggleBtn.classList.contains('fa-trash')
			? 'none'
			: 'flex';

	reset();
	promptDiv.style.display = 'none';
	backtThing.style.display = 'none';
}

function pushToLocalStorage(note) {
	if (localStorage.getItem('notes') == null) {
		notes = [];
	} else {
		notes = JSON.parse(localStorage.getItem('notes'));
	}
	notes.push(note);
	localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
	if (localStorage.getItem('notes') != null) {
		notes = JSON.parse(localStorage.getItem('notes'));
	} else {
		notes = [];
	}
}

function showNotes() {
	getNotes();
	notes.forEach((currNote) => {
		addToUI(currNote, 'notes');
	});
}

function* generateId(lastIndex) {
	let i = lastIndex;
	while (true) {
		yield i++;
	}
}

function slideOut(callback) {
	newNotification.classList.add('slide-out');
	setTimeout(() => {
		newNotification.remove();
		newNotification = null;
		newTopHalf = null;
		newSpan = null;
		newUndoButton = null;
		newTimer = null;
		if (callback != null) callback();
	}, 1000);
}

notesContainer.addEventListener('click', onDeleteNote);
function onDeleteNote(e) {
	if (!e.target.classList.contains('fa-trash-can')) return;

	let noteToDelete = e.target.parentElement.parentElement.parentElement;
	let noteToDeleteId = parseInt(noteToDelete.id);
	let noteToDeletePos;

	if (trashToggleBtn.classList.contains('fa-trash')) {
		noteToDelete.classList.add('animation');
		noteToDelete.addEventListener('animationend', () => {
			noteToDelete.classList.remove('animation');
			noteToDelete.remove();
			if (localStorage.getItem('notes') == null) {
				notes = [];
			} else {
				notes = JSON.parse(localStorage.getItem('notes'));
			}
			let oldNotes = [...notes];
			console.log(oldNotes);
			if (localStorage.getItem('trashed_notes') == null) {
				trashedNotes = [];
			} else {
				trashedNotes = JSON.parse(localStorage.getItem('trashed_notes'));
			}
			for (let i = 0; i < notes.length; i++) {
				if (notes[i]._id == noteToDeleteId) {
					noteToDeletePos = i;
					trashedNotes.push(notes[i]);
					localStorage.setItem('trashed_notes', JSON.stringify(trashedNotes));
					notes.splice(i, 1);
					localStorage.setItem('notes', JSON.stringify(notes));
				}
			}
			getNotes();
			noNotesDiv.style.display = notes.length > 0 ? 'none' : 'flex';

			showNotification();

			function showNotification() {
				if (newNotification != null) {
					slideOut(doNotificationStuff);
				} else {
					doNotificationStuff();
				}

				function doNotificationStuff() {
					newNotification = document.createElement('div');
					newNotification.classList.add('notification');

					newTopHalf = document.createElement('div');
					newTopHalf.classList.add('top-half');

					newSpan = document.createElement('span');
					newSpan.textContent = 'You have just deleted a note!';

					newUndoButton = document.createElement('button');
					newUndoButton.classList.add('undo-btn');
					newUndoButton.textContent = 'Undo';

					newTimer = document.createElement('div');
					newTimer.classList.add('timer');

					newTopHalf.append(newSpan);
					newTopHalf.append(newUndoButton);
					newNotification.append(newTopHalf);
					newNotification.append(newTimer);

					document.body.append(newNotification);

					newTimer.addEventListener('animationend', () => {
						slideOut(null);
					});

					newNotification.addEventListener('mouseenter', (e) => {
						e.target.children[1].style.setProperty(
							'animation-play-state',
							'paused'
						);
					});

					newNotification.addEventListener('mouseleave', (e) => {
						e.target.children[1].style.setProperty(
							'animation-play-state',
							'running'
						);
					});

					newNotification.addEventListener('click', (e) => {
						if (e.target.classList.contains('undo-btn')) {
							noteToRecoverId = noteToDeleteId;
							if (localStorage.getItem('trashed_notes') == null) {
								trashedNotes = [];
							} else {
								trashedNotes = JSON.parse(
									localStorage.getItem('trashed_notes')
								);
							}
							if (localStorage.getItem('notes') == null) {
								notes = [];
							} else {
								notes = JSON.parse(localStorage.getItem('notes'));
							}
							for (let i = 0; i < trashedNotes.length; i++) {
								if (trashedNotes[i]._id == noteToRecoverId) {
									notes = oldNotes;
									localStorage.setItem('notes', JSON.stringify(notes));
									trashedNotes.splice(i, 1);
									localStorage.setItem(
										'trashed_notes',
										JSON.stringify(trashedNotes)
									);
								}
							}
							getNotes();
							[...notesContainer.children].forEach((child) => {
								if (child.classList.contains('note')) child.remove();
							});
							noNotesDiv.style.display =
								notes.length > 0 &&
								trashToggleBtn.classList.contains('fa-trash')
									? 'none'
									: 'flex';
							showNotes();
							getTrashedNotes();
							slideOut(null);
						} else {
							slideOut();
						}
					});
				}
			}
		});
	} else {
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
			deleteBackground.style.display = 'none';
			noteToDelete.classList.add('animation');
			noteToDelete.addEventListener('animationend', () => {
				noteToDelete.classList.remove('animation');
				noteToDelete.remove();
				if (localStorage.getItem('trashed_notes') == null) {
					trashedNotes = [];
				} else {
					trashedNotes = JSON.parse(localStorage.getItem('trashed_notes'));
				}
				for (let i = 0; i < trashedNotes.length; i++) {
					if (trashedNotes[i]._id == noteToDeleteId) {
						trashedNotes.splice(i, 1);
						localStorage.setItem('trashed_notes', JSON.stringify(trashedNotes));
					}
				}

				getNotes();
				getTrashedNotes();
				noTrashedNotesDiv.style.display =
					trashedNotes.length > 0 ? 'none' : 'block';
				if (trashedNotes.length == 0) deleteAllBtn.style.display = 'none';
			});
		}
	}
}

notesContainer.addEventListener('click', recoverNote);
function recoverNote(e) {
	if (!e.target.classList.contains('fa-arrow-rotate-left')) return;

	let noteToRecover = e.target.parentElement.parentElement.parentElement;
	let noteToRecoverId = parseInt(noteToRecover.id);

	noteToRecover.classList.add('animation2');
	noteToRecover.addEventListener('animationend', () => {
		noteToRecover.classList.remove('animation2');
		noteToRecover.remove();
		if (localStorage.getItem('trashed_notes') == null) {
			trashedNotes = [];
		} else {
			trashedNotes = JSON.parse(localStorage.getItem('trashed_notes'));
		}
		if (localStorage.getItem('notes') == null) {
			notes = [];
		} else {
			notes = JSON.parse(localStorage.getItem('notes'));
		}
		for (let i = 0; i < trashedNotes.length; i++) {
			if (trashedNotes[i]._id == noteToRecoverId) {
				notes.push(trashedNotes[i]);
				localStorage.setItem('notes', JSON.stringify(notes));
				trashedNotes.splice(i, 1);
				localStorage.setItem('trashed_notes', JSON.stringify(trashedNotes));
			}
		}
		getNotes();
		getTrashedNotes();
		noTrashedNotesDiv.style.display =
			trashedNotes.length > 0 ? 'none' : 'block';
	});
}

notesContainer.addEventListener('click', onViewNote);
function onViewNote(e) {
	if (e.target.classList.contains('fa-eye')) {
		redView.classList.remove('selected');
		blueView.classList.remove('selected');
		greenView.classList.remove('selected');
		yellowView.classList.remove('selected');
		chooseView.classList.remove('selected');
		hexCodeView.value = '';
		let where = 'notes';
		if (trashToggleBtn.classList.contains('fa-note-sticky')) {
			where = 'trashed_notes';
			editButton.classList.add('disabled');
			editButton.firstChild.classList.add('disabled');
		} else {
			editButton.classList.remove('disabled');
			editButton.firstChild.classList.remove('disabled');
		}
		let arr = [];
		noteToShow = e.target.parentElement.parentElement.parentElement;
		if (localStorage.getItem(where) == null) {
			arr = [];
		} else {
			arr = JSON.parse(localStorage.getItem(where));
		}
		for (let i = 0; i < arr.length; i++) {
			if (arr[i]._id == noteToShow.id) {
				titleToShow = arr[i]._title;
				contentToShow = arr[i]._content;
				colorToShow = arr[i]._color;
				idToUse = arr[i]._id;
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
				if (
					!editButton.classList.contains('disabled') &&
					!editButton.firstChild.classList.contains('disabled')
				)
					openEditPrompt(e);
				buttonsView.addEventListener('click', onEditOrBack, { once: true });
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

			let colorCode;
			notes.forEach((note) => {
				if (note._id == noteToShow.id) colorCode = note._color;
			});

			let rgbColor = rgbToHex(colorCode);
			for (let j = 0; j < viewColorsDiv.children.length; j++) {
				viewColorsDiv.children[j].classList.remove('selected');
				isSelected = true;
			}
			if (rgbColor == undefined) {
				hexCodeView.value = colorCode;
				colorPreviewEdit.style.backgroundColor = colorCode;
				viewColorsDiv.children[4].classList.add('selected');
			} else {
				for (let j = 0; j < viewColorsDiv.children.length; j++) {
					if (viewColorsDiv.children[j].style.backgroundColor == colorCode) {
						viewColorsDiv.children[j].classList.add('selected');
						colorPreviewEdit.style.backgroundColor =
							viewColorsDiv.children[j].style.backgroundColor;
					}
				}
			}

			buttonsView.style.display = 'none';
			buttonsEdit.style.display = 'grid';
			viewTitle.removeAttribute('readonly');
			viewContent.removeAttribute('readonly');
			colorsTitle.style.display = 'block';
			colorsList.style.display = 'flex';
			hexCodeView.style.display = 'block';
			colorPreviewSectionEdit.style.display = 'flex';

			buttonsEdit.addEventListener('click', onSaveOrCancelEdit, { once: true });
			function onSaveOrCancelEdit(e) {
				if (e.target.classList.contains('save-btn')) {
					saveEdit(e);
					return;
				}
				if (e.target.classList.contains('cancel-edit-btn')) {
					cancelEdit(e);
					return;
				}

				buttonsEdit.addEventListener('click', onSaveOrCancelEdit, {
					once: true,
				});
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
				colorPreviewSectionEdit.style.display = 'none';
				updateColorPreviewEdit('transparent');

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
							(hexWithSix.test(hexCodeView.value) &&
								hexCodeView.value.length === 7)
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
					colorPreviewSectionEdit.style.display = 'none';
					updateColorPreviewEdit('transparent');
					showNotes();
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
	updateColorPreviewEdit(hexCodeView.value);
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
			colorPreviewEdit.style.backgroundColor = e.target.style.backgroundColor;
		}
	}
}

function getTrashedNotes() {
	if (localStorage.getItem('trashed_notes') != null) {
		trashedNotes = JSON.parse(localStorage.getItem('trashed_notes'));
	} else {
		trashedNotes = [];
	}
}

function showTrashedNotes() {
	getTrashedNotes();

	trashedNotes.forEach((currNote) => {
		addToUI(currNote, 'trash');
	});
}

deleteAllBtn.addEventListener('click', () => {
	deleteBackground.style.display = 'block';
	deletePromptButtons.addEventListener('click', onCancelOrConfirmDelete, {
		once: true,
	});

	const warningText =
		deleteBackground.firstChild.nextSibling.firstChild.nextSibling.firstChild
			.nextSibling.nextSibling.nextSibling;
	warningText.innerHTML =
		'You are about to <span>PERMANENTLY DELETE</span> all notes!';

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
		warningText.innerHTML =
			'You are about to <span>PERMANENTLY DELETE</span> this note!';
		deleteBackground.style.display = 'none';
	}

	function confirmDelete() {
		warningText.innerHTML =
			'You are about to <span>PERMANENTLY DELETE</span> this note!';
		deleteBackground.style.display = 'none';

		[...notesContainer.children].forEach((node) => {
			if (node.classList.contains('note')) {
				node.classList.add('animation');
				node.addEventListener('animationend', () => {
					node.classList.remove('animation');
					noteToDeleteId = node.id;
					node.remove();
					deleteAllBtn.style.display = 'none';
					if (localStorage.getItem('trashed_notes') == null) {
						trashedNotes = [];
					} else {
						trashedNotes = JSON.parse(localStorage.getItem('trashed_notes'));
					}
					for (let i = 0; i < trashedNotes.length; i++) {
						if (trashedNotes[i]._id == noteToDeleteId) {
							trashedNotes.splice(i, 1);
							localStorage.setItem(
								'trashed_notes',
								JSON.stringify(trashedNotes)
							);
						}
					}

					getNotes();
					getTrashedNotes();
					noTrashedNotesDiv.style.display =
						trashedNotes.length > 0 ? 'none' : 'block';
				});
			}
		});
	}
});
