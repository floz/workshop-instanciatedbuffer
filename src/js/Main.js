const OrbitControls = require('three-orbit-controls')(THREE)

import vsBasic from "shaders/basic.vs"
import fsBasic from "shaders/basic.fs"
import audio from "mnf/audio"
import gui from 'mnf/gui'

import QuadGeom from "./QuadGeom"
import QuadMat from "./QuadMat"

import Cubes from "./Cubes"

class Main {

	constructor(){
		
		// -------------------------------------------------------------------------------------------------- SCENE

		this.scene = new THREE.Scene()
		this.renderer = new THREE.WebGLRenderer()
		this.renderer.setPixelRatio( window.devicePixelRatio )
		this.renderer.setSize( window.innerWidth, window.innerHeight )
		this.renderer.setClearColor( 0x222222, 1);
		document.body.appendChild( this.renderer.domElement )
		
		// -------------------------------------------------------------------------------------------------- CAMERA

		this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 100000 )
		this.camera.position.z = 3000
		this.controls = new OrbitControls(this.camera)
		
		// -------------------------------------------------------------------------------------------------- YOUR SCENE

		// BufferGeometry
		// const geo = new QuadGeom( 10000 )
		// const mat = new QuadMat( { isFacingCamera: false } )
		// const mesh = new THREE.Mesh( geo, mat )
		// this.scene.add( mesh )

		// InstanciatedBufferGeometry
		this.cubes = new Cubes( 1000 )
		this.scene.add( this.cubes )

		//

		// if you don't want to hear the music, but keep analysing it, set 'shutup' to 'true'!
		audio.start( { live: false, shutup: true, showPreview: true } )
		audio.onBeat.add( this.onBeat )

		window.addEventListener( 'resize', this.onResize, false )
		this.animate()
	}


	// -------------------------------------------------------------------------------------------------- ON BEAT
	
	onBeat = () => {
		
	}


	// -------------------------------------------------------------------------------------------------- EACH FRAME

	animate = () => {
		requestAnimationFrame( this.animate )

		if( this.cubes ) {
			this.cubes.update( audio.volume )
		}

		this.render()
	}

	// -------------------------------------------------------------------------------------------------- RENDER

	render = ()=>{
		this.renderer.render(this.scene, this.camera)
	}

	// -------------------------------------------------------------------------------------------------- RESIZE
	onResize = () => {
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()
		this.renderer.setSize( window.innerWidth, window.innerHeight )
	}

}

export default new Main()
