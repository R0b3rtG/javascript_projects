document.addEventListener('DOMContentLoaded', () => {
	setInterval(() => {
		const btn = document.querySelector("[aria-label='Claim Bonus']");
		if (btn != null) btn.click();
		console.log('works!');
	}, 1000);
});

const DEL_SELECTOR = "[aria-label='Claim Bonus']";

const mo = new MutationObserver(onMutation);

onMutation([{ addedNodes: [document.documentElement] }]);
observe();

function onMutation(mutations) {
	let stopped;
	for (const { addedNodes } of mutations) {
		for (const n of addedNodes) {
			if (n.tagName) {
				if (n.matches(DEL_SELECTOR)) {
					stopped = true;
					mo.disconnect();
					n.remove();
				} else if (n.firstElementChild && n.querySelector(DEL_SELECTOR)) {
					stopped = true;
					mo.disconnect();
					for (const el of n.querySelectorAll(DEL_SELECTOR)) el.click();
				}
			}
		}
	}
	if (stopped) observe();
}

function observe() {
	mo.observe(document, {
		subtree: true,
		childList: true,
	});
}
