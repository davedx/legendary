import _ from 'lodash';
import THREE from 'three';
import Cube from '../Cube';
import Plane2D from './Plane2D';
import events from '../events';
import Menu from './Menu';
import $ from '../constants';
import state from '../state';

const buildMaterials1 = {
  Crate: {
    name: 'Crate',
    texture: 'crate.gif',
    shape: 'Cube'
  },
  Grass: {
    name: 'Grass',
    texture: 'grass.jpg',
    shape: 'Cube'
  },
  TriggerArea: {
    name: 'Trigger Area',
    texture: 'triggerarea.jpg',
    shape: 'FlatCube'
  }
};

class BuildHotBar extends Menu {
  constructor(scene, props = {}) {
    props.window = {
      centerHorizontal: true,
      alignBottom: true,
      width: 600,
      height: 200
    };
    super(scene, props);

    this.setTitle('Build HotBar');
    this.addGroupToGrid(buildMaterials1);
    this.toggleActive();
  }

  onCursorMoved(x, y) {
    let gridEntry = this.grid[0][x];
    state.currentBlock = gridEntry;
  }

  addGroupToGrid(group) {
    let x = this.window.position.x+20, y = this.window.position.y-20, step = 120,
      i = 0, j = 0;
    _.each(group, (block, key) => {
      let cube = new Plane2D({
        name: 'block',
        size: {w: 100, h: 100},
        position: {x: x, y: y, z: -100},
        texture: block.texture
      });
      console.info("sz: ", $.Size[block.shape]);
      this.grid[j][i] = {
        mesh: cube.mesh,
        spawner: new Cube({
          name: 'cube',
          size: $.Size[block.shape],
          position: new THREE.Vector3(0, 0, 0),
          texture: block.texture
        }),
        props: block,
        gridPosition: [i, j]
      };
      this.root.add(cube.mesh);
      x += $.Menus.Step;
      i++;
      if (x > 400) {
        x = 0;
        i = 0;
        y += $.Menus.Step;
        j++;
      }
    });
    state.currentBlock = _.first(this.grid[0]);
  }
}

export default BuildHotBar;