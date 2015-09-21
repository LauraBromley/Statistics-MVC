var ScatterChartModule = (function () {
    'use strict';
    var scObject = {};

    scObject.drawScatterChart = function (divId, data, trendLineData, xAxisLabel, yAxisLabel) {

        var margin = { top: 20, right: 20, bottom: 50, left: 50 }
          , width = 500 - margin.left - margin.right
          , height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
                  .domain([0, d3.max(data, function (d) { return d[0]; })])
                  .range([0, width]);

        var y = d3.scale.linear()
                  .domain([0, d3.max(data, function (d) { return d[1]; })])
                  .range([height, 0]);

        var chart = d3.select(divId)
            .append('svg:svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'chart');

        var main = chart.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'main');

        // draw the x axis
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        main.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .attr('class', 'main axis date')
            .call(xAxis)
        .append("text")
              .attr("class", "scatterAxisLabel")
              .attr("x", width)
              .attr("y", 40)
              .text(xAxisLabel);

        // draw the y axis
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

        main.append('g')
            .attr('transform', 'translate(0,0)')
            .attr('class', 'main axis date')
            .call(yAxis)
        .append("text")
          .attr("class", "scatterAxisLabel")
          .attr("transform", "rotate(-90)")
          .attr("y", -40)
          .text(yAxisLabel);

        var g = main.append("svg:g");

        g.selectAll("scatter-dots")
            .data(data)
            .enter().append("svg:circle")
            .attr("cx", function(d) { return x(d[0]); })
            .attr("cy", function(d) { return y(d[1]); })
            .attr("r", 2);

        if (trendLineData.length > 0){

            g.selectAll("trendline")
			    .data(trendLineData)
                .enter()
                    .append("line")
                    .attr("class", "trendline")
                    .attr("x1", function (d) { return x(d[0]); })
                    .attr("y1", function (d) { return y(d[1]); })
                    .attr("x2", function (d) { return x(d[2]); })
                    .attr("y2", function (d) { return y(d[3]); })
                    .attr("stroke", "black")
                    .attr("stroke-width", 1);
        }
    };

    return scObject;

}());