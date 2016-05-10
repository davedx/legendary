import THREE from 'three';
import Cube from './Cube'
import Node from './node';
import Input from './Input';
import Action from './Action';
import BuildMenu from './ui/Menu';

class Player extends Node {
  constructor(props = {}) {
    super(props);

    let position = props.position || new THREE.Vector3(0, 10, 0);

    //this.cube = new Cube({position: new THREE.Vector3(position.x, position.y, position.z)});
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(position.x, position.y, position.z);

    this.controls = new Input(this, {velocity: 1200.0});
    //this.controls.getObject().add(this.cube.mesh);

    this.uiScene = new THREE.Scene();
    this.uiCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
    this.uiScene.add(this.uiCamera);
    //this.controls.getObject().add(this.uiCamera);

    this.buildMenu = new BuildMenu(this.uiScene);

    this.action = new Action(this);
  }

  addToScene(scene) {
    scene.add(this.controls.getObject());
  }

  update(scene) {
    this.controls.update(scene);
  }
}

export default Player;
