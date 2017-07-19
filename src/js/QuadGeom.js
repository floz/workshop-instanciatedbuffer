export default class QuadGeom extends THREE.BufferGeometry {

  constructor( count ) {
    super()

    this.count = count

    this.init()
  }

  // A plane = 4 vertices
  init() {
    const count2 = this.count << 1
    const count4 = this.count << 2

    let idx1 = 0
    let idx2 = 0
    let idx3 = 0
    let idx6 = 0
    let idx8 = 0

    const positions = new Float32Array( this.count * 12 )
    for( let i = 0; i < this.count; i++ ) {
        let x = Math.random() * 800 - 400
        let y = Math.random() * 800 - 400
        let z = Math.random() * 800 - 400

        for( let j = 0; j < 4; j++ ) {         
            positions[ idx6 + 0 ] = x
            positions[ idx6 + 1 ] = y
            positions[ idx6 + 2 ] = z

            idx6 += 3
        }
    }
    idx6 = 0

    // unique number to define the points of the plane
    const uids = new Float32Array( count4 )
    for( let i = 0; i < count4; i++ ) {
      let uid = Math.random() * 10000
      for( let j = 0; j < 4; j++ ) {
        uids[ idx1 ] = uid
        idx1 += 1
      }
    }
    idx1 = 0
    idx2 = 0

    let signX = 1
    let signY = 1

    // To determine how to place the vertices around the center
    const sides = new Float32Array( count4 * 2 )
    // To map a texture on the planes
    const uvs = new Float32Array( count4 * 2 )
    for( let i = 0; i < count2; i++ ) {
      // 0
      sides[ idx8 + 0 ] = -1 * signX
      sides[ idx8 + 1 ] = -1 * signY

      uvs[ idx8 + 0 ] = 0
      uvs[ idx8 + 1 ] = 0
      // 1
      sides[ idx8 + 2 ] = -1 * signX
      sides[ idx8 + 3 ] = 1 * signY

      uvs[ idx8 + 2 ] = 0
      uvs[ idx8 + 3 ] = 1
      // 2
      sides[ idx8 + 4 ] = 1 * signX
      sides[ idx8 + 5 ] = -1 * signY

      uvs[ idx8 + 4 ] = 1
      uvs[ idx8 + 5 ] = 0
      // 3
      sides[ idx8 + 6 ] = 1 * signX
      sides[ idx8 + 7 ] = 1 * signY

      uvs[ idx8 + 6 ] = 1
      uvs[ idx8 + 7 ] = 1

      idx8 += 8
    }

    idx2 = 0
    const index = new Uint32Array( count4 * 3 )
    for( let i = 0; i < this.count; i++ ) {
      index[ idx6 + 0 ] = idx2
      index[ idx6 + 1 ] = index[ idx6 + 4 ] = idx2 + 1
      index[ idx6 + 2 ] = index[ idx6 + 3 ] = idx2 + 2
      index[ idx6 + 5 ] = idx2 + 3

      idx2 += 4
      idx6 += 12
    }

    this.addAttribute( "uid", new THREE.BufferAttribute( uids, 1 ) )
    this.addAttribute( "position", new THREE.BufferAttribute( positions, 3 ) )
    this.addAttribute( "side", new THREE.BufferAttribute( sides, 2 ) )
    this.addAttribute( "uv", new THREE.BufferAttribute( uvs, 2 ) )
    this.setIndex( new THREE.BufferAttribute( index, 1 ) )
  }

}