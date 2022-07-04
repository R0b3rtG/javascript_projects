const faq = document.querySelector('.faq-container');

faq.addEventListener('click', function (e) {
	if (e.target.classList.contains('fa-chevron-up')) {
		const qContainer = e.target.parentElement;
		const question = e.target.parentElement.children[0];
		if (e.target.id == 'closed') {
			qContainer.classList.add('qOpen');
			e.target.id = 'open';
			question.style.fontWeight = '700';
			question.classList.add('black');
		} else {
			qContainer.classList.remove('qOpen');
			e.target.id = 'closed';
			question.style.fontWeight = '600';
			question.classList.remove('black');
		}
	}
});

const form = document.querySelector('.contact-form');

form.addEventListener('submit', function (e) {
	e.preventDefault();

	checkInput();
});

const input = document.querySelector('.contact-input');

function checkInput() {
	re = /^[0-9a-zA-Z]+@(gmail|outlook|hotmail).(com|ro|ru)$/;
  showAlert(re.test(input.value));
}

const section4 = document.querySelector('.sec-4');

let alertBox;
function showAlert(succeeded) {
  if(alertBox != null || alertBox != undefined) {
    alertBox.remove();
  }
  alertBox = document.createElement('div');
  alertBox.classList.add('alert-box');
  if(succeeded){
    alertBox.textContent = 'Check your email inbox for confirmation';
    alertBox.classList.add('alert-succeeded');
  }
  else {
    alertBox.textContent = 'Please check if your email is entered correctly';
    alertBox.classList.add('alert-did-not-succeed');
  }
  section4.insertBefore(alertBox, form);
  setTimeout(() => {
    alertBox.remove();
    alertBox = null;
  }, 5000)
}
