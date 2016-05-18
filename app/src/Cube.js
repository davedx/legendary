import _ from 'lodash';
import THREE from 'three';
import Node from './node';
import $ from './constants';

class Cube {
  constructor(props = {}) {
    this.props = props;

    let size = props.size ? props.size : $.Size.Cube;
    this.texture = new THREE.TextureLoader().load(`assets/${props.texture}`);
    if (_.isObject(size)) {
      console.info("setting size to: ", size);
      this.geometry = new THREE.BoxBufferGeometry(size.x, size.y, size.z);
    } else {
      console.info("setting size to: ", size);
      this.geometry = new THREE.BoxBufferGeometry(size, size, size);
    }
    this.material = new THREE.MeshBasicMaterial({ map: this.texture });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.userData.name = this.props.name;

    if (props.unitPosition) {
      Cube.setFromUnitPosition(this.mesh, props.unitPosition);
    }
    if (props.position) {
      this.mesh.position.set(props.position.x, props.position.y, props.position.z);
    }
  }

  static setFromUnitPosition(mesh, unitPosition, size) {
    mesh.userData.unitPosition = unitPosition;
    let pos = {
      x: unitPosition.x * $.Size.Cube,
      y: unitPosition.y * $.Size.Cube + 0.5*$.Size.Cube,
      z: unitPosition.z * $.Size.Cube
    };
    if (_.isObject(size)) {
      pos.y -= $.Size.Cube*0.5 - size.y*0.5;
    }
    mesh.position.set(pos.x, pos.y, pos.z);
  }

  static calculateRoundedPosition(x, y, z) {
    let len = $.Size.Cube;
    //return {x: x % len * len}
  }
}

export default Cube;