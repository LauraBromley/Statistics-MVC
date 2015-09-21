function BayesViewModel() {
	"use strict";
	var self = this;

	var _calculateTP = function (probA, sens, spec) {
		var a = probA * sens;
		var b = (1 - probA) * (1 - spec);
		return a / (a + b);
	};

	var _calculateTN = function (probA, sens, spec) {
		var a = (1 - probA) * spec;
		var b = probA * (1 - sens);
		return a / (a + b);
	};

	var _validData = function (probA, sens, spec) {
		return (probA > 0 && probA < 1) &&
			   (sens > 0 && sens < 1) &&
			   (spec > 0 && spec < 1);
	};

	self.probA = ko.observable(0.0);
	self.sensitivity = ko.observable(0.0);
	self.specificity = ko.observable(0.0);

	self.probTP = ko.computed(function () {
		var result = _calculateTP(this.probA(),
						   this.sensitivity(),
						   this.specificity());
		return +result.toFixed(3);
	}, this);

	self.probFP = ko.computed(function () {
		var result = 1 - this.probTP();
		return +result.toFixed(3);
	}, this);

	self.probTN = ko.computed(function () {
		var result = _calculateTN(this.probA(),
							   this.sensitivity(),
							   this.specificity());
		return +result.toFixed(3);
	}, this);

	self.probFN = ko.computed(function () {
		var result = 1 - this.probTN();
		return +result.toFixed(3);
	}, this);


	self.dataIsValid = ko.computed(function () {
		return _validData(this.probA(),
						  this.sensitivity(),
						  this.specificity());
	}, this);

	self.probTPPercentage = ko.computed(function () {
		return this.probTP() * 100;
	}, this);

}