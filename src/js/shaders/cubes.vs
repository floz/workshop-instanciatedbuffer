precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 position;
attribute float aScales;
attribute vec3 aPositions;
attribute vec3 aColors;

varying vec3 vColor;

void main() {
	vColor = aColors;
	
	vec3 pos = position * aScales + aPositions; 
	gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
