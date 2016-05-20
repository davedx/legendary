import _ from 'lodash';
import THREE from 'three';
import Cube from '../Cube';
import events from '../events';
import Menu from './Menu';
import $ from '../constants';
import layout from './trigger_menu.json';

class TriggerMenu extends Menu {
  constructor(scene) {
    super(scene, layout);
  }
}

export default TriggerMenu;