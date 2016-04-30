import THREE from 'three'
import PointerLockControls from './lib/PointerLockControls';
import Component from './Component';

class Input extends Component {
  constructor(parent, props = {}) {
    super(parent);

    this.controls = new PointerLockControls(parent.camera);
    this.props = props;

    let onKeyDown = (event) => {
      switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
          this.moveForward = true;
          break;

        case 37: // left
        case 65: // a
          this.moveLeft = true; break;

        case 40: // down
        case 83: // s
          this.moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          this.moveRight = true;
          break;

        case 32: // space
          if (this.canJump === true) this.velocity.y += 350;
          this.canJump = false;
          break;
        case 13: // enter
          this.action = true;
          break;

        //default: console.info("unhandled key: "+event.keyCode);
      }
    };

    let onKeyUp = (event) => {
      switch( event.keyCode ) {
        case 38: // up
        case 87: // w
          this.moveForward = false;
          break;

        case 37: // left
        case 65: // a
          this.moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          this.moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          this.moveRight = false;
          break;

        case 13: // enter
          this.action = false;
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.canJump = false;
    this.action = false;

    this.prevTime = performance.now();
    this.velocity = new THREE.Vector3();

    this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
  }

  update(scene) {
    const velocity = this.props.velocity || 400.0;

    this.raycaster.ray.origin.copy(this.controls.getObject().position);
    this.raycaster.ray.origin.y -= 10;

    const intersections = this.raycaster.intersectObjects(scene.children);
    const isOnObject = intersections.length > 0;

    const time = performance.now();
    const delta = (time - this.prevTime) / 1000;

    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;

    this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    if (this.moveForward) {
      this.velocity.z -= velocity * delta;
    }
    if (this.moveBackward) {
      this.velocity.z += velocity * delta;
    }

    if (this.moveLeft) {
      this.velocity.x -= velocity * delta;
    }
    if (this.moveRight) {
      this.velocity.x += velocity * delta;
    }

    if (isOnObject) {
      this.velocity.y = Math.max(0, this.velocity.y);

      this.canJump = true;
    }

    if (this.action) {
      this.parent.action.do(scene);
    }

    this.controls.getObject().translateX(this.velocity.x * delta);
    this.controls.getObject().translateY(this.velocity.y * delta);
    this.controls.getObject().translateZ(this.velocity.z * delta);

    if (this.controls.getObject().position.y < 10) {
      this.velocity.y = 0;
      this.controls.getObject().position.y = 10;

      this.canJump = true;
    }

    this.prevTime = time;
  }

  getObject() {
    return this.controls.getObject();
  }
}

export default Input;