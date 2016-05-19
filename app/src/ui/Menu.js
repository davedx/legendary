import THREE from 'three';
import Plane2D from './Plane2D';
import events from '../events';
import Component from '../Component';
import Layouts from './Layouts';
import $ from '../constants';

class Menu extends Component {
  constructor(parent, props = {}) {
    super(parent, props);
    // this.props = props;
    this.grid = [[]];
    this.root = new THREE.Object3D();
    this.root.visible = false;

    if (this.props.handler) {
      this.keydownHandler = `${this.props.handler}:onkeydown`;
    } else {
      this.keydownHandler = 'onkeydown';
    }

    parent.add(this.root);

    if (this.props.activationKey) {
      events.on('onkeydown', this.downHandler, this);
    }

    events.on(this.keydownHandler, this.downHandler, this);
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
      position: {x: this.window.position.x+10, y: this.window.position.y-10, z: -100},
      gridPosition: [0, 0]
    });
    this.root.add(menuPlane.mesh);
    this.root.add(this.cursor.mesh);
  }

  destroy() {
    events.off(this.keydownHandler, this.downHandler, this);
    if (this.props.activationKey) {
      events.off('onkeydown', this.downHandler, this);
    }
  }

  downHandler(options) {
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
      case this.props.activationKey:
        this.toggleActive();
        break;
      default:
        break; // console.info(options.key); break;
    }
  }

  toggleActive() {
    this.root.visible = !this.root.visible;
    const handler = this.root.visible ? 'build' : '';
    events.emit('setactiveinputhandler', {handler: handler});
  }

  addButton(i, j, x, y, block) {
    const plane = new Plane2D({
      name: 'block',
      size: {w: 100, h: 100},
      rotation: {x: 0, y: 0, z: 0},
      position: {x: x, y: y, z: -100},
      texture: block.texture
    });
    //console.info("sz: ", $.Size[block.shape]);
    this.grid[j][i] = {
      mesh: plane.mesh,
      props: block,
      gridPosition: [i, j]
    };
    this.root.add(plane.mesh);
    return this.grid[j][i];
  }

  moveCursor(x, y) {
    //TODO: restrict to menu grid
    //TODO: for buildhotbar, select build material :D
    //console.info("mv cursor: ", x, y);
    let cursorPos = this.cursor.props.gridPosition;
    let newPosX = Math.min(Math.max(0, cursorPos[0] + x), this.grid[cursorPos[1]].length-1);
    this.cursor.props.gridPosition[0] = newPosX;
    //console.info("->: ", this.cursor.props.gridPosition);
    this.cursor.setPosition(this.window.position.x+10 + newPosX*$.Menus.Step, this.window.position.y-10, -100);
    if (this.onCursorMoved) {
      this.onCursorMoved(newPosX);//this.grid[newPosX][0]);
    }
  }

  setTitle(title) {
    //
  }
}

export default Menu;