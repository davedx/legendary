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
  constructor(scene) {
    this.grid = [];
    this.root = new THREE.Object3D();
    this.root.visible = false;
    scene.add(this.root);

    events.on('onkeydown', (options) => {
      if (options.key === 66) {
        this.root.visible = !this.root.visible
      }
    });
    //TODO: set in position/rotation so it's background
    let menuPlane = new Plane({color: [1, 0, 0]});
    this.root.add(menuPlane.mesh);
  }

  setTitle(title) {
    //
  }

  addGroupToGrid(group) {
    let x = 0, y = 0, step = 100;
    _.each(group, (block, key) => {
      console.info("key: ", key, block);
      let cube = new Cube({name: 'cube', position: new THREE.Vector3(x, y, -200), texture: block.texture});
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