import THREE from 'three';
import Node from './node';
import $ from './constants';

class Plane {
  constructor(props = {}) {
    this.props = props;

    let size = props.size ? props.size : $.Planes.Size;

    this.geometry = new THREE.PlaneGeometry(size.h, size.w, 100, 100);
    if (props.rotation) {
      this.geometry.rotateX(props.rotation.x);
      this.geometry.rotateY(props.rotation.y);
      this.geometry.rotateZ(props.rotation.z);
    }
    if (!props.texture) {
      for (let i = 0, l = this.geometry.faces.length; i < l; i ++) {
        let face = this.geometry.faces[i];
        if (props.randomColors) {
          face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
          face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
          face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        }
        if (props.color) {
          face.vertexColors[0] = new THREE.Color().setRGB(props.color[0], props.color[1], props.color[2]);
          face.vertexColors[1] = new THREE.Color().setRGB(props.color[0], props.color[1], props.color[2]);
          face.vertexColors[2] = new THREE.Color().setRGB(props.color[0], props.color[1], props.color[2]);
        }
      }
      this.material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
    } else {
      this.texture = new THREE.TextureLoader().load(`assets/${props.texture}`);
      this.material = new THREE.MeshBasicMaterial({ map: this.texture });
    }

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = this.props.name;

    if (props.position) {
      //console.info("setting pos: ", props.position);
      this.mesh.position.set(props.position.x, props.position.y, props.position.z);
    }
  }
}

export default Plane;