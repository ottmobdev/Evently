function EventSearchService(searchLocation, searchTerm) {

    var baseUrl = 'https://www.eventbriteapi.com/v3/events/search/?token=GDRKH2DV2TS5FEEYAPAB';

    var pagination;

    this.searchEvents = function (searchLocation, searchTerm, pageNumber, callback) {

        var location;
        if (searchLocation.trim() !== "")
            location = '&location.address=' + encodeURIComponent(searchLocation); 
        location = location || "";
        var term;
        if ($.isEmptyObject(searchTerm)  && searchTerm.trim() !== "") {
            term = '&q=' + encodeURIComponent(searchTerm); 
        }
        term = term || "";
        var url = baseUrl + "&page=" + pageNumber
        url = url + location + term;

        $.mobile.loading('show');

        $.ajax({
            dataType: "json",
            url: url,
            success: function (response) {

                // create an array to hold the results
                var eventViewModels = [];
                console.log(response);
                console.log(response.events);

                pagination = response.pagination;

                // add the new items
                $.each(response.events, function (index, item) {

                    eventViewModels.push({
                        title: item.name.text,
                        summary: item.description.text,
                        datetime: item.start.utc,
                        eurl: item.url
                    });
                });

                callback(pagination, eventViewModels);
                
                $.mobile.loading('hide');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.mobile.loading('hide');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
        }
        });
    };
    
    

}