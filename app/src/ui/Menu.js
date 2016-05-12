import THREE from 'three';
import Plane2D from './Plane2D';
import events from '../events';
import Layouts from './Layouts';
import $ from '../constants';

class Menu {
  constructor(parent, props = {}) {
    this.props = props;
    this.grid = [];
    this.root = new THREE.Object3D();
    this.root.visible = false;

    if (this.props.handler) {
      this.keydownHandler = `${this.props.handler}:onkeydown`;
    } else {
      this.keydownHandler = 'onkeydown';
    }

    parent.add(this.root);

    if (this.props.activationKey) {
      events.on('onkeydown', (options) => {
        if (options.key === this.props.activationKey) {
          this.toggleActive();
        }
      });
    }

    events.on(this.keydownHandler, (options) => {
      switch (options.key) {
        case 38: // up
          this.moveCursor(0, -1); break;
        case 37: // left
          this.moveCursor(-1, 0); break;
        case 40: // down
          this.moveCursor(0, 1); break;
        case 39: // right
          this.moveCursor(1, 0); break;
        case 13:
          break;
        default:
          if (options.key === this.props.activationKey) {
            this.toggleActive();
          }
          break; // console.info(options.key); break;
      }
    });
    // calculate positions
    let {size, position} = Layouts.flex(this.props.window, true);
    position.z = -200;
    //console.info('setting window to: ', position);
    this.window = {
      size: size,
      position: position
    };
    //console.info("sz: ", size, "pos: ", position);
    let menuPlane = new Plane2D({color: [0.5, 0.8, 1], size: size, position: position});
    this.cursor = new Plane2D({
      color: [0.8, 0.98, 1],
      size: {w: 120, h: 120},
      position: {x: this.window.position.x+10, y: this.window.position.y-10, z: -100}
    });
    this.root.add(menuPlane.mesh);
    this.root.add(this.cursor.mesh);
  }

  toggleActive() {
    this.root.visible = !this.root.visible;
    const handler = this.root.visible ? 'build' : '';
    events.emit('setactiveinputhandler', {handler: handler});
  }

  moveCursor(x, y) {
    //TODO: restrict to menu grid
    //TODO: for buildhotbar, select build material :D
    console.info("mv cursor: ", x, y);
    this.cursor.mesh.translateX($.Menus.Step*x);
    this.cursor.mesh.translateY(-$.Menus.Step*y);
  }

  setTitle(title) {
    //
  }
}

export default Menu;