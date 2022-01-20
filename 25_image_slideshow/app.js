const images = [
	'/img/ales-krivec-4miBe6zg5r0-unsplash.jpg',
	'/img/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg',
	'/img/robert-lukeman-_RBcxo9AU-U-unsplash.jpg',
	'/img/sean-oulashin-KMn4VEeEPR8-unsplash.jpg',
	'/img/ken-cheung-KonWFWUaAuk-unsplash.jpg',
];

let interval;
let index = 0;
let index2 = 1;

const image = document.querySelector('.image');
const nextImage = document.querySelector('.next-image');

image.style.background = `url(${images[index]}) no-repeat center center / cover`;
nextImage.style.background = `url(${images[index2]}) no-repeat center center / cover`;

function startInterval() {
	interval = setInterval(() => {
		index = index < 4 ? index + 1 : 0;
		index2 = index2 < 4 ? index2 + 1 : 0;
		image.classList.add('fade');
		setTimeout(() => {
			image.style.background = `url(${images[index]}) no-repeat center center / cover`;
			setTimeout(() => {
				image.style.opacity = 1;
				image.classList.remove('fade');
				nextImage.style.background = `url(${images[index2]}) no-repeat center center / cover`;
			}, 1000);
		}, 1000);
	}, 5000);
}

startInterval();
