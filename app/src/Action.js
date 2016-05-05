import THREE from 'three'
import _ from 'lodash';
import Component from './Component';
import events from './events';

class Action extends Component {
  constructor(parent) {
    super(parent);
    this.actionRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 5000);
    this.timer = 0;
    setInterval(() => this.updateTimer(), 100);

    //TODO: unsubscribes?
    events.on(events.SelectBuildMaterial, this.selectBuildMaterial, this);
    events.on(events.DoAction, this.doAction, this);
  }

  updateTimer() {
    if (this.timer > 0) {
      this.timer = Math.max(0, this.timer - 100);
    }
  }

  // bug: can clone ground
  doAction(scene) {
    if (this.timer > 0) {
      return;
    }
    this.actionRaycaster.ray.origin.copy(this.parent.controls.getObject().position);
    this.actionRaycaster.ray.direction.copy(this.parent.camera.getWorldDirection());

    const intersections = this.actionRaycaster.intersectObjects(scene.children);
    const first = _.first(intersections);
    if (first) {
      this.timer = 200;
      // center point
      let center = first.object.position.clone();
      //console.info("center: ", center);
      // direction
      let direction = first.face.normal.clone().multiplyScalar(100);
      //console.info("dir: ", direction);
      center = center.add(direction);
      console.info("old pos: ",center," new pos: ",center);
      let newObject = first.object.clone();
      newObject.position.set(center.x, center.y, center.z);
      scene.add(newObject);
    }
    //console.info("intersects: ", intersections[0]);//, "ray origin: ", this.actionRaycaster.ray.origin);
  }
}

export default Action;