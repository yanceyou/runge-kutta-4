var RungeKutta4 = require('../lib/RungeKutta4.js')

describe("RungeKutta4", function() {
    it("can be constructed and used as an object", function() {
        var rk4 = new RungeKutta4()
        RungeKutta4.aProperty = 1
        expect(RungeKutta4.aProperty).toBe(1)
    })

    describe("can calculate one differential equation", function() {
        var xStart, yStart, h, rk4

        var derives = function(x, y) {
            var dydx = []
            dydx[0] = 1 - y[0]
            return dydx
        }

        beforeEach(function() {
            xStart = 0
            yStart = [0]
            h = 0.01
            rk4 = new RungeKutta4(derives, xStart, yStart, h)
        })

        it("calculate each step-size use method step() and the local truncation error is on the order of O(h5)", function() {
            yNext = rk4.step()
            yNextActual = [ -Math.exp(-h) + 1 ]

            // the local truncation error is on the order of O(h5)
            var precision = Math.pow(h, 5)

            for (var i = 0, len = yNext.length; i < len; i++) {
                expect(Math.abs(yNext[i] - yNextActual[i])).toBeLessThan(precision)
            }
        })

        it("calculate steps use method steps(steps) and the local truncation error is on the order of O(h4)", function() {
            var steps = 10000

            yNext = rk4.steps(steps)
            yNextActual = [ -Math.exp(-h * steps) + 1 ]

            // the local truncation error is on the order of O(h4)
            var precision = Math.pow(h, 4)

            for (var i = 0, len = yNext.length; i < len; i++) {
                expect(Math.abs(yNext[i] - yNextActual[i])).toBeLessThan(precision)
            }
        })
    })

    describe("can calculate differential equation", function() {
        var xStart, yStart, h, rk4

        var derives = function(x, y) {
            var dydx = []

            dydx[0] = y[0] + y[1]
            dydx[1] = 2 * y[1] + y[2]
            dydx[2] = 3 * y[2]

            return dydx
        }

        beforeEach(function() {
            xStart = 0
            yStart = [1, 5, 10]
            h = 0.0001
            rk4 = new RungeKutta4(derives, xStart, yStart, h)
        })

        it("calculate each step-size use method step() and the local truncation error is on the order of O(h5)", function() {
            var yNext = rk4.step()

            yNextActual = []
            yNextActual[0] = 5 * Math.exp(3 * h) - 5 * Math.exp(2 * h) + Math.exp(h)
            yNextActual[1] = 10 * Math.exp(3 * h) - 5 * Math.exp(2 * h)
            yNextActual[2] = 10 * Math.exp(3 * h)

            // the local truncation error is on the order of O(h5)
            // @see wikipedia: https://en.wikipedia.org/wiki/Truncation_error_(numerical_integration)
            var precision = 10000 * Math.pow(h, 5)

            for (var i = 0, len = yNext.length; i < len; i++) {
                expect(Math.abs(yNext[i] - yNextActual[i])).toBeLessThan(precision)
            }
        })

        it("calculate steps use method steps(steps) and the local truncation error is on the order of O(h4)", function() {
            var steps = 100

            yNext = rk4.steps(steps)

            yNextActual = []
            yNextActual[0] = 5 * Math.exp(3 * h * steps) - 5 * Math.exp(2 * h * steps) + Math.exp(h * steps)
            yNextActual[1] = 10 * Math.exp(3 * h * steps) - 5 * Math.exp(2 * h * steps)
            yNextActual[2] = 10 * Math.exp(3 * h * steps)

            // the local truncation error is on the order of O(h4)
            var precision = 10000 * Math.pow(h, 4)

            for (var i = 0, len = yNext.length; i < len; i++) {
                expect(Math.abs(yNext[i] - yNextActual[i])).toBeLessThan(precision)
            }
        })

        it("calculate used the end method", function() {
            var xEnd = 0.1

            yNext = rk4.end(xEnd)

            yNextActual = []
            yNextActual[0] = 5 * Math.exp(3 * xEnd) - 5 * Math.exp(2 * xEnd) + Math.exp(xEnd)
            yNextActual[1] = 10 * Math.exp(3 * xEnd) - 5 * Math.exp(2 * xEnd)
            yNextActual[2] = 10 * Math.exp(3 * xEnd)

            // the local truncation error is on the order of O(h4)
            var precision = 10000 * Math.pow(h, 4)

            for (var i = 0, len = yNext.length; i < len; i++) {
                expect(Math.abs(yNext[i] - yNextActual[i])).toBeLessThan(precision)
            }
        })
    })
})
