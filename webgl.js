function p(x, f) { return f(x), x; }

var gl = document.getElementById("canvas").getContext("experimental-webgl");

var program = p(gl.createProgram(), program => {
    [ "2d-vertex-shader", "2d-fragment-shader" ].forEach((id) => {
        gl.attachShader(program, p(gl.createShader(id.indexOf("vertex") > 0 ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER), shader => {
            gl.shaderSource(shader, document.getElementById(id).text);
            gl.compileShader(shader);
        }));
    });
    gl.linkProgram(program);
    gl.useProgram(program);
});

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

// draw
gl.drawArrays(gl.TRIANGLES, 0, 6);
