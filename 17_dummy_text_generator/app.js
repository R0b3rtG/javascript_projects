const arr = [
	'lorem',
	'ipsum',
	'dolor',
	'sit',
	'amet',
	'consectetur',
	'adipisicing',
	'elit',
	'nobis',
	'qui',
	'consectetur',
	'non',
	'delectus',
	'in',
	'quis',
	'necessitatibus',
	'debitis',
	'harum',
	'culpa',
	'officiis',
	'sunt',
	'maxime',
	'facilis',
	'pariatur',
	'ex',
	'provident',
	'nulla',
	'libero',
	'cumque',
	'earum',
	'vero',
	'rem',
	'accusamus',
	'est',
	'doloribus',
	'illum',
	'deleniti',
	'doloremque',
	'quo',
	'sunt',
	'fugiat',
	'voluptates',
	'ducimus',
	'dignissimos',
	'sapiente',
	'soluta',
	'est',
	'omnis',
	'temporibus',
	'hic',
	'voluptate',
	'ipsam',
	'expedita',
	'quidem',
	'distinctio',
	'vel',
	'minus',
	'possimus',
	'voluptatibus',
	'esse',
	'quibusdam',
	'architecto',
	'commodi',
	'nisi',
	'ex',
	'maxime',
	'autem',
	'ipsum',
	'culpa',
	'ducimus',
	'perferendis',
	'libero',
	'reiciendis',
	'obcaecati',
	'nemo',
	'suscipit',
	'aliquid',
	'alias',
	'eius',
	'aspernatur',
	'ullam',
	'eum',
	'accusantium',
	'temporibus',
	'a',
	'exercitationem',
	'necessitatibus',
	'nihil',
	'libero',
	'eveniet',
	'quia',
	'laudantium',
	'tenetur',
	'magni',
	'excepturi',
	'minus',
	'voluptatibus',
	'obcaecati',
	'inventore',
	'numquam',
];

const btn = document.querySelector('.btn');
const output = document.querySelector('textarea');
const input = document.querySelector('input');
const alertBox = document.querySelector('.alert');

btn.addEventListener('click', update);

output.value = '';

function update() {
	let paragraphs = input.value;
	input.value = '';
	let str = '   ';
	if (paragraphs >= 5 && paragraphs <= 100) {
		for (let i = 0; i < paragraphs; i++) {
			let wordCount = parseInt(Math.random() * 30 + 10);
			for (let j = 0; j < wordCount; j++) {
				let wordIndex = parseInt(Math.random() * 100 + 1);
				let capsWord =
					j === 0
						? arr[wordIndex].charAt(0).toUpperCase() + arr[wordIndex].slice(1)
						: '';
				console.log(capsWord);
				str += j === 0 ? capsWord : arr[wordIndex];
				str += j < wordCount - 1 ? ' ' : '';
			}
			str += '.\n   ';
		}
		output.value = str;
	} else {
		alertBox.style.display = 'block';
		setTimeout(() => {
			alertBox.style.display = 'none';
		}, 5000);
	}
}
