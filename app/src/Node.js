import _ from 'lodash';
import THREE from 'three'

class Node extends THREE.Object3D {
  constructor(props = {}) {
    super();
    this.props = props;
    this.components = {};
  }

  update(dt, scene) {
    _.map(this.components, (component) => component.update(dt, scene));
  }

  destroy() {
    _.map(this.components, (component) => component.destroy());
  }
}

export default Node;