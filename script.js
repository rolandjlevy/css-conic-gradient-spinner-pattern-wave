const $ = (el) => document.querySelector(el);

const docElem = document.documentElement;
const maxSpeed = $('#speed-control').max;
const minSpeed = $('#speed-control').min;
const maxHue = $('#colour-control').max;
const hueOffset = getComputedStyle(docElem).getPropertyValue('--hue-offset').trim();
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

$('#speed-control').addEventListener('input', (e) => {
  const speed = Number(maxSpeed) + Number(minSpeed) - Number(e.target.value);
  docElem.style.setProperty('--speed', speed + "s");
});

$('#colour-control').addEventListener('input', (e) => {
  const hueOne = e.target.value;
  const hueTwo = (Number(e.target.value) + Number(hueOffset)) % maxHue;
  docElem.style.setProperty('--hue-one', hueOne);
  docElem.style.setProperty('--hue-two', hueTwo);
});

$('#border-radius-control').addEventListener('input', (e) => {
  docElem.style.setProperty('--border-radius', e.target.value + '%');
});