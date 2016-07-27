# runge-kutta-4

> The fourth order Runge-Kutta integration method.

## Introduction

Wikipedia: [Runge–Kutta methods](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods)

## Installation

Normal way:
```javascript
<!-- use the min file -->
<script src="[path]/dist/runge-kutta-4.min.js"></script>
```

Easy with npm:
```bash
$ npm install runge-kutta-4
```

## Examples

- use CommonJS
```javascript
var RungeKutta4 = require('runge-kutta-4')

/**
 * this is the target differential equations
 * @param  {Array}   y     It is an unknown function of x which we would like to approximate
 * @param  {Number}  x     x
 * @return {Array}   dydx  The rate at which y changes, is a function of x and of y
 */
var derives = function(x, y) {
    // you need to return the integration
    var dydx = []

    dydx[0] = y[0] + y[1]
    dydx[1] = 2 * y[1] + y[2]
    dydx[2] = 3 * y[2]

    return dydx
}

var xStart = 0,
    yStart = [1, 5, 10],
    h = 0.0001

var rk4 = new RungeKutta4(derives, xStart, yStart, h)

console.log(rk4.step())
// [ 1.0006001300160015, 5.002000350038337, 10.003000450045004 ]

// console.log(rk4.steps(100))
// [ 1.0613161367179729, 5.2035386394013905, 10.304545339535162 ]

// console.log(rk4.end(0.01))
// [ 1.0613161367179729, 5.2035386394013905, 10.304545339535162 ]
// same as steps(100), because steps = xEnd / h
```
