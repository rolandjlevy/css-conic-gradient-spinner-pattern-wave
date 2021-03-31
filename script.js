const $ = (el) => document.querySelector(el);

const docElem = document.documentElement;
const maxSpeed = $('#speed').max;
const minSpeed = $('#speed').min;
const maxHue = $('#colour').max;
const hueOffset = getComputedStyle(docElem).getPropertyValue('--hue-offset').trim();
let playState = getComputedStyle(docElem).getPropertyValue('--play-state').trim();
// let speed = getComputedStyle(docElem).getPropertyValue('--speed').trim();
const amount = 100;
let counter = 0;

while (counter++ < amount) {
  const li = document.createElement('li');
  li.setAttribute('data-id', counter);
  li.style.setProperty('--delay', `-${counter/12}s`);
  // li.style.setProperty('--speed', speed);
  const dir = counter % 2 ? 'normal' : 'reverse';
  li.classList = `conic-spinner ${dir}`;
  $('.spinners').appendChild(li);
}

$('#speed').addEventListener('input', (e) => {
  const speed = Number(maxSpeed) + Number(minSpeed) - Number(e.target.value);
  console.log(speed.toFixed(2) + "s")
  docElem.style.setProperty('--speed', speed.toFixed(2) + "s");
});

$('#colour').addEventListener('input', (e) => {
  const hueOne = e.target.value;
  const hueTwo = (Number(e.target.value) + Number(hueOffset)) % maxHue;
  docElem.style.setProperty('--hue-one', hueOne);
  docElem.style.setProperty('--hue-two', hueTwo);
});

$('#border-radius').addEventListener('input', (e) => {
  docElem.style.setProperty('--border-radius', e.target.value + '%');
});

$('#play-state').addEventListener('click', (e) => {
  const state = playState ? 'paused' : 'running';
  docElem.style.setProperty('--play-state', state);
  $('.btn-text').textContent = playState ? 'Play' : 'Pause';
  $('.fas').classList.toggle('fa-play');
  $('.fas').classList.toggle('fa-pause');
  playState = !playState;
});