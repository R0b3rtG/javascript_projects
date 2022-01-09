const arrow = document.querySelector('.faq-container');

faq.addEventListener('click', function(e){
  if(e.target.classList.contains('fa-chevron-up')){
    const qContainer = e.target.parentElement;
    const question = e.target.parentElement.children[0];
    if(e.target.id == 'closed'){
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

const form = document.querySelector('form');

form.addEventListener('submit', function(e){
  e.preventDefault();
});