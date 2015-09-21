function Estimate(number) {
	"use strict";
    var self = this;
    self.number = ko.observable(number);
	self.count = ko.observable(0);
	self.n = 0;

	self.mle = ko.computed(function () {
		if (self.count() === 0 && self.n === 0) {
			return 0;
		}
		var result = (self.count() / self.n);
		return +result.toFixed(3);
	});

	self.le = ko.computed(function () {
		if (self.count() === 0 && self.n === 0) {
			return 0;
		}
		var result = (self.count() + 1) / (self.n + 6);
		return +result.toFixed(3);
	});

	self.initialise = function (n) {
		self.count(0);
		self.n = Number(n);
	};
}