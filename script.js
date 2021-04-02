const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);
const docElem = document.documentElement;
const getCSSVar = (prop) => getComputedStyle(docElem).getPropertyValue(prop).trim();
const randomNum = (min, max) => Number(Math.random() * (max - min) + min).toFixed(2);

const maxSpeed = $('#speed').max;
const minSpeed = $('#speed').min;
const maxHue = $('#colour').max;
const hueOffset = getCSSVar('--hue-offset');
let playState = getCSSVar('--play-state');
const amount = 100;
let counter = 0;

while (counter++ < amount) {
  const li = document.createElement('li');
  li.style.setProperty('--delay', `-${counter/12}s`);
  const dir = counter % 2 ? 'normal' : 'reverse';
  li.classList = `conic-spinner ${dir}`;
  $('.spinners').appendChild(li);
}

$('#colour').addEventListener('input', (e) => {
  const hueOne = e.target.value;
  const hueTwo = (Number(e.target.value) + Number(hueOffset)) % maxHue;
  docElem.style.setProperty('--hue-one', hueOne);
  docElem.style.setProperty('--hue-two', hueTwo);
  // console.log({hueOne, hueTwo});
});

$('#border-radius').addEventListener('input', (e) => {
  docElem.style.setProperty('--border-radius', e.target.value + '%');
  // console.log({'border-radius value':e.target.value});
});

$('#shape').addEventListener('input', (e) => {
  docElem.style.setProperty('--shape', e.target.value + "deg");
  // console.log({'shape value':e.target.value});
});

$('#speed').addEventListener('input', (e) => {
  const speed = Number(maxSpeed) + Number(minSpeed) - Number(e.target.value);
  docElem.style.setProperty('--speed', speed.toFixed(2).toString() + "s");
  // console.log({speed});
});

// workaround for Safari input event non-detection
const chromeAgent = navigator.userAgent.indexOf('Chrome') > -1;
const safariAgent = navigator.userAgent.indexOf('Safari') > -1;

if ((chromeAgent && safariAgent) == false) {
  $('#speed').addEventListener('mousedown', (e) => {
    docElem.style.setProperty('--play-state', 'paused');
  });

  $('#speed').addEventListener('mouseup', (e) => {
    if (playState == 'running') {
      docElem.style.setProperty('--play-state', 'running');
    }
  });
}

$('#play-state').addEventListener('click', (e) => {
  playState = playState == 'running' ? 'paused' : 'running';
  docElem.style.setProperty('--play-state', playState);
  $('.btn-text').textContent = playState == 'running' ? 'Pause' : 'Play';
  $('.fas').classList.toggle('fa-play');
  $('.fas').classList.toggle('fa-pause');
});

// create slider objects
const sliders = {};
$$('ul.controls > li > section > input.slider').forEach(item => {
  const { id, min, max, value } = item;
  sliders[id] = { min, max, value };
});

// randomise settings
$('#randomise').addEventListener('click', (e) => {
  Object.entries(sliders).forEach(([id, obj]) => {
    $(`#${id}`).value = randomNum(Number(obj.min), Number(obj.max));
    $(`#${id}`).dispatchEvent(new Event('input'));
  });
});