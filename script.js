const $ = (el) => document.querySelector(el);

const docElem = document.documentElement;
const maxSpeed = $('#speed').max;
const minSpeed = $('#speed').min;
const maxHue = $('#colour').max;
const hueOffset = getComputedStyle(docElem).getPropertyValue('--hue-offset').trim();
let playState = getComputedStyle(docElem).getPropertyValue('--play-state').trim();
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
});

$('#border-radius').addEventListener('input', (e) => {
  docElem.style.setProperty('--border-radius', e.target.value + '%');
});

$('#play-state').addEventListener('click', (e) => {
  playState = playState == 'running' ? 'paused' : 'running';
  docElem.style.setProperty('--play-state', playState);
  $('.btn-text').textContent = playState == 'running' ? 'Pause' : 'Play';
  $('.fas').classList.toggle('fa-play');
  $('.fas').classList.toggle('fa-pause');
});

$('#speed').addEventListener('input', (e) => {
  const speed = Number(maxSpeed) + Number(minSpeed) - Number(e.target.value);
  docElem.style.setProperty('--speed', speed.toFixed(2).toString() + "s");
});

const chromeAgent = navigator.userAgent.indexOf('Chrome') > -1;
const safariAgent = navigator.userAgent.indexOf('Safari') > -1;

// workaround for Safari input event non-detection
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