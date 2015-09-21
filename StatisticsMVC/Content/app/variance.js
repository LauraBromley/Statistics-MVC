function VarianceModel() {
    "use strict";
    var self = this;

    var meta;
    var calculationModel = new VarianceCalculationModel();
    var loading = false;

    var dataSets = ["Movies", "Houses"];

    self.dataSetList = ko.observableArray(dataSets);
    self.selectedDataSet = ko.observable();
    self.dataLoaded = ko.observable(false);

    self.mean = ko.observable(0);
    self.variance = ko.observable(0);
    self.stddev = ko.observable(0);

    self.dataItems = ko.observableArray([]);
    self.variableList = ko.observableArray([]);
    self.dataFields = ko.observableArray([]);
    self.selectedVariable = ko.observable();

    self.actionUrlGetData = "";

    self.LoadSampleData = function () {
        $.ajax({
            url: self.actionUrlGetData,
            type: "GET",
            data: { dataset: self.selectedDataSet() },
            dataType: "json",
            success: function (data) {
                loadDataSuccess(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                loadDataError(textStatus, errorThrown);
            }
        });
    };

    self.DoCalculation = function () {
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
        self.selectedVariable(meta.defaultX);

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

    var formatResult = function(number) {
        return +number.toFixed(3);
    }

    var convertDataToValues = function () {
        if (!loading) {
            var data = self.dataItems();
            if (self.selectedVariable()) {
                var item = self.selectedVariable().value;

                var values = $.map(data, function (v, k) { return v.value(item); });
             
                calculationModel.CalculateStats(values);

                self.mean(formatResult(calculationModel.mean));
                self.variance(formatResult(calculationModel.variance));
                self.stddev(formatResult(calculationModel.stddev));
            }
        }
    };
};



