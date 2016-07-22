function EventSearchService(searchLocation, searchTerm) {

    var baseUrl = 'https://www.eventbriteapi.com/v3/events/search/?token=GDRKH2DV2TS5FEEYAPAB';

    var pagination;

    this.searchEvents = function (searchLocation, searchTerm, pageNumber, callback) {

        //var url = baseUrl; //+ encodeURIComponent(searchString) + "&amp;page=" + pageNumber;
        //var url = baseUrl + encodeURIComponent(searchString); //+ "&amp;page=" + pageNumber;

        //for error
        //https://www.eventbriteapi.com/v3/events/search/?token=GDRKH2DV2TS5FEEYAPAB&location.address=%23knockoutjs&q=%23knockoutjs
        //http://allevents.in/

        //https://www.eventbriteapi.com/v3/events/search/?token=GDRKH2DV2TS5FEEYAPAB&location.address=Ottawa&page=1&start_date.range_start=2016-10-01
        //dateformat https://www.eventbriteapi.com/v3/events/search/?token=GDRKH2DV2TS5FEEYAPAB&location.address=Ottawa&page=1&start_date.range_start=2016-10-01T00:00:00

        var location;
        if (searchLocation.trim() !== "")
            location = '&location.address=' + encodeURIComponent(searchLocation); //+ 'Ottawa';
        location = location || "";
        var term;
        if ($.isEmptyObject(searchTerm)  && searchTerm.trim() !== "") {
            term = '&q=' + encodeURIComponent(searchTerm); //'Ottawa';
        }
        term = term || "";
        var url = baseUrl + "&page=" + pageNumber
        url = url + location + term;

        $.ajax({
            dataType: "json",
            url: url,
            success: function (response) {

                // create an array to hold the results
                var eventViewModels = [];
                console.log(response);
                console.log(response.events);

                //eventbrite events
                //console.log(response.events);

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

                //$.each(response.results, function (index, item) {
                //    eventViewModels.push({
                //        author: item.from_user,
                //        time: item.created_at,
                //        text: item.text,
                //        thumbnail: item.profile_image_url
                //    });
                //});

                //callback(eventViewModels);
            },
            fail: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
            error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
        });
    };
    
    

}