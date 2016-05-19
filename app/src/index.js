import THREE from 'three'
import events from './events';
import Cube from './Cube'
import Plane from './Plane'
import Player from './Player';
import Mobile from './Mobile';
import RootInputHandler from './RootInputHandler';

let renderer;
let player, mobile;
let prevTime = performance.now();

const scene = initWorld();
let running = true;
const rootInputHandler = new RootInputHandler({exit: exit});

animate();

function initWorld() {
  events.init();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClearColor = false;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  player = Player({position: new THREE.Vector3(0, 10, 0)});
  scene.add(player);

  mobile = Mobile({position: new THREE.Vector3(0, 25, -150)});
  scene.add(mobile);

  const floor = new Plane({name: 'floor', size: {w: 2000, h: 2000}, rotation: {x: -Math.PI / 2, y: 0, z: 0}, randomColors: true});
  scene.add(floor.mesh);

  const cube = new Cube({name: 'cube', unitPosition: {x: 0, y: 0, z: -3}, texture: 'crate.gif'});
  scene.add(cube.mesh);

  window.addEventListener('resize', onWindowResize, false);
  return scene;
}

function onWindowResize() {
  player.camera.aspect = window.innerWidth / window.innerHeight;
  player.camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  events.emit('onwindowresize', {width: window.innerWidth, height: window.innerHeight});
}

function animate() {
  if (running) {
    requestAnimationFrame(animate);
  }

  const time = performance.now();
  const delta = (time - prevTime) / 1000;
  prevTime = time;

  player.update(delta, scene);

  renderer.clear();
  renderer.render(scene, player.camera);
  renderer.render(player.uiScene, player.uiCamera);
}

function exit() {
  running = false;
  scene.remove(player);
  scene.remove(mobile);
  player.destroy();
  mobile.destroy();
  rootInputHandler.destroy();
}
