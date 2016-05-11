import THREE from 'three'

class Node extends THREE.Object3D {
  constructor(props = {}) {
  	super();
    this.props = props;
    this.components = {};
  }

  update(dt, scene) {
    for (let component in this.components) {
      this.components[component].update(dt, scene);
    }
  }
}

export default Node;