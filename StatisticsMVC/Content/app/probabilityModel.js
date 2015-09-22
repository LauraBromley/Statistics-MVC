var ProbabilityModel = function () {
    "use strict";
    var self = this;

    var binom = function(n, k) {
        var coeff = 1;
        for (var i = n - k + 1; i <= n; i++) {
            coeff *= i;
        }
        for (var j = 1; j <= k; j++) {
            coeff /= j;
        }
        return coeff;
    };

    var binomialProbability = function (n, x, p) {
        if (n == 0.0 || x == 0.0 || p == 0.0)
            return 0.0;
        var bc = binom(n,x);
        return bc * Math.pow(p, x) * Math.pow((1 - p), (n - x));
    }

    var generateTruthTable = function () {
        var results = [];
        for (var i = 1; i <= 5; i++) {
            var entry1 = {
                roll1: i,
                roll2: 6,
                roll3: 6,
                p: 0.005
            }
            var entry2 = {
                roll1: 6,
                roll2: i,
                roll3: 6,
                p: 0.005
            }
            var entry3 = {
                roll1: 6,
                roll2: 6,
                roll3: i,
                p: 0.005
            }
            results.push(entry1);
            results.push(entry2);
            results.push(entry3);
        }
        return results;
    }

    self.n = ko.observable(0.0);
    self.x = ko.observable(0.0);
    self.p = ko.observable(0.0);
    self.truthTable = ko.observable(generateTruthTable());

    self.result = ko.computed(function () {
        var result = binomialProbability(this.n(),this.x(),this.p());
        return +result.toFixed(3);
    }, this);

    

};