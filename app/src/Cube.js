import THREE from 'three';
import Node from './node';
import $ from './constants';

class Cube {
  
  constructor(props = {}) {
    this.props = props;

    let size = props.size ? props.size : $.Blocks.Size;
    this.texture = new THREE.TextureLoader().load(`assets/${props.texture}`);
    this.geometry = new THREE.BoxBufferGeometry(size, size, size);
    this.material = new THREE.MeshBasicMaterial({ map: this.texture });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = this.props.name;

    if (props.position) {
      this.mesh.position.set(props.position.x, props.position.y, props.position.z);
    }
  }
}

export default Cube;