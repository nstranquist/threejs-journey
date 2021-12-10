import './style.css'
import * as THREE from 'three'
import { Vector3 } from 'three'

// Every object that inherits from Object3d (like camera, mesh) has shared properties inherited.
// such as: position, rotation, scale, quaternion

// transformations are compiled in matrices, which get compiled and updated, and sent to gpu for rendering

// the units are arbitrary. should stick to a standard conventin, per project
// for example, "1" unit could be inches, centimeters, km, etc. if building a house

// set position, other object mods, before calling the render() function (for that frame, at least)

// Vector3 class is an ordered triplet of numbers x,y,z
// - can be used to represent position, but also momentum vectors, etc.
// - implied length and distance, from (0,0,0) to (x,y,z)
//  --> i.e. "meth.position.length()"
// - many methods exist for Vector3, can see three.js docs for complete API

// AxesHelper will help position things in space, since it can be hard
// - displays x, y, z lines for the scene

// For Rotation, can use rotation or quaternion,
// - but updating one will update the other automatically
// - rotation is an Euler value, not Vector3
// --> for euler, imagine a stick through the center of the object, to rotate it on. that axis is the euler axis to affect to get the desired rotation
// - values are in Radians
// --> half rotation is PI, 2PI is a full rotation 360deg
// - using 'reorder()' is important to avoid gimbal lock in certain situations
// - This is why to use Quaternion, to avoid the errors

// "lookAt()" is inherited by EVERY Object3D instance
// - makes the "z" face the target provided, which must be a Vector3

// Can put objects in a Group to control position, rotation, scale on all items in the group
// - useful for more complex objects. "scene graph"
// --> It is a good habit to do this


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
// group.position.y = 1;
// group.scale.y = 2;
// group.rotation.y = 1;
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0xff00ff })
)

group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
)
cube2.position.set(-1.3, 0, 0)

group.add(cube2)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// Mesh Position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;

// same as above. set x,y,z all at once
mesh.position.set(0.7, -0.6, 1)

// Mesh Scale
mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5

// Rotation
mesh.rotation.reorder("YXZ")
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

scene.add(mesh)

console.log(mesh.position.distanceTo(new Vector3(1, 2, 3)))

// normalize will take length of vector and reduce to "1"
// mesh.position.normalize()
// console.log(mesh.position.length())

// Axes Helper
const axesHelper = new THREE.AxesHelper(1) // size factor of lines, as param
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

console.log(mesh.position.distanceTo(camera.position))

camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)