import _ from 'lodash';
import THREE from 'three';
import Cube from '../Cube';
import events from '../events';
import Menu from './Menu';
import $ from '../constants';

class TriggerMenu extends Menu {
  constructor(scene, props = {}) {
    props.activationKey = 84; //T
    props.handler = 'build';
    props.window = {
      centerHorizontal: true,
      centerVertical: true,
      width: 800,
      height: 600
    };
    super(scene, props);

    this.setTitle('Trigger Menu');

    //
    //this.addGroupToGrid(buildMaterials1);
    let x = this.window.position.x+20, y = this.window.position.y-20, step = 120;
    this.addButton(0, 0, x, y, {
      texture: 'btn-off.jpg'
    });
    this.addButton(1, 0, x + 120, y, {
      texture: 'btn-spawn.jpg'
    });
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

export default TriggerMenu;