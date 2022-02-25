const images = document.querySelectorAll('.image');

const nextImage = () => {
	const current = document.querySelector('.show');
	if (current.nextElementSibling.classList.contains('image')) {
		current.nextElementSibling.classList.add('show');
	} else {
		images[0].classList.add('show');
	}
	current.classList.remove('show');
	clearInterval(interval);
	interval = setInterval(nextImage, 10000);
};

let interval = setInterval(nextImage, 10000);

const prevImage = () => {
	const current = document.querySelector('.show');
	if (current.previousElementSibling.classList.contains('image')) {
		current.previousElementSibling.classList.add('show');
	} else {
		images[images.length - 1].classList.add('show');
	}
	current.classList.remove('show');
	clearInterval(interval);
	interval = setInterval(nextImage, 10000);
};

const nextBtn = document.querySelector('.next-btn');
nextBtn.addEventListener('click', nextImage);

const prevBtn = document.querySelector('.prev-btn');
prevBtn.addEventListener('click', prevImage);
