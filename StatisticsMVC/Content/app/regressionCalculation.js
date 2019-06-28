function RegressionCalculationModel() {
    "use strict";
    var self = this;

    var calculateMean = function (values) {
        var sum = 0;
        for (var i = 0; i < values.length; i++) {
            sum += values[i];
        }
        return sum / values.length;
    };

    var calculateDiffs = function (xValues, yValues) {

        sumOfDiffXSquared = 0.0;
        sumOfDiffYSquared = 0.0;
        sumOfDiffXByDiffY = 0.0;

        for (var i = 0; i < xValues.length; i++) {
            var diffX = xValues[i] - meanX;
            var diffY = yValues[i] - meanY;
            sumOfDiffXSquared += Math.pow(diffX, 2);
            sumOfDiffYSquared += Math.pow(diffY, 2);
            sumOfDiffXByDiffY += (diffX * diffY);
        }
    };

    var meanX = 0.0;
    var meanY = 0.0;
    var sumOfDiffXSquared = 0.0;
    var sumOfDiffYSquared = 0.0;
    var sumOfDiffXByDiffY = 0.0;

    self.valueB = 0.0;
    self.valueA = 0.0;
    self.valueR = 0.0;
    self.lineEq = "";
    self.trendLineData = [0,0,0,0];

    self.CalculateRegression = function (xValues, yValues) {

        meanX = calculateMean(xValues);
        meanY = calculateMean(yValues);
        calculateDiffs(xValues, yValues);

        var b = sumOfDiffXByDiffY / sumOfDiffXSquared;
        var a = meanY - (b * meanX);
        var r = sumOfDiffXByDiffY / (Math.sqrt(sumOfDiffXSquared * sumOfDiffYSquared));

        var x1 = Math.min.apply(Math, xValues);
        var x2 = Math.max.apply(Math, xValues);
        var y1 = (b * x1) + a;
        var y2 = (b * x2) + a;

        this.valueB = b.toFixed(2);
        this.valueA = a.toFixed(2);
        this.valueR = r.toFixed(2);
        this.lineEq = "y = " + self.valueB + "x + " + self.valueA;
        this.trendLineData = [[x1, y1, x2, y2]];

    };

}