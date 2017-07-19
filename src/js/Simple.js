
import QuadGeom from "./QuadGeom"
import QuadMat from "./QuadMat"

import stage3d from "mnf/core/stage3d"

class Simple extends THREE.Group {

    constructor() {
       super() 

       const geo = new QuadGeom( 1000 )
       const mat = new QuadMat( { isFacingCamera: true } )
       const mesh = new THREE.Mesh( geo, mat )
       this.add( mesh )
       

        stage3d.add( this )
    }

    start() {

    }

}
module.exports = Simple