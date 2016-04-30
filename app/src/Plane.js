import THREE from 'three';
import Node from './node';

class Plane extends Node {
  constructor(props = {}) {
    super(props);

    this.geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    this.geometry.rotateX(-Math.PI / 2);

    for (var i = 0, l = this.geometry.faces.length; i < l; i ++) {
      var face = this.geometry.faces[ i ];
      face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
      face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
      face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    }

    this.material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = this.props.name;
  }
}

export default Plane;