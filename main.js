import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import asphalt from "./textures/asphalt.jpeg";
import { Object3D } from "three";

const scene = new THREE.Scene();
// scene.background = new THREE.Color("light-gray");
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

const renderer = new THREE.WebGLRenderer({alpha:true, antialias: true });
renderer.setSize(800, 800);
document.getElementById(`can`).appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(40, 0, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));

controls.minDistance = 12;
controls.maxDistance = 24;

controls.update();

const texture = new THREE.TextureLoader().load("./textures/asphalt.jpeg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

texture.repeat.set(4, 4);
const geometry = new THREE.BoxGeometry(0.25, 24, 18);
const material = new THREE.MeshStandardMaterial({ color: 0x28282b });
material.normalMap = texture;

// material.bumpScale = 1

const cube = new THREE.Mesh(geometry, material);

const ambient = new THREE.AmbientLight(0x404040, 3);

// const directional = new THREE.PointLight(0xefebd8, 1000000, 30);
// const helper = new THREE.PointLightHelper(directional, 5);

const directional = new THREE.DirectionalLight(0xefebd8, 1);
// const helper = new THREE.DirectionalLightHelper(directional, 10);

// scene.add(helper);

directional.position.set(1, 20, 0);

scene.add(ambient);
scene.add(directional);

cube.position.set(0, 0, 0);
scene.add(cube);

let logoObject = new THREE.Object3D()
scene.add(logoObject)

let planeGeometry = new THREE.PlaneGeometry(12, 9, 1, 1);
planeGeometry.rotateY(1.5708);
planeGeometry.translate(.131,-5,0)



let minimizerButton = document.getElementById("min-logo");
minimizerButton.addEventListener("click", () => {
  logoObject.clear()
  let minimizerLogo = new THREE.TextureLoader().load('./logos/2019_MinimizerRegisteredOutlinedLogo.png')
  // let img = new THREE.TextureLoader().load( minimizerLogo );
  let planeMaterial = new THREE.MeshBasicMaterial( { map: minimizerLogo, transparent: true } );
  let logoPlane = new THREE.Mesh(planeGeometry, planeMaterial);
  logoObject.add(logoPlane)
})

let highBarButton = document.getElementById("hbb-logo");
highBarButton.addEventListener("click", () => {
  logoObject.clear()
  let HBBLogo = new THREE.TextureLoader().load('./logos/HBB_Logo_blk.png')
  // let img = new THREE.TextureLoader().load( minimizerLogo );
  let planeMaterial = new THREE.MeshBasicMaterial( { map: HBBLogo, transparent: true } );
  let logoPlane = new THREE.Mesh(planeGeometry, planeMaterial);
  logoObject.add(logoPlane)
})

let clearButton = document.getElementById("no-logo");
clearButton.addEventListener("click", () => {

    console.log("clear press and logo 'active'")
    logoObject.clear()

})



let yellow = document.getElementById("yellow-btn");
yellow.addEventListener("click", () => {
  material.color.setHex(0xffef00);
});

let black = document.getElementById("black-btn");
black.addEventListener("click", () => {
  material.color.setHex(0x28282b);
});

let red = document.getElementById("red-btn");
red.addEventListener("click", () => {
  material.color.setHex(0x880808);
});

let white = document.getElementById("white-btn");
white.addEventListener("click", () => {
  material.color.setHex(0xf0f0f0);
});
// camera.position.z = 0;

function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

animate();
