precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float volume;

attribute vec3 position;
attribute float aScales;
attribute vec3 aPositions;
attribute vec3 aColors;
attribute vec3 aVolumeRatio;

varying vec3 vColor;

void main() {
	vColor = aColors;
	
	vec3 pos = position * ( aScales + volume * aVolumeRatio ) + aPositions; 
	gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
