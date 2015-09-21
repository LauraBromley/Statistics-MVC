var BayesModule = (function () {
	"use strict";

	var _getCSSColor = function (elementId) {
		var element = document.getElementById(elementId);
		var style = window.getComputedStyle(element);
		return style.getPropertyValue('color');
	};

	// private methods
	var  _dataHasChanged = function () {
		var prob = model.probA();
		var tp = model.probTP();
		var tn = model.probTN();
		var color1 = _getCSSColor('pieColor1');
		var color2 = _getCSSColor('pieColor2');

		if (model.dataIsValid()) {
			document.getElementById('pieChartA').innerHTML = "";
			PieChartModule.drawPieChart("#pieChartA", prob, "A", "Not A", color1, color2);
			document.getElementById('pieChartTP').innerHTML = "";
			PieChartModule.drawPieChart("#pieChartTP", tp, "True Positive", "False Positive", color1, color2);
			document.getElementById('pieChartTN').innerHTML = "";
			PieChartModule.drawPieChart("#pieChartTN", tn, "True Negative", "False Negative", color1, color2);
		}

		var log = new Logger();
	    log.LogMessage("Bayes", "Pie charts generated.");
	};

    // Create the view model and tell Knockout to apply the data-bindings.
	var model = new BayesViewModel();
    ko.applyBindings(model);

	// subscribe to changes 
	model.probA.subscribe(_dataHasChanged, model);
	model.sensitivity.subscribe(_dataHasChanged, model);
	model.specificity.subscribe(_dataHasChanged, model);
}());

