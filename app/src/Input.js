import THREE from 'three'
import events from './events';
import Component from './Component';
import $ from './constants';

class Input extends Component {
  constructor(parent, props = {}) {
    super(parent, props);

    this.handler = '';
    this.keyMap = {};

    events.on('setactiveinputhandler', this.setActiveInputHandler, this);

    let onKeyDown = (event) => {
      //T=84, Q=81
//      console.info(event.keyCode);
      if (!this.keyMap[event.keyCode]) {
        this.keyMap[event.keyCode] = true;
        const evName = this.handler != '' ? `${this.handler}:onkeydown` : 'onkeydown';
        events.emit(evName, {key: event.keyCode});
      }
    };

    let onKeyUp = (event) => {
      if (this.keyMap[event.keyCode]) {
        this.keyMap[event.keyCode] = false;
        const evName = this.handler != '' ? `${this.handler}:onkeyup` : 'onkeyup';
        events.emit(evName, {key: event.keyCode});
      }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
  }

  setActiveInputHandler(options) {
    this.handler = options.handler;
  }

  destroy() {
    events.off('setactiveinputhandler', this.setActiveInputHandler, this);
  }
}

export default Input;