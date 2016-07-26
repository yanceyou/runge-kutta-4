'use strict'

/**
 * The fourth order Runge-Kutta integration method
 *
 * @class RungeKutta4
 * @param {Function} derives Differential equations which needed to integrate
 * @param {Number}   xStart  Initial value problem: x0
 * @param {Array}    yStart  Initial value problem: y0
 * @param {Number}   h       Each step-size value
 */
var RungeKutta4 = function(derives, xStart, yStart, h) {
    this.derives    = derives
    this.x          = xStart
    this.y          = yStart || []
    this.dimension  = this.y.length
    this.h          = h || 0.01

    // cache the k1, k2, k3, k4 of each step
    this._k1
    this._k2
    this._k3
    this._k4
}

RungeKutta4.prototype = {
    /**
     * Calculate each step according to step-size h
     *
     * @return {Array} calculated result at this.x
     */
    step: function() {
        var derives     = this.derives,
            x           = this.x,
            dimension   = this.dimension,
            h           = this.h

        var i, _y = []

        // Alias: f() <=> this.derives()
        //        Xn  <=> this.x
        //        Yn  <=> this.y
        //        H   <=> this.h
        //        K1  <=> this._k1

        // calculate _k1: K1 = f(Xn, Yn)
        this._k1 = derives(x, this.y)

        // calculate _k2: K2 = f(Xn + 0.5 * H, Yn + 0.5 * H * K1)
        for (i = 0; i < dimension; i++) {
            _y[i] = this.y[i] + h * 0.5 * this._k1[i]
        }
        this._k2 = derives(x + h * 0.5, _y)

        // calculate _k3: K3 = f(Xn + 0.5 * H, Yn + 0.5 * H * K2)
        for (i = 0; i < dimension; i++) {
            _y[i] = this.y[i] + h * 0.5 * this._k2[i]
        }
        this._k3 = derives(x + h * 0.5, _y)

        // calculate _k4: K4 = f(Xn + H, Yn + H * K3)
        for (i = 0; i < dimension; i++) {
            _y[i] = this.y[i] + h * this._k3[i]
        }
        this._k4 = derives(x + h, _y)

        // calculate yNext: Y(n + 1) = Yn + H / 6 * (K1 + 2 * K2 + 2 * K3 + K4)
        for (i = 0; i < dimension; i++) {
            this.y[i] += h / 6 * (this._k1[i] + 2 * this._k2[i] + 2 * this._k3[i] + this._k4[i])
        }

        // calculate xNext: X(n + 1) = Xn + H
        this.x += h

        return this.y
    },

    /**
     * Calculate according step times
     *
     * @param  {Number} steps Iterative times
     * @return {Array}        Calculated result at this.x
     */
    steps: function(steps) {
        for (var i = 0; i < steps; i++) {
            this.step()
        }

        return this.y
    },

    /**
     * Calculate according to xEnd
     *
     * @param  {Number} xEnd final x
     * @return {Array}       Calculated result at xEnd
     */
    end: function(xEnd) {
        var steps = (xEnd - this.x) / this.h
        return this.steps(steps)
    }

}

module.exports = RungeKutta4
