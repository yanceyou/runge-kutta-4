'use strict'

/**
 * The fourth order Runge-Kutta integration method
 *
 * @class RungeKutta4
 * @param {Function} derives Differential equations which needed to integrate
 * @param {Number}   xStart  [description]
 * @param {Array}    yStart  [description]
 * @param {Number}   h       [description]
 */
var RungeKutta4 = function(derives, xStart, yStart, h) {
    this.derives = derives
    this.x = xStart
    this.y = yStart
    this.dimension = this.yStart.length
    this.h = h

    // cache the each step
    this._k1
    this._k2
    this._k3
    this._k4
}

RungeKutta4.prototype = {
    step: function() {
        var derives = this.derives
            dimension = this.dimension
            h = this.h
        var i, _y = []

        this._k1 = derives(x, y)
        for (i = 0; i < dimension; i++) {
            _y[i] = this.y + h * 0.5 * this._k1
        }

        this._k2 = derives(x + h * 0.5, _y)
        for (i = 0; i < dimension; i++) {
            _y[i] = this.y + h * 0.5 * this._k2
        }

        this._k3 = derives(x + h * 0.5, _y)
        for (i = 0; i < dimension; i++) {
            _y[i] = this.y + h * this._k3
        }

        this._k4 = derives(x + h, _y)

        for (i = 0; i < dimension; i++) {
            this.y[i] += h / 6 * (this._k1 + 2 * this._k2 + 2 * this._k3 + this._k4)
        }

        this.x += h

        return this.y
    },

    steps: function(steps) {
        for (var i = 0; i < steps; i++) {
            this.step()
        }

        return this.y
    },

    run: function() {

    }

}

module.exports = RungeKutta4
