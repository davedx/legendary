import _ from 'lodash';
import THREE from 'three';
import Cube from '../Cube';
import Plane2D from './Plane2D';
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

  addGroupToGrid(group) {
    let x = this.window.position.x+20, y = this.window.position.y-20, step = 120;
    _.each(group, (block, key) => {
      let cube = new Plane2D({
        name: 'block',
        size: {w: 100, h: 100},
        position: {x: x, y: y, z: -100},
        texture: block.texture
      });
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

export default BuildHotBar;