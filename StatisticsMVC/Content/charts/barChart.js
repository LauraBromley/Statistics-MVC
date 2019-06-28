var BarChartModule = (function () {
	'use strict';
	var bcObject = {};

    bcObject.drawBarChart = function (divId, data) {

        var maxWidth = Math.min(500, window.innerWidth-50);

        var margin = { top: 20, right: 20, bottom: 30, left: 50},
            width = maxWidth - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        console.log('inner width', window.innerWidth);

		var legendRectSize = 18;
		var legendSpacing = 4;

		var x = d3.scale.ordinal()
			.domain(data.map(function (d) { return d.label; }))
			.rangeRoundBands([0, width], 0.1);

		var y = d3.scale.linear()
			.domain([0, d3.max(data, function (d) { return Math.max(d.value, d.value2); })])
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");

		var svg = d3.select(divId).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.append("g")
			.attr("class", "xaxis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		svg.append("g")
			.attr("class", "yaxis")
			.call(yAxis);

		svg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function (d) { return x(d.label); })
			.attr("width", x.rangeBand() / 2)
			.attr("y", function (d) { return y(d.value); })
			.attr("height", function (d) { return height - y(d.value); });

		svg.selectAll(".bar2")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar2")
			.attr("x", function (d) { return (x(d.label) +  x.rangeBand() / 2); })
			.attr("width", x.rangeBand() / 2)
			.attr("y", function (d) { return y(d.value2); })
			.attr("height", function (d) { return height - y(d.value2); });
	};
	return bcObject;

}());