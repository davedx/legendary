import THREE from 'three';
import Cube from './Cube'
import Node from './node';
import Input from './Input';
import BuildAction from './BuildAction';
import MoveAction from './MoveAction';
import BuildMenu from './ui/Menu';
import $ from './constants';

class Player extends Node {
  static create(props) {
    let player = new Node();
    let position = props.position || new THREE.Vector3(0, 10, 0);
    player.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    player.camera.position.set(position.x, position.y, position.z);

    player.uiScene = new THREE.Scene();
    player.uiCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
    player.uiScene.add(player.uiCamera);
    player.buildMenu = new BuildMenu(player.uiScene);

    player.components.input = new Input(player);
    player.components.buildAction = new BuildAction(player, {actionInterval: $.Player.ActionInterval});
    player.components.moveAction = new MoveAction(player, {
      velocity: $.Player.MoveVelocity,
      mass: $.Player.Mass,
      flyVelocity: $.Player.FlyVelocity
    });

    player.add(player.components.moveAction.controls.getObject());
    return player;
  }
}

export default Player;
