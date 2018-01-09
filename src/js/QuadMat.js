const vsDefault = require( "./shaders/quad.vs" )
const fsDefault = require( "./shaders/quad.fs" )

class PlanesMaterial extends THREE.RawShaderMaterial {

  constructor( { size = 10, isFacingCamera = false, color = new THREE.Color( 0xffffff ), vs = vsDefault, fs = fsDefault } = {} ) {
    const uniforms = {
      size: { type: "f", value: size },
      color: { type: "c", value: color },
      resolution: { type: "v2", value: new THREE.Vector2( 1, window.innerHeight / window.innerWidth ) }
    }

    let optsVs = "precision highp float;\n"
    let optsFs = "precision highp float;\n"
    if( isFacingCamera ) {
      optsVs += "#define IS_FACING_CAMERA\n"
    }

    super( {
      uniforms: uniforms,
      vertexShader: optsVs + vs,
      fragmentShader: optsFs + fs,
      side: THREE.DoubleSide,
      type: "QuadMaterial",
      transparent: true
    } )
  }

}

module.exports = PlanesMaterial
