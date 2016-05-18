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
    this.mesh.name = this.props.name;

    if (props.position) {
      this.mesh.position.set(props.position.x, props.position.y, props.position.z);
    }
  }
}

export default Cube;