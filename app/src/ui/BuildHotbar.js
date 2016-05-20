import _ from 'lodash';
import THREE from 'three';
import Cube from '../Cube';
import Plane2D from './Plane2D';
import events from '../events';
import Menu from './Menu';
import $ from '../constants';
import state from '../state';
import layout from './build_hotbar.json';

class BuildHotBar extends Menu {
  constructor(scene) {
    super(scene, layout);

    this.toggleActive();
    state.currentBlock = _.first(this.grid[0]);
  }

  addButton(i, j, x, y, block) {
    const btn = super.addButton(i, j, x, y, block);
    btn.spawner = new Cube({
      name: 'cube',
      size: $.Size[block.shape],
      position: new THREE.Vector3(0, 0, 0),
      texture: block.texture
    });
    return btn;
  }

  onCursorMoved(x, y) {
    let gridEntry = this.grid[0][x];
    state.currentBlock = gridEntry;
  }
}

export default BuildHotBar;