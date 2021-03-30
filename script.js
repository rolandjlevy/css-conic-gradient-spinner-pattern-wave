const $ = (el) => document.querySelector(el);

const maxSpeed = $('.slider').max;
const minSpeed = $('.slider').min;
const amount = 100;
let counter = 0;

while (counter++ < amount) {
  const li = document.createElement('li');
  li.setAttribute('data-id', counter);
  li.style.setProperty('--delay', `-${counter/12}s`);
  const dir = counter % 2 ? 'normal' : 'reverse';
  li.classList = `conic-spinner ${dir}`;
  $('.spinners').appendChild(li);
}

$('.slider').addEventListener('input', (e) => {
  const speed = Number(maxSpeed) + Number(minSpeed) - Number(e.target.value);
  document.documentElement.style.setProperty('--speed', speed + "s");
});