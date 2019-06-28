var PieChartModule = (function () {
	'use strict';
	var pcObject = {};

	pcObject.drawPieChart = function (divId, p, label1, label2, color1, color2) {

        var maxWidth = Math.min(350, window.innerWidth);

		var segment1 = p;
		var segment2 = 1 - p;
		var dataset = [{label: label1, value: segment1}, {label: label2, value: segment2}];
		var width = 200;
		var height = 200;
		var radius = 100;
		var widthInclLedgend = 350;
		var legendRectSize = 18;
        var legendSpacing = 4;

        if (maxWidth - 350) {
            width = 100;
            height = 100;
            radius = 50;
            widthInclLedgend = maxWidth-50;
            legendRectSize = 10;
            legendSpacing = 4;
        }


		var color = d3.scale.ordinal()
			.range([color1, color2]);

		var tip = d3.tip()
			.attr('class', 'pieToolTip')
			.offset([-10, 0])
			.html(function (d) {
				var valueAsPer = d.value * 100;
				valueAsPer = +valueAsPer.toFixed(1);
				return "<span>" + d.data.label + ": " + valueAsPer + "%</span>";
			});

		var svg = d3.select(divId)
			.append('svg')
			.attr('width', widthInclLedgend)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

		svg.call(tip);

		var arc = d3.svg.arc()
			.outerRadius(radius);

		var pie = d3.layout.pie()
			.value(function (d) {return d.value; })
			.sort(null);

		var path = svg.selectAll('path')
			.data(pie(dataset))
			.enter()
			.append('path')
			.attr('class', 'piePiece')
			.attr('d', arc)
			.attr('fill', function (d, i) {
				return color(d.data.label);
			})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);

		var legend = svg.selectAll('.legend')
			.data(color.domain())
			.enter()
			.append('g')
			.attr('class', 'legend')
			.attr('transform', function (d, i) {
				var height = legendRectSize + legendSpacing;
				var x = 110;
				var y = i * height;
				return 'translate(' + x + ',' + y + ')';
			});

		legend.append('rect')
			.attr('width', legendRectSize)
			.attr('height', legendRectSize)
			.style('fill', color)
			.style('stroke', color);

		legend.append('text')
			.attr('x', legendRectSize + legendSpacing)
			.attr('y', legendRectSize - legendSpacing)
			.text(function (d) { return d; });
	};

	return pcObject;
}());