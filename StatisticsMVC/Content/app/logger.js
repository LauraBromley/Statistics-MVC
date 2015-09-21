function Logger() {
    "use strict";
    var self = this;

    self.LogMessage = function (location, message) {
        var actionUrl = "/Statistics/AddLogMessage";
        var messageData = { location: location, message: message };
        $.post(actionUrl, messageData);
    };
};

