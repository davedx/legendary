import THREE from 'three'
import events from './events';
import Component from './Component';
import $ from './constants';

//refactor this shit
class Input extends Component {
  constructor(parent, props = {}) {
    super(parent);

    this.props = props;
    this.handler = '';

    this.keyMap = {};

    events.on('setactiveinputhandler', (options) => {
      this.handler = options.handler;
    });

    let onKeyDown = (event) => {
      if (!this.keyMap[event.keyCode]) {
        this.keyMap[event.keyCode] = true;
        const evName = this.handler != '' ? `${this.handler}:onkeydown` : 'onkeydown';
        //console.info("emitting ", evName);
        events.emit(evName, {key: event.keyCode});
      }

      switch (event.keyCode) {
        case 32: // space
          if (this.travelMode === $.TravelModes.Normal) {
            //if (this.canJump === true) this.velocity.y += 350;
            this.canJump = false;
          } else {
            if (this.shiftDown) {
              this.fly = -1;
            } else {
              this.fly = 1;
            }
          }
          break;

        case 16:
          this.shiftDown = true;
          break;

        //default: console.info("unhandled key: "+event.keyCode);
      }
    };

    let onKeyUp = (event) => {
      if (this.keyMap[event.keyCode]) {
        this.keyMap[event.keyCode] = false;
        events.emit('onkeyup', {key: event.keyCode});
      }

      switch(event.keyCode) {
        case 32: // space
          this.fly = 0;
          break;

        case 16:
          this.shiftDown = false;
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    this.canJump = false;
  }

  // getObject() {
  //   return this.controls.getObject();
  // }
}

export default Input;