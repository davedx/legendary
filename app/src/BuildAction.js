import THREE from 'three'
import _ from 'lodash';
import Component from './Component';
import events from './events';
import state from './state';

class BuildAction extends Component {
  constructor(parent, props = {}) {
    super(parent, props);
    this.actionRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 5000);
    this.timer = 0;
    this.tryAction = false;

    events.on('onkeydown', this.downHandler, this);
    events.on('onkeyup', this.upHandler, this);
  }

  destroy() {
    events.off('onkeydown', this.downHandler, this);
    events.off('onkeyup', this.upHandler, this);
  }

  upHandler(options) {
    if (options.key === 13) {
      this.tryAction = false;
    }
  }

  downHandler(options) {
    if (options.key === 13) {
      this.tryAction = true;
    }
  }

  update(dt, scene) {
    if (this.timer > 0) {
      this.timer = Math.max(0, this.timer - dt);
    } else if (this.tryAction) {
      this.doAction(scene);
    }
  }

  // bug: can't build on ground?
  doAction(scene) {
    const moveAction = this.parent.components.moveAction;
    this.actionRaycaster.ray.origin.copy(moveAction.controls.getObject().position);
    this.actionRaycaster.ray.direction.copy(this.parent.camera.getWorldDirection());

    const intersections = this.actionRaycaster.intersectObjects(scene.children);
    const first = _.first(intersections);
    if (first) {
      this.timer = this.props.actionInterval;
      // center point
      let center = first.object.position.clone();
      //console.info("center: ", center);
      // direction
      let direction = first.face.normal.clone().multiplyScalar(100);
      //console.info("dir: ", direction);
      center = center.add(direction);
      //console.info("old pos: ",center," new pos: ",center);
      let newObject = state.currentBlock.spawner.mesh.clone();
      newObject.position.set(center.x, center.y, center.z);
      scene.add(newObject);
    }
    //console.info("intersects: ", intersections[0]);//, "ray origin: ", this.actionRaycaster.ray.origin);
  }
}

export default BuildAction;