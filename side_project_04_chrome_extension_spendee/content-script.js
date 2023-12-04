const DEL_SELECTOR = '.nm2B';

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
					for (const el of n.querySelectorAll(DEL_SELECTOR)) el.remove();
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
