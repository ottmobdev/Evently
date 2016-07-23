function EventLocateService() {

    this.geoLocate = function (callbackS, callbackE) {


        navigator.geolocation.getCurrentPosition(successLocate, errorLocate);

        function successLocate(position) {
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)

            var itemLocality;

            var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';

            $.getJSON(GEOCODING).done(function (location) {
                console.log(location)
                var arrAddress = location.results;
                $.each(arrAddress, function (i, address_component) {
                    if (address_component.types[0] == "locality") {
                        console.log("City: " + address_component.address_components[0].long_name);
                        itemLocality = address_component.address_components[0].long_name;
                    }
                });

                callbackS(itemLocality);

            })

        }

        function errorLocate(error) {
            console.log('errorLocate' + error);
            callbackE(error);
        }




    };
}