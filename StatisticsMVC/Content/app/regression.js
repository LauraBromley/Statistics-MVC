function RegressionModel() {
    "use strict";
    var self = this;

    var meta;
    var calculationModel = new RegressionCalculationModel();
    var loading = false;

    var dataSets = [ "Movies", "Houses"];

    self.dataSetList = ko.observableArray(dataSets);
    self.selectedDataSet = ko.observable();
    self.dataLoaded = ko.observable(false);

    self.valueB = ko.observable(0);
    self.valueA = ko.observable(0);
    self.valueR = ko.observable(0);
    self.lineEq = ko.observable();

    self.dataItems = ko.observableArray([]);
    self.variableList = ko.observableArray([]);
    self.variableListForCalc = ko.observableArray([]);
    self.dataFields = ko.observableArray([]);
    self.selectedVariableX = ko.observable();
    self.selectedVariableY = ko.observable();

    self.actionUrlGetData = "";
    self.dataForChart = [];
    self.trendLineData = [];

    self.LoadSampleData = function () {
        $.ajax({
            url: self.actionUrlGetData,
            type: "GET",
            data: { dataset: self.selectedDataSet() },
            dataType: "json",
            success: function(data) {
                loadDataSuccess(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                loadDataError(textStatus, errorThrown);
            }
        });
    };

    self.DoCalculation = function() {
        convertDataToValues();
    }

    var loadDataSuccess = function (data) {
        loading = true;
        var jsonData = $.parseJSON(data);
        var dataArr = [];
        var len = jsonData.length;
        var i;

        if (self.selectedDataSet() == "Movies") {
            meta = new MovieMetaData();
            for (i = 0; i < len; i++) {
                dataArr.push(new MovieData(jsonData[i]));
            }
        } else {
            meta = new HouseMetaData();
            for (i = 0; i < len; i++) {
                dataArr.push(new HouseData(jsonData[i]));
            }
        }

        self.dataItems(dataArr);
        self.variableList(meta.variableList);
        self.variableListForCalc(meta.variableListForCalc);
        self.selectedVariableX(meta.defaultX);
        self.selectedVariableY(meta.defaultY);

        var fieldsArray = $.map(meta.variableList, function (v, k) { return v.value; });
        self.dataFields(fieldsArray);
        self.dataLoaded(true);
        loading = false;
        convertDataToValues();
    };

    var loadDataError = function (status, error) {
        alert("Sorry, there was a problem!");
        console.log("Error: " + error);
        console.log("Status: " + status);
    };

    var convertDataToValues = function () {
        if (!loading) {
            var data = self.dataItems();
            if (self.selectedVariableX() && self.selectedVariableY()) {
                var xVar = self.selectedVariableX().value;
                var yVar = self.selectedVariableY().value;

                var xValues = $.map(data, function(v, k) { return v.value(xVar); });
                var yValues = $.map(data, function(v, k) { return v.value(yVar); });
                self.dataForChart = xValues.map(function(e, i, a) { return [e, yValues[i]]; });


                if (xVar != yVar) {

                    calculationModel.CalculateRegression(xValues, yValues);

                    self.valueB(calculationModel.valueB);
                    self.valueA(calculationModel.valueA);
                    self.valueR(calculationModel.valueR);
                    self.lineEq(calculationModel.lineEq);
                    self.trendLineData = calculationModel.trendLineData;

                } else {
                    self.valueB(0);
                    self.valueA(0);
                    self.valueR(0);
                    self.lineEq("");
                    self.trendLineData = [];
                }

                drawScatterPlot();
            }
        }
    };

    var drawScatterPlot = function() {
        $("#divRegressionScatterChart").empty();
        ScatterChartModule.drawScatterChart("#divRegressionScatterChart", self.dataForChart, self.trendLineData, self.selectedVariableX().display, self.selectedVariableY().display);
    }
};



