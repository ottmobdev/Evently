function EventViewModel() {

    /// <summary>
    /// A view model that represents a single event
    /// </summary>

    // --- properties

    this.template = "eventView";
    this.title = ko.observable();
    this.summary = ko.observable();
    this.datetime  = ko.observable();
    this.eurl = ko.observable();

    // --- private functions
    function parseDate1(date) {
        /// <summary>
        /// Parses the tweet date to give a more readable format.
        /// </summary>
        var diff = (new Date() - new Date(date)) / 1000;

        if (diff < 60) {
            return diff.toFixed(0) + " seconds ago";
        }

        diff = diff / 60;
        if (diff < 60) {
            return diff.toFixed(0) + " minutes ago";
        }

        diff = diff / 60;
        if (diff < 10) {
            return diff.toFixed(0) + " hours ago";
        }

        diff = diff / 24;

        if (diff.toFixed(0) === 1) {
            return diff.toFixed(0) + " day ago";
        }

        return diff.toFixed(0) + " days ago";
    }

    function parseDate(date) {
        date = date || "";
        return date.substring(0, 10) + " " + date.substring(11, 16);
    }

    // --- public functions

    this.init = function (evnt) {
        this.title(evnt.title);
        this.summary(evnt.summary);
        this.datetime(parseDate(evnt.datetime));
    };


}