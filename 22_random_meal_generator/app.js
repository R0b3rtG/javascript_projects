const mealName = document.querySelector('.meal-name');
const category = document.querySelector('.category');
const area = document.querySelector('.area');
const instructions = document.querySelector('.instructions');
const image = document.querySelector('.image');
const body = document.querySelector('body');
const mealDiv = document.querySelector('.meal');
const iframe = document.querySelector('iframe');

async function getData() {
	const response = await fetch(
		'https://www.themealdb.com/api/json/v1/1/random.php'
	);
	const data = await response.json();
	showData(data);
}

async function showData(data) {
	meal = data.meals[0];
	mealName.textContent = meal.strMeal;
	category.textContent = meal.strCategory;
	area.textContent = meal.strArea;
	let newStr = meal.strInstructions.replace(/\n/g, `\n</br>`);
	instructions.innerHTML = newStr;
	image.src = meal.strMealThumb;
	let arr = [];
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`] != null) {
			arr.push(meal[`strIngredient${i}`]);
		}
		if (
			meal[`strMeasure${i}`] != '' &&
			meal[`strMeasure${i}`] != ' ' &&
			meal[`strMeasure${i}`] != null
		) {
			arr[i - 1] += `: ${meal[`strMeasure${i}`]}`;
		}
	}
	const ingredients = document.querySelector('.ingredients');
	ingredients.innerHTML = '';
	arr.forEach((index) => {
		if (index != '') {
			const li = document.createElement('li');
			li.classList.add('ingredient');
			li.textContent = index;
			ingredients.appendChild(li);
		}
	});
	iframe.src = `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`;
}

const btn = document.querySelector('.get-meal');

btn.addEventListener('click', () => {
	getData();
	body.style.justifyContent = 'unset';
	body.style.height = 'auto';
	mealDiv.style.display = 'flex';
});
