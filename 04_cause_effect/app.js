const fullName = document.querySelector('.name');
const street = document.querySelector('.street');
const city = document.querySelector('.city');
const state = document.querySelector('.state');
const country = document.querySelector('.country');
const phone = document.querySelector('.phone');
const birthday = document.querySelector('.birthday');
const photo = document.querySelector('.photo');

async function getData() {
	const data = await fetch('people.json');
	const myData = await data.json();
	const listOfPeople = document.querySelectorAll('.person');
	listOfPeople.forEach((person) => {
		person.addEventListener('click', () => {
			listOfPeople.forEach((pers) => pers.classList.remove('selected'));
			person.classList.add('selected');
			for (let i = 0; i < myData.length; i++) {
				if (myData[i].name == person.textContent) {
					changeInfo(i);
				}
			}
			let photoPath = person.textContent.toLocaleLowerCase();
			photoPath = photoPath.replace(/ /g, '_');
			photo.style.background = `url('./img/${photoPath}.jfif') no-repeat center center / cover`;
		});
	});

	function changeInfo(index) {
		fullName.innerHTML = myData[index].name;
		street.innerHTML = myData[index].street;
		city.innerHTML = myData[index].city;
		state.innerHTML = myData[index].state;
		country.innerHTML = myData[index].country;
		phone.innerHTML = myData[index].telephone;
		birthday.innerHTML = myData[index].birthday;
	}
}

getData();
