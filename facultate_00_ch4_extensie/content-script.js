const DEL_SELECTOR = "a[title='Burse de merit']";

let isToggled = false;

document.addEventListener('DOMContentLoaded', () => {
	let element = document.querySelector(DEL_SELECTOR);
	chrome.storage.local.get(['isToggled']).then((result) => {
		isToggled = result.isToggled;
		if (isToggled) {
			element.innerHTML = 'Toata lumea primeste burse de merit';
		}
	});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'getDOM') {
		let element = document.querySelector(DEL_SELECTOR);
		if (!isToggled) {
			element.innerHTML = 'Toata lumea primeste burse de merit';
		}
		sendResponse({ success: true });
	}
});
