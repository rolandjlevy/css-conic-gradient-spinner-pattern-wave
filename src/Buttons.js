import UI from './UI.js';
import Utils from './Utils.js';

export default class Buttons {
  constructor(inputs) {
    this.playState = UI.getCSSVar('--play-state');
    this.chromeAgent = navigator.userAgent.indexOf('Chrome') > -1;
    this.safariAgent = navigator.userAgent.indexOf('Safari') > -1;
    this.init(inputs);
  }
  init(inputs) {
    // Play / pause button
    UI.$('#play-state').addEventListener('click', (e) => {
      this.playState = this.playState == 'running' ? 'paused' : 'running';
      UI.docElem().style.setProperty('--play-state', this.playState);
      UI.$('.btn-text').textContent = this.playState == 'running' ? 'Pause' : 'Play';
      UI.$('.fas').classList.toggle('fa-play');
      UI.$('.fas').classList.toggle('fa-pause');
    });

    // Randomise button
    UI.$('#randomise').addEventListener('click', (e) => {
      Object.entries(inputs).forEach(([id, obj]) => {
        UI.$(`#${id}`).value = Utils.randomNum(Number(obj.min), Number(obj.max));
        UI.$(`#${id}`).dispatchEvent(new Event('input'));
      });
    });

    // workaround for Safari input event non-detection
    if ((this.chromeAgent && this.safariAgent) == false) {
      UI.$('#speed').addEventListener('mousedown', (e) => {
        UI.docElem().style.setProperty('--play-state', 'paused');
      });
      UI.$('#speed').addEventListener('mouseup', (e) => {
        if (this.playState == 'running') UI.docElem().style.setProperty('--play-state', 'running');
      });
    }
  }
}


