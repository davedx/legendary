import _ from 'lodash';
import THREE from 'three';
import Cube from '../Cube';
import Plane from '../Plane';
import events from '../events';

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
  }
};

class Menu {
  constructor(parent) {
    this.grid = [];
    this.root = new THREE.Object3D();
    this.root.visible = false;
    parent.add(this.root);

    events.on('onkeydown', (options) => {
      if (options.key === 66) {
        this.root.visible = !this.root.visible
      }
    });
    let menuPlane = new Plane({color: [0.5, 0.8, 1], position: {x: 0, y: 0, z: -200}, rotation: {x: 0, y: 0, z: -Math.PI / 2}});
    this.root.add(menuPlane.mesh);
  }

  setTitle(title) {
    //
  }

  addGroupToGrid(group) {
    let x = -100, y = 0, step = 120;
    _.each(group, (block, key) => {
      //console.info("key: ", key, block);
      let cube = new Cube({name: 'cube', size: 100, position: new THREE.Vector3(x, y, -100), texture: block.texture});
      this.grid.push({
        mesh: cube.mesh,
        props: block
      });
      this.root.add(cube.mesh);
      x += step;
      if (x > 400) {
        x = 0;
        y += step;
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