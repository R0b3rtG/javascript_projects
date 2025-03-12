const time = document.getElementById('time');
const date = document.getElementById('date');
const DEL_SELECTOR = "a[title='Burse de merit']";

setInterval(updateUI, 1000);

let isToggled = false;
const toggleButton = document.getElementById('toggleButton');
const statusText = document.getElementById('status');

chrome.storage.local.get(['isToggled']).then((result) => {
	isToggled = result.isToggled;
	if (!isToggled) {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0].url === 'http://inf.ucv.ro/anunturi.aspx') {
				chrome.tabs.sendMessage(
					tabs[0].id,
					{ action: 'getDOM' },
					(response) => {
						console.log(response.success);
					}
				);
			}
		});
	}
	updateUI();
});

toggleButton.addEventListener('click', () => {
	const newToggledState = !isToggled;
	isToggled = !isToggled;
	chrome.storage.local.set({ isToggled: newToggledState }).then(() => {
		updateUI(isToggled);
	});
});

function updateUI() {
	if (isToggled) {
		toggleButton.textContent = 'Turn OFF';
		toggleButton.className = 'on';
		statusText.textContent = 'Status: ON';
	} else {
		toggleButton.textContent = 'Turn ON';
		toggleButton.className = 'off';
		statusText.textContent = 'Status: OFF';
	}
	let now = new Date();
	time.innerHTML = now.toLocaleTimeString();

	const day = now.getDate() > 9 ? now.getDate() : `0${now.getDate()}`;
	const month =
		now.getMonth() + 1 > 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
	const year = now.getFullYear();
	date.innerHTML = isToggled
		? `${day}/${month}/${year}`
		: `${month}/${day}/${year}`;
}
