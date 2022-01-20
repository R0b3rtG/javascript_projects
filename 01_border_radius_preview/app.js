const slider = document.querySelectorAll('.slider');
const slider1 = document.querySelector('.slider1');
const slider2 = document.querySelector('.slider2');
const slider3 = document.querySelector('.slider3');
const slider4 = document.querySelector('.slider4');
const box = document.querySelector('.image');
const text = document.querySelector('.text');
const copyBtn = document.querySelector('.copy-btn');
const optionBMO = document.querySelector('.BMO');
const optionFinn = document.querySelector('.Finn');
const optionJake = document.querySelector('.Jake');

slider1.addEventListener('input', borderChange);
slider2.addEventListener('input', borderChange);
slider3.addEventListener('input', borderChange);
slider4.addEventListener('input', borderChange);

function borderChange() {
	box.style.borderRadius = `${slider1.value}% ${slider2.value}% ${slider3.value}% ${slider4.value}%`;
	text.value = `border-radius: ${slider1.value}% ${slider2.value}% ${slider3.value}% ${slider4.value}%`;
}

copyBtn.addEventListener('click', copyText);

function copyText() {
	text.select();
	text.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(text.value);
}

optionBMO.addEventListener('click', function () {
	const s1 = slider1.value;
	const s2 = slider2.value;
	const s3 = slider3.value;
	const s4 = slider4.value;
	box.setAttribute('style', "background-image: url('./img/wallpaper1.png')");
	slider1.value = s1;
	slider2.value = s2;
	slider3.value = s3;
	slider4.value = s4;
	box.style.borderRadius = `${slider1.value}% ${slider2.value}% ${slider3.value}% ${slider4.value}%`;
});
optionFinn.addEventListener('click', function () {
	const s1 = slider1.value;
	const s2 = slider2.value;
	const s3 = slider3.value;
	const s4 = slider4.value;
	box.setAttribute('style', "background-image: url('./img/wallpaper2.jpg')");
	slider1.value = s1;
	slider2.value = s2;
	slider3.value = s3;
	slider4.value = s4;
	box.style.borderRadius = `${slider1.value}% ${slider2.value}% ${slider3.value}% ${slider4.value}%`;
});
optionJake.addEventListener('click', function () {
	const s1 = slider1.value;
	const s2 = slider2.value;
	const s3 = slider3.value;
	const s4 = slider4.value;
	box.setAttribute('style', "background-image: url('./img/wallpaper3.png')");
	slider1.value = s1;
	slider2.value = s2;
	slider3.value = s3;
	slider4.value = s4;
	box.style.borderRadius = `${slider1.value}% ${slider2.value}% ${slider3.value}% ${slider4.value}%`;
});
