import './style.css'
import * as THREE from 'three'

// Most animations work like "stop motion"... make change, re-render
// - typically doing 60fps
// - NEED animation to look the same regardless of the frame rate
// - will use 'window.requestAnimationFrame()'

// 'requestAnimationFrame()'
// - purpose is to call the function provided on the next frame, not animations
// - same function gets called on each new frame

// Need to adapt to not make animation dependent on the frame rate
// - can use Date.now()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

let time = Date.now();

// Animations
const tick = () => {
    // console.log('loop')

    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime; // update time for next frame

    console.log(deltaTime)

    // update objects
    // mesh.position.x += 0.01
    mesh.rotation.y += 0.001 * deltaTime

    // render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick();