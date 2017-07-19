import vs from "./shaders/cubes.vs"
import fs from "./shaders/cubes.fs"

export default class Cubes extends THREE.Group {

	constructor( count ) {
		super()

		this.count = count

		this.geometry = new THREE.InstancedBufferGeometry()
		this.geometry.copy( new THREE.SphereBufferGeometry( 1, 10, 10 ) )

		this.positions = new Float32Array( this.count * 3 )
		this.scales = new Float32Array( this.count )
		this.colors = new Float32Array( this.count * 3 )
		this.uids = new Float32Array( this.count )
		this.volumeRatio = new Float32Array( this.count * 3 )

		let idx3 = 0
		for( let i = 0; i < this.count; i ++ ) {
			this.positions[ idx3 + 0 ] = Math.random() * 2000 - 1000
			this.positions[ idx3 + 1 ] = Math.random() * 2000 - 1000
			this.positions[ idx3 + 2 ] = Math.random() * 2000 - 1000

			let scale = Math.random() * 70 + 10
			this.scales[ i + 0 ] = scale

			let color = new THREE.Color( 0xffffff * Math.random() )
			this.colors[ idx3 + 0 ] = color.r
			this.colors[ idx3 + 1 ] = color.g
			this.colors[ idx3 + 2 ] = color.b

			this.volumeRatio[ idx3 + 0 ] = Math.random() * 50
			this.volumeRatio[ idx3 + 1 ] = Math.random() * 100
			this.volumeRatio[ idx3 + 2 ] = Math.random() * 30

			this.uids[ i ] = Math.random() * 10000 >> 0

			idx3 += 3
		}

		// this.geometry.addAttribute( "position", new THREE.InstancedBufferAttribute( this.positions, 3, 1 ) )
		this.geometry.addAttribute( "aPositions", new THREE.InstancedBufferAttribute( this.positions, 3, 1 ) )
		this.geometry.addAttribute( "aScales", new THREE.InstancedBufferAttribute( this.scales, 1, 1 ) )
		this.geometry.addAttribute( "aColors", new THREE.InstancedBufferAttribute( this.colors, 3, 1 ) )
		this.geometry.addAttribute( "aUids", new THREE.InstancedBufferAttribute( this.uids, 1, 1 ) )
		this.geometry.addAttribute( "aVolumeRatio", new THREE.InstancedBufferAttribute( this.volumeRatio, 3, 1 ) )

		const uniforms = {
			volume: { type: "f", value: 0 }
		}
		this.material = new THREE.RawShaderMaterial( {
			uniforms: uniforms,
			vertexShader: vs,
			fragmentShader: fs,
			transparent: false,
			side: THREE.DoubleSide,
			type: "CubesShader"
		} )

		this.mesh = new THREE.Mesh( this.geometry, this.material )
		this.add( this.mesh )
	}

	update( volume ) {
		this.material.uniforms.volume.value = volume
	}

}
