import THREE from 'three';
import PointerLockControls from './lib/PointerLockControls';
import Node from './node';
import Input from './Input';
import BuildAction from './BuildAction';
import MoveAction from './MoveAction';
import BuildHotBar from './ui/BuildHotBar';
import BuildMenu from './ui/BuildMenu';
import TriggerMenu from './ui/TriggerMenu';
import $ from './constants';

export default (props) => {
  const player = new Node();
  player.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  player.camera.position.set(props.position.x, props.position.y, props.position.z);

  player.uiScene = new THREE.Scene();
  player.uiCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
  player.uiScene.add(player.uiCamera);
  player.controls = new PointerLockControls(player.camera);

  player.components.buildHotBar = new BuildHotBar(player.uiScene);
  player.components.buildMenu = new BuildMenu(player.uiScene);
  player.components.triggerMenu = new TriggerMenu(player.uiScene);
  player.components.input = new Input(player);
  player.components.buildAction = new BuildAction(player, {actionInterval: $.Player.ActionInterval});
  player.components.moveAction = new MoveAction(player, {
    moveObject: player.controls.getObject(),
    velocity: $.Player.MoveVelocity,
    mass: $.Player.Mass,
    flyVelocity: $.Player.FlyVelocity
  });

  player.add(player.controls.getObject());
  return player;
}
