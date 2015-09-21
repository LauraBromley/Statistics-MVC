// ViewModel object - this is the object used for knockout bindings
var EstimatorsModel = function () {
	"use strict";
	var self = this;

	// Properties: knockout observables
	self.estimates = ko.observableArray();
	self.resultData = ko.observableArray();
	self.rolls = ko.observable(20);
	self.chartVisible = ko.observable(false);

	// Private methods: uses var x = function() syntax
	var _computeEstimates = function (results) {
		var estimates = self.estimates();
		var i;
		var item;
		var result;

		for (i = 0; i < 6; i++) {
			item = estimates[i];
			item.initialise(self.rolls());
		}

		for (i = 0; i < self.rolls(); i++) {
			result = results[i];
			item = estimates[result - 1];
			item.count(item.count() + 1);
		}
	};

	// Private function, uses var x = function() syntax
	var _showBarChart = function (data) {
		document.getElementById('BarChart').innerHTML = "";

		var dataset = [];
		var i;
		var item;
		var mle;
		var le;

		for (i = 0; i < 6; i++) {
			item = data[i];
			mle = (item.mle() * 100).toFixed(2);
			le = (item.le() * 100).toFixed(2);
			dataset.push({label: item.number(), value: item.mle(), value2: item.le()});
		}

		BarChartModule.drawBarChart("#BarChart", dataset, "Probability Estimate");
	};

	// Public methods: uses self.x = function() syntax	
	self.initialise = function () {
		var arr = [];
		var i;
		var est;
		for (i = 1; i < 7; i++) {
			est = new Estimate(i);
			arr.push(est);
		}
		self.estimates(arr);
	};

	self.rollTheDice = function () {
		var results = [];
		var i;
		var random;
		for (i = 0; i < self.rolls(); i++) {
			random = Math.floor((Math.random() * 6) + 1);
			results.push(random);
		}
		self.resultData(results);
		_computeEstimates(results);
		self.chartVisible(true);
		_showBarChart(self.estimates());

		var log = new Logger();
	    log.LogMessage("Estimators", "Dice roll.");
	};

	self.initialise();
};