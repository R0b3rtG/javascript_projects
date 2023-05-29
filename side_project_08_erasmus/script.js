const elements = document.querySelectorAll('.out');

const observer = new IntersectionObserver((entries) => {
	entries.map((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.remove('out');
		}
	});
});

[...elements].map((element) => {
	observer.observe(element);
});
