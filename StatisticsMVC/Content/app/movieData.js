function MovieData(data) {
    "use strict";
    var self = this;

    self.movie = ko.observable(data.movie);
    self.budget = ko.observable(data.budget);
    self.opening = ko.observable(data.opening);
    self.gross = ko.observable(data.gross);
    self.imdb = ko.observable(data.imdb);
    self.rt = ko.observable(data.rt);
    self.mins = ko.observable(data.mins);

    self.value = function(property) {
        return self[property]();
    }
}

function MovieMetaData() {
    "use strict";
    var self = this;

    var variables = [
        { value: "movie", display: "Movie" },
        { value: "budget", display: "Budget ($mill)" },
        { value: "opening", display: "Opening Weekend ($mill)" },
        { value: "gross", display: "Gross ($mill)" },
        { value: "imdb", display: "IMDB Score" },
        { value: "rt", display: "Rotten Tomatoes Score" },
        { value: "mins", display: "Running Time (mins)" }
    ];

    var variablesForCalc = function () {
        return variables.slice(1);
    }

    self.variableList = variables;
    self.variableListForCalc = variablesForCalc();
    self.defaultX = variables[1];
    self.defaultY = variables[2];

}