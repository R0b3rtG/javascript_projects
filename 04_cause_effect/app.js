const peopleInfo = [
	{
		name: 'Jake Paul',
		street: '9 Mai',
		city: 'Timisoara',
		state: 'Timis',
		country: 'Romania',
		telephone: '0754386004',
		birthday: '20-11-1999',
	},
	{
		name: 'Selena Gomez',
		street: 'Rue De Rivoli',
		city: 'Paris',
		state: 'Corse',
		country: 'France',
		telephone: '33 24 42 35 46',
		birthday: '31-12-1986',
	},
	{
		name: 'Laura Mercury',
		street: 'Altstadtring',
		city: 'Munich',
		state: 'Bavaria',
		country: 'Germany',
		telephone: '492 123 424',
		birthday: '27-01-2001',
	},
	{
		name: 'Andrew Smith',
		street: 'Angus Avenue',
		city: 'Auburn',
		state: 'Alabama',
		country: 'USA',
		telephone: '1 364 213 1242',
		birthday: '14-05-1975',
	},
	{
		name: 'Morgan Freeman',
		street: 'Andrew Hope Street',
		city: 'Sitka',
		state: 'Alaska',
		country: 'USA',
		telephone: '1 231 123 5657',
		birthday: '12-03-1992',
	},
	{
		name: 'Robert de Niro',
		street: 'Bachova',
		city: 'Bratislava',
		state: 'Bratislava',
		country: 'Slovakia',
		telephone: '421 123 1238',
		birthday: '15-09-1991',
	},
	{
		name: 'John Doe',
		street: 'Urban Street',
		city: 'Palmira',
		state: 'Cauca',
		country: 'Colombia',
		telephone: '1 296 1277649',
		birthday: '02-02-1969',
	},
	{
		name: 'Angela White',
		street: 'Seven Windows',
		city: 'Cusco',
		state: 'Apurimac',
		country: 'Peru',
		telephone: '924 124 359',
		birthday: '01-11-1991',
	},
	{
		name: 'Sam Kirt',
		street: 'Denny Way',
		city: 'Seattle',
		state: 'Washington',
		country: 'USA',
		telephone: '1 246 776 2358',
		birthday: '07-09-1996',
	},
	{
		name: 'Kirby Bucket',
		street: 'Washington Avenue',
		city: 'Las Vegas',
		state: 'Nevada',
		country: 'USA',
		telephone: ' 1 284 584 8204',
		birthday: '05-05-2005',
	},
	{
		name: 'Joe Mama',
		street: 'Miracle Mile',
		city: 'Miami',
		state: 'Florida',
		country: 'USA',
		telephone: ' 1 204 675 3658',
		birthday: '03-12-1992',
	},
	{
		name: 'Kirk Hammet',
		street: 'Bratnia',
		city: 'Lublin',
		state: 'Lublin Voivodeship',
		country: 'Poland',
		telephone: '48 123 45 76',
		birthday: '06-11-1979',
	},
	{
		name: 'James Hetfield',
		street: 'Rikharda Zorge',
		city: 'Izberbash',
		state: 'Dagestan',
		country: 'Russia',
		telephone: '7911 123456',
		birthday: '06-12-1990',
	},
	{
		name: 'Lars Urich',
		street: 'Danforth Avenue',
		city: 'Toronto',
		state: 'Toronto',
		country: 'Canada',
		telephone: '1 245 734 6754',
		birthday: '09-08-1968',
	},
	{
		name: 'Adam Gontier',
		street: 'Binhai Avenue',
		city: 'Haikou',
		state: 'Hainan',
		country: 'China',
		telephone: '174 4856 9435',
		birthday: '23-01-1987',
	},
];

const fullName = document.querySelector('.name');
const street = document.querySelector('.street');
const city = document.querySelector('.city');
const state = document.querySelector('.state');
const country = document.querySelector('.country');
const phone = document.querySelector('.phone');
const birthday = document.querySelector('.birthday');

function changeInfo(index) {
	fullName.innerHTML = `Name: <span style="font-weight: 400">${peopleInfo[index].name}</span>`;
	street.innerHTML = `Street: <span style="font-weight: 400">${peopleInfo[index].street}</span>`;
	city.innerHTML = `City: <span style="font-weight: 400">${peopleInfo[index].city}</span>`;
	state.innerHTML = `State: <span style="font-weight: 400">${peopleInfo[index].state}</span>`;
	country.innerHTML = `Country: <span style="font-weight: 400">${peopleInfo[index].country}</span>`;
	phone.innerHTML = `Phone: <span style="font-weight: 400">${peopleInfo[index].telephone}</span>`;
	birthday.innerHTML = `Birthday: <span style="font-weight: 400">${peopleInfo[index].birthday}</span>`;
}

const person1 = document.querySelector('.person1');
const person2 = document.querySelector('.person2');
const person3 = document.querySelector('.person3');
const person4 = document.querySelector('.person4');
const person5 = document.querySelector('.person5');
const person6 = document.querySelector('.person6');
const person7 = document.querySelector('.person7');
const person8 = document.querySelector('.person8');
const person9 = document.querySelector('.person9');
const person10 = document.querySelector('.person10');
const person11 = document.querySelector('.person11');
const person12 = document.querySelector('.person12');
const person13 = document.querySelector('.person13');
const person14 = document.querySelector('.person14');
const person15 = document.querySelector('.person15');

person1.addEventListener('click', function () {
	changeInfo(0);
});
person2.addEventListener('click', function () {
	changeInfo(1);
});
person3.addEventListener('click', function () {
	changeInfo(2);
});
person4.addEventListener('click', function () {
	changeInfo(3);
});
person5.addEventListener('click', function () {
	changeInfo(4);
});
person6.addEventListener('click', function () {
	changeInfo(5);
});
person7.addEventListener('click', function () {
	changeInfo(6);
});
person8.addEventListener('click', function () {
	changeInfo(7);
});
person9.addEventListener('click', function () {
	changeInfo(8);
});
person10.addEventListener('click', function () {
	changeInfo(9);
});
person11.addEventListener('click', function () {
	changeInfo(10);
});
person12.addEventListener('click', function () {
	changeInfo(11);
});
person13.addEventListener('click', function () {
	changeInfo(12);
});
person14.addEventListener('click', function () {
	changeInfo(13);
});
person15.addEventListener('click', function () {
	changeInfo(14);
});
