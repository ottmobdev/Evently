function EventSearchResultViewModel() {

    /// <summary>
    /// A view model that renders the results of a twitter search.
    /// </summary>

    var that = this,
        eventSearchService = new EventSearchService();

    // --- properties

    this.template = "eventSearchResultView"; 
    this.events = ko.observableArray();
    this.isSearching = ko.observable(false);
    this.pageNumber = ko.observable(1);
    this.searchString = "";

    // --- public functions

    this.init = function (searchLocation, searchTerm, eventViewModels) {
        this.events(eventViewModels);
        this.pageNumber = ko.observable(1);
        this.searchTerm = searchTerm;
        this.searchLocation = searchLocation;
    };

    this.loadMore = function () {
        this.pageNumber(this.pageNumber() + 1);
        this.isSearching(true);

        $.mobile.loading('show');

        eventSearchService.searchEvents(this.searchLocation, this.searchTerm, this.pageNumber(), function (events) {
            that.isSearching(false);
            $.mobile.loading('hide');
            // push all of the received tweets into our list in one atomic action
            if (events.length > 0) {
                var temp = ko.utils.unwrapObservable(that.events);
                $.each(events, function (index, evnt) {
                    temp.push(evnt);
                });
                that.events(temp);
            }
        });
    };

    this.eventClicked = function (evnt) {
        // navigate to the event
        eventViewModel.init(evnt);
        $.mobile.changePage("#" + eventViewModel.template);
    };

}