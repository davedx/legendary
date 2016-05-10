import _ from 'lodash';
import THREE from 'three';
import Cube from '../Cube';
import Plane from '../Plane';
import events from '../events';
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

class Menu {
  constructor(parent) {
    this.grid = [];
    this.root = new THREE.Object3D();
    this.root.visible = false;
    parent.add(this.root);

    events.on('onkeydown', (options) => {
      switch (options.key) {
        case 38: // up
          this.moveCursor(0, -1); break;
        case 37: // left
          this.moveCursor(-1, 0); break;
        case 40: // down
          this.moveCursor(0, 1); break;
        case 39: // right
          this.moveCursor(1, 0); break;
        case 66:
          this.root.visible = !this.root.visible;
          break;
      }
    });

    let menuPlane = new Plane({color: [0.5, 0.8, 1], size: {w: 800, h: 500}, position: {x: 0, y: 0, z: -200}, rotation: {x: 0, y: 0, z: -Math.PI / 2}});
    this.cursor = new Plane({color: [0.8, 0.98, 1], size: {w: 120, h: 120}, position: {x: -100, y: -0, z: -100}, rotation: {x: 0, y: 0, z: -Math.PI / 2}});
    this.root.add(menuPlane.mesh);
    this.root.add(this.cursor.mesh);
  }

  moveCursor(x, y) {
    console.info("mv cursor: ", x, y);
    this.cursor.mesh.translateX($.Menus.Step*x);
    this.cursor.mesh.translateY(-$.Menus.Step*y);
  }

  setTitle(title) {
    //
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

class BuildMenu extends Menu {
  constructor(scene) {
    super(scene);

    this.setTitle('Build menu');
    this.addGroupToGrid(buildMaterials1);
  }
}

export default BuildMenu;