import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Most animations work like "stop motion"... make change, re-render
// - typically doing 60fps
// - NEED animation to look the same regardless of the frame rate
// - will use 'window.requestAnimationFrame()'

// 'requestAnimationFrame()'
// - purpose is to call the function provided on the next frame, not animations
// - same function gets called on each new frame

// Need to adapt to not make animation dependent on the frame rate
// - can use Date.now()

// Should use logical Clock provided by three.js
// - consider not using 'getDelta()' method from Clock

// Can use library like GSAP to have more control, tweens, timelines, etc.
// - npm i gsap@version
// - gsap maintains its own tick, so no need for clock logic, but still have to manually re-render scene each frame


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

const clock = new THREE.Clock()

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

// Animations
const tick = () => {
    // console.log('loop')

    const elapsedTime = clock.getElapsedTime();

    console.log(elapsedTime)

    // update objects
    // mesh.position.x += 0.01
    // mesh.rotation.y = elapsedTime;
    mesh.rotation.y = elapsedTime * Math.PI / 2 // rotate 1/4 time per second
    mesh.position.y = Math.sin(elapsedTime)
    mesh.position.x = Math.cos(elapsedTime)

    // render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick();