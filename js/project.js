import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three"

export default class Project {
    constructor({environment}) {
        this.width = environment.width
        this.height = environment.height
        this.createGeometry(environment)
        this.createMaterial()
    }

    render(scene) {
        this.scene = scene
        this.mesh = new Mesh(this.geometry, this.material)
        scene.add(this.mesh)
    }

    createGeometry({ height, width }) {
        this.geometry = new PlaneGeometry(
            width * 0.75,
            height * 0.75,
            100,
            50
        )
    }

    createMaterial() {
        this.material = new MeshBasicMaterial({
            color: 0xfff
        })
    }

    updateScale() {

    }

    onResize(size) {

        if(this.mesh) {
            this.scene.remove(this.mesh)
            this.createGeometry(size)
            this.render(this.scene)
        }

    }

    update() {

    }
}