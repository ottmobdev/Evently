// create the various view models
var eventSearchViewModel = new EventSearchViewModel();
var eventSearchResultViewModel = new EventSearchResultViewModel();
var eventViewModel = new EventViewModel();

//// load the stored state (recent searches)
//twitterSearchViewModel.loadState();

$.mobile.defaultPageTransition = "slide";

$(document).ready(function () {
    // bind each view model to a jQueryMobile page
    ko.applyBindings(eventSearchViewModel, document.getElementById("pageSearch"));
    ko.applyBindings(eventSearchResultViewModel, document.getElementById("eventSearchResultView"));
    ko.applyBindings(eventViewModel, document.getElementById("eventView"));
});
