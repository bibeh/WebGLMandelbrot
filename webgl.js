var canvas = document.getElementById("canvas");
var gl = canvas.getContext("experimental-webgl");
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

var positionLocation = gl.getAttribLocation(program, "a_position");
var resolutionLocation = gl.getUniformLocation(program, "u_resolution");

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

gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

window.onload = window.onresize = function() {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
};
