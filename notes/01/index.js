console.log('hello threejs')
console.log(THREE)

// scene is a container for camera, lights, etc.
const scene = new THREE.Scene();

// mesh is geometry (shape) and material (how it looks)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // 'red'
const mesh = new THREE.Mesh(geometry, material) // in this order

scene.add(mesh)

// sizes for camera
const sizes = {
  width: 800,
  height: 600
}

// camera, not visible but is a point of view and is needed to make objects visible
// - can have multiple cameras, types of cameras
const camera = new THREE.PerspectiveCamera(
  75, // field of view: vertical vision angle, in degrees. 75 is relatively larger
  sizes.width / sizes.height, // aspect ratio: width / height
)
// positive z value will move the camera backward in the scene
camera.position.z = 3;

scene.add(camera)

const canvas = document.getElementById("01-canvas");

// renderer: renders from camera point of view, draws into canvas. create or let three.js create it
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // dom element
})
// apply sizes to renderer, this resizes the canvas as well
renderer.setSize(sizes.width, sizes.height)

renderer.render(
  scene, // scene
  camera, // camera
)

// position, rotation, and scale to move an object