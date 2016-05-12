import THREE from 'three'
import events from './events';
import Cube from './Cube'
import Plane from './Plane'
import Player from './Player';

let renderer;
let player;
let prevTime = performance.now();

let scene = initWorld();
animate();

function initWorld() {
  events.init();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClearColor = false;
  document.body.appendChild(renderer.domElement);

  let scene = new THREE.Scene();

  player = Player.create({});
  scene.add(player);

  let floor = new Plane({name: 'floor', size: {w: 2000, h: 2000}, rotation: {x: -Math.PI / 2, y: 0, z: 0}, randomColors: true});
  scene.add(floor.mesh);

  let cube = new Cube({name: 'cube', position: new THREE.Vector3(0, 50, -300), texture: 'crate.gif'});
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
  requestAnimationFrame(animate);

  const time = performance.now();
  const delta = (time - prevTime) / 1000;
  prevTime = time;

  player.update(delta, scene);

  renderer.clear();
  renderer.render(scene, player.camera);
  renderer.render(player.uiScene, player.uiCamera);
}
