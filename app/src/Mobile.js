import THREE from 'three';
import Node from './node';
import Input from './Input';
import Cube from './Cube';
import BuildAction from './BuildAction';
import MoveAction from './MoveAction';
import BuildHotBar from './ui/BuildHotBar';
import BuildMenu from './ui/BuildMenu';
import $ from './constants';

export default (props) => {
  const mobile = new Node();
  mobile.cube = new Cube({name: 'cube', texture: 'mobile-good.jpg', size: $.Size.Mobile});
  mobile.add(mobile.cube.mesh);
  mobile.position.set(props.position.x, props.position.y, props.position.z);

  mobile.components.moveAction = new MoveAction(mobile, {
    moveObject: mobile,
    velocity: $.Mobile.MoveVelocity,
    mass: $.Mobile.Mass,
    flyVelocity: $.Mobile.FlyVelocity
  });

  return mobile;
}
