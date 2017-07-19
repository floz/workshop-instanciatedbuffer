uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float size;
uniform vec2 resolution;

attribute float uid;
attribute vec3 position;
attribute vec2 side;
attribute vec2 uv;

void main() {
  float aspect = resolution.x / resolution.y;

  vec3 posBase = position;
  #ifndef IS_FACING_CAMERA
    posBase.x += side.x * 20. * .5;
    posBase.y += side.y * 20. * .5;
  #endif

  mat4 m = projectionMatrix * modelViewMatrix;
  vec4 pos = m * vec4( posBase, 1. );

  #ifdef IS_FACING_CAMERA
    float ratio = 1.075; // Correction of a weird ratio bug
    pos.x += ( side.x / aspect ) * 20. * ratio;
    pos.y += side.y * 20. * ratio;
  #endif

  gl_Position = pos;

}
