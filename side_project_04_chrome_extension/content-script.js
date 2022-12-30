setInterval(() => {
	const element = document.querySelector('.nm2B');
	const loginBtn = document.querySelector('.link-hr')?.firstChild;
	if (element != null) element.style.display = 'none';
	if (loginBtn != null) loginBtn.click();
}, 100);
