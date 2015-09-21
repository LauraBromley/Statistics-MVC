function HouseData(data) {
    "use strict";
    var self = this;

    self.selling_price = ko.observable(data.selling_price);
    self.bathrooms = ko.observable(data.bathrooms);
    self.area = ko.observable(data.area);
    self.living_space = ko.observable(data.living_space);
    self.garages = ko.observable(data.garages);
    self.rooms = ko.observable(data.rooms);
    self.bedrooms = ko.observable(data.bedrooms);
    self.age = ko.observable(data.age);

    self.value = function (property) {
        return self[property]();
    }
}

function HouseMetaData() {
    "use strict";
    var self = this;

    var variables = [
        { value: "selling_price", display: "Selling Price ($1000)" },
        { value: "area", display: "Area (1000sqft)" },
        { value: "living_space", display: "Living Space (1000sqft)" },
        { value: "bathrooms", display: "Bathrooms" },
        { value: "garages", display: "Garages" },
        { value: "rooms", display: "Rooms" },
        { value: "bedrooms", display: "Bedrooms" },
        { value: "age", display: "Age" }
    ];

    self.variableList = variables;
    self.variableListForCalc = variables;
    self.defaultX = variables[1];
    self.defaultY = variables[2];

}