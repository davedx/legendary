import THREE from 'three'
import _ from 'lodash';
import Component from './Component';
import events from './events';
import PointerLockControls from './lib/PointerLockControls';
import $ from './constants';

class MoveAction extends Component {
  constructor(parent, props = {}) {
    super(parent);

    this.props = props;
    this.controls = new PointerLockControls(parent.camera);
    this.travelMode = $.TravelModes.Normal;
    this.fly = 0;
    this.moveMap = {x: 0, z: 0, jump: 0};

    this.velocity = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

    events.on('onkeydown', (options) => {
      //console.info(options);
      switch (options.key) {
        case 87:
          this.moveMap.z = -1; break;
        case 65:
          this.moveMap.x = -1; break;
        case 83:
          this.moveMap.z = 1; break;
        case 68:
          this.moveMap.x = 1; break;
        case 32:
          this.doJump();
          //this.canJump = false;
          //this.moveMap.jump = true;
          break;
      }
    });
    events.on('onkeyup', (options) => {
      switch (options.key) {
        case 87:
          this.moveMap.z = 0; break;
        case 65:
          this.moveMap.x = 0; break;
        case 83:
          this.moveMap.z = 0; break;
        case 68:
          this.moveMap.x = 0; break;
        case 32:
          this.moveMap.jump = false; break;
      }
    });
  }

  doJump() {
    if (this.canJump === true) {
      this.canJump = false;
      this.velocity.y += 15;
    }
  }

  update(dt, scene) {
    const velocity = this.props.velocity || 400.0;

    this.raycaster.ray.origin.copy(this.controls.getObject().position);
    this.raycaster.ray.origin.y -= 10;

    const intersections = this.raycaster.intersectObjects(scene.children);
    const isOnObject = intersections.length > 0;

    if (this.travelMode === $.TravelModes.Normal) {
      this.velocity.y -= 9.8 * 5.0 * dt; // 100.0 = mass
    } else {
      this.velocity.y = this.fly * 100.0;
    }

    this.velocity.z = this.moveMap.z * velocity * dt;
    this.velocity.x = this.moveMap.x * velocity * dt;

    if (isOnObject) {
      this.velocity.y = Math.max(0, this.velocity.y);

      this.canJump = true;
    }
    if (this.velocity.x !== 0) {
      console.info("v: ", this.velocity, "dt: ", dt);
    }
    this.controls.getObject().translateX(this.velocity.x);
    this.controls.getObject().translateY(this.velocity.y);
    this.controls.getObject().translateZ(this.velocity.z);

    if (this.controls.getObject().position.y < 10) {
      this.velocity.y = 0;
      this.controls.getObject().position.y = 10;

      this.canJump = true;
    }
  }
}

export default MoveAction;