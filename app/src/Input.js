import THREE from 'three'
import events from './events';
import PointerLockControls from './lib/PointerLockControls';
import Component from './Component';
import $ from './constants';

//refactor this shit
class Input extends Component {
  constructor(parent, props = {}) {
    super(parent);

    this.controls = new PointerLockControls(parent.camera);
    this.props = props;
    this.travelMode = $.TravelModes.God;
    this.fly = 0;

    this.keyMap = {};

    let onKeyDown = (event) => {
      if (!this.keyMap[event.keyCode]) {
        this.keyMap[event.keyCode] = true;
        events.emit('onkeydown', {key: event.keyCode, scene: this.props.scene});
      }

      switch (event.keyCode) {
        //case 38: // up
        case 87: // w
          this.moveForward = true;
          break;

        //case 37: // left
        case 65: // a
          this.moveLeft = true; break;

        //case 40: // down
        case 83: // s
          this.moveBackward = true;
          break;

        //case 39: // right
        case 68: // d
          this.moveRight = true;
          break;

        case 32: // space
          if (this.travelMode === $.TravelModes.Normal) {
            if (this.canJump === true) this.velocity.y += 350;
            this.canJump = false;
          } else {
            if (this.shiftDown) {
              this.fly = -1;
            } else {
              this.fly = 1;
            }
          }
          break;
        case 13: // enter
          this.action = true;
          break;
        case 16:
          this.shiftDown = true;
          break;

        case 66: // b
          //this.menuBuildDown = true;
          break;

        //default: console.info("unhandled key: "+event.keyCode);
      }
    };

    let onKeyUp = (event) => {
      if (this.keyMap[event.keyCode]) {
        this.keyMap[event.keyCode] = false;
        events.emit('onkeyup', {key: event.keyCode, scene: this.props.scene});//events.MenuBuild, scene);
      }

      switch( event.keyCode ) {
        //case 38: // up
        case 87: // w
          this.moveForward = false;
          break;

        //case 37: // left
        case 65: // a
          this.moveLeft = false;
          break;

        //case 40: // down
        case 83: // s
          this.moveBackward = false;
          break;

        //case 39: // right
        case 68: // d
          this.moveRight = false;
          break;

        case 32: // space
          this.fly = 0;
          break;

        case 13: // enter
          this.action = false;
          break;
        case 16:
          this.shiftDown = false;
          break;

        case 66:
          this.menuBuildDown = false;
          this.menuBuildWasDown = false;
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

    if (this.travelMode === $.TravelModes.Normal) {
      this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    } else {
      this.velocity.y = this.fly * 100.0;
    }

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
      events.emit(events.DoAction, scene);
    }

    if (this.menuBuildDown && !this.menuBuildWasDown) {
      //events.emit(events.MenuBuild, scene);
      this.menuBuildWasDown = true;
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