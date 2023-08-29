import * as THREE from 'three'
import imagesLoaded from 'imagesloaded'
import gsap from 'gsap'

import Project from "./project"

export default class Canvas {
    constructor() {
        this.createRenderer()
        this.createScene()
        this.createPlane()
        this.createListeners()
        this.update()
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true 
        })
        
        this.renderer.setSize(
            window.innerWidth, 
            window.innerHeight
        )
            
        document.body.appendChild(this.renderer.domElement)
    }
        
    createScene() {
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            500
        )

        this.camera.position.z = 300
        
        this.fov = THREE.MathUtils.degToRad(this.camera.fov)
        this.calcSize()
    }

    calcSize() {
        this.envHeight = 2 * Math.tan(this.fov / 2) * this.camera.position.z - 10
        this.envWidth = this.envHeight * this.camera.aspect
        
        this.environment = {
            height: this.envHeight,
            width: this.envWidth
        }
    }

    createPlane() {
        this.project = new Project({
            environment : this.environment
        })
        
        this.project.render(this.scene)
    }

    createListeners() {
        window.addEventListener('resize',this.onResize.bind(this))
    }

    onResize() {
        this.renderer.setSize(
            window.innerWidth, 
            window.innerHeight
        )
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.calcSize()
        this.camera.updateProjectionMatrix()
        this.project.onResize(this.environment)
    }

    update() {
        this.renderer.render(this.scene, this.camera)

        window.requestAnimationFrame(
            this.update.bind(this)
        )
            
    }
}