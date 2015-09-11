var gl = document.getElementById("canvas").getContext("experimental-webgl");

var program = gl.createProgram();
[ {id: "2d-vertex-shader"  , type: gl.VERTEX_SHADER  },
  {id: "2d-fragment-shader", type: gl.FRAGMENT_SHADER} ].forEach(i => {
    var shader = gl.createShader(i.type);
    gl.shaderSource(shader, document.getElementById(i.id).text);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
})
gl.linkProgram(program);
gl.useProgram(program);

// Create a buffer and put a single clipspace rectangle in it (2 triangles)
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0]),
    gl.STATIC_DRAW);

// look up where the vertex data needs to go.
var positionLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, 6);
