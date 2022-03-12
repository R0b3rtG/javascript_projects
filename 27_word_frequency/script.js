const textArea = document.querySelector('textarea');
const btn = document.querySelector('.btn');

btn.onclick = workOnTheText;
let firstTime = true;
let myChart;

function workOnTheText() {
	// FORMAT TEXT
	let text = textArea.value;
	text = text.toLocaleLowerCase();
	text = text.replace(/[\,\.\!\?\`\'\"\{\}\[\]\\\/\>\<\:\;\+\=]+/g, ' ');
	text = text.replace(/\s+/g, ' ');

	const resultsDiv = document.querySelector('.results');
	if (text != '' && text != ' ') {
		// SPLIT WORDS INTO AN ARRAY
		let arr = text.split(' ');
		// console.log(arr);
		let wordsList = [];
		arr.forEach((word) => {
			if (word != '') {
				if (wordsList.length == 0) {
					wordsList.push({ text: word, count: 1 });
				} else {
					let notMet = true;
					wordsList.forEach((el) => {
						if (el.text == word) {
							el.count++;
							notMet = false;
						}
					});
					if (notMet) wordsList.push({ text: word, count: 1 });
				}
			}
		});

		// UPDATE GENERAL RESULTS
		const wordCount = arr.length;
		const charCount = text.length;
		const wordCountDisplay = document.querySelector('.word-count-number');
		wordCountDisplay.textContent = wordCount;
		const charCountDisplay = document.querySelector('.char-count-number');
		charCountDisplay.textContent = charCount;

		// CREATE WORD LIST ON SCREEN
		const wordsDiv = document.querySelector('.words-div');
		wordsDiv.textContent = '';
		wordsList.forEach((word) => {
			const element = document.createElement('div');
			element.classList.add('word');

			const text = document.createElement('span');
			text.classList.add('text');
			text.textContent = word.text;
			element.append(text);

			if (word.text.length > 30) {
				const toolTip = document.createElement('span');
				toolTip.classList.add('tool-tip');
				toolTip.textContent = word.text;
				element.append(toolTip);
			}

			const count = document.createElement('span');
			count.classList.add('count');
			count.textContent = word.count;
			element.append(count);

			wordsDiv.append(element);
		});

		// SORT BY WORD COUNT
		wordsList.sort((a, b) => {
			return b.count - a.count;
		});

		// console.log(wordsList);

		let lables_wordText = [];
		let data_wordCount = [];
		let wordsListLength = wordsList.length >= 5 ? 5 : wordsList.length;
		for (let i = 0; i < wordsListLength; i++) {
			lables_wordText.push(wordsList[i].text);
			data_wordCount.push(wordsList[i].count);
		}

		let countOfTheRest = 0;
		for (let i = 5; i < wordsList.length; i++) {
			countOfTheRest += wordsList[i].count;
		}
		if (countOfTheRest > 0) {
			lables_wordText.push('THE REST');
			data_wordCount.push(countOfTheRest);
		}

		// console.log(wordsList, lables_wordText, data_wordCount);

		// UPDATE CHART
		myChart && myChart.destroy();
		const ctx = document.getElementById('word-chart').getContext('2d');
		const data = {
			labels: lables_wordText,
			datasets: [
				{
					label: 'Rick Roll',
					data: data_wordCount,
					backgroundColor: [
						'rgb(0, 255, 0, .7)',
						'rgb(0, 0, 255, .7)',
						'rgb(255, 255, 0, .7)',
						'rgb(255, 0, 0, .7)',
						'rgb(255, 0, 255, .7)',
						'rgb(180, 180, 180, .7)',
					],
					hoverBackgroundColor: [
						'rgb(0, 255, 0)',
						'rgb(0, 0, 255)',
						'rgb(255, 255, 0)',
						'rgb(255, 0, 0)',
						'rgb(255, 0, 255)',
						'rgb(180, 180, 180)',
					],
					hoverOffset: 4,
				},
			],
		};

		myChart = new Chart(ctx, {
			type: 'doughnut',
			data: data,
		});
		firstTime = false;

		resultsDiv.classList.remove('hidden');
	} else {
		resultsDiv.classList.add('hidden');
	}
}
