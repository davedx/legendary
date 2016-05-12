import _ from 'lodash';
import THREE from 'three';
import Cube from '../Cube';
import events from '../events';
import Menu from './Menu';
import $ from '../constants';

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
  GrassThick: {
    name: 'Thick Grass',
    texture: 'grass.jpg',
    shape: 'Cube'
  }
};

class BuildMenu extends Menu {
  constructor(scene, props = {}) {
    props.activationKey = 66;
    props.handler = 'build';
    props.window = {
      centerHorizontal: true,
      centerVertical: true,
      width: 800,
      height: 600
    };
    super(scene, props);

    this.setTitle('Build HotBar');
    this.addGroupToGrid(buildMaterials1);
  }

  addGroupToGrid(group) {
    let x = -100, y = 0, step = 120;
    _.each(group, (block, key) => {
      let cube = new Cube({name: 'cube', size: 100, position: new THREE.Vector3(x, y, -100), texture: block.texture});
      this.grid.push({
        mesh: cube.mesh,
        props: block
      });
      this.root.add(cube.mesh);
      x += $.Menus.Step;
      if (x > 400) {
        x = 0;
        y += $.Menus.Step;
      }
    });
  }
}

export default BuildMenu;