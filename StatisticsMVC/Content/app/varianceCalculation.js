function VarianceCalculationModel() {
    "use strict";
    var self = this;

    var calculateMean = function (values) {
        var sum = 0;
        for (var i = 0; i < values.length; i++) {
            sum += values[i];
        }
        return sum / values.length;
    };

    var calculateVariance = function (values, mean) {
        var sumOfDiffSquared = 0.0;

        for (var i = 0; i < values.length; i++) {
            var diff = values[i] - mean;
            sumOfDiffSquared += Math.pow(diff, 2);
        }

        return sumOfDiffSquared / values.length;
    };
        
    self.mean = 0.0;
    self.variance = 0.0;
    self.stddev = 0.0;

    self.CalculateStats = function (values) {

        this.mean = calculateMean(values);
        this.variance = calculateVariance(values, this.mean);
        this.stddev = Math.sqrt(this.variance);
    };

}